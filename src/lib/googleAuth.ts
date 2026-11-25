export interface GoogleUserProfile {
  sub: string;
  email: string;
  emailVerified: boolean;
  name: string;
  givenName?: string;
  picture?: string;
}

/**
 * Optional built-in fallback Client ID. Leave empty to configure solely via
 * NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local or Cloudflare Pages.
 */
export const DEFAULT_GOOGLE_CLIENT_ID = "";

const GOOGLE_CLIENT_ID = (
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  DEFAULT_GOOGLE_CLIENT_ID
).trim();

const GSI_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

interface GoogleTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface GoogleOAuth2Client {
  requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
}

interface GoogleAccountsGlobal {
  accounts?: {
    id?: {
      disableAutoSelect?: () => void;
    };
    oauth2?: {
      initTokenClient: (config: {
        client_id: string;
        scope: string;
        prompt?: string;
        callback: (response: GoogleTokenResponse) => void;
        error_callback?: (error: { type: string; message?: string }) => void;
      }) => GoogleOAuth2Client;
      revoke?: (accessToken: string, done?: () => void) => void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleAccountsGlobal;
  }
}

let gsiScriptPromise: Promise<void> | null = null;

/** Returns true when a Google OAuth 2.0 Web Client ID is configured. */
export function isGoogleSignInConfigured(): boolean {
  return Boolean(GOOGLE_CLIENT_ID);
}

/** Lazily loads Google Identity Services once and caches the promise. */
export function loadGoogleIdentityScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Sign-In requires a browser environment."));
  }
  if (window.google?.accounts?.oauth2) {
    return Promise.resolve();
  }
  if (gsiScriptPromise) {
    return gsiScriptPromise;
  }

  gsiScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${GSI_SCRIPT_SRC}"]`
    );
    if (existing) {
      if (window.google?.accounts?.oauth2) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => {
          gsiScriptPromise = null;
          reject(new Error("Failed to load Google Identity Services script."));
        },
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = GSI_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      gsiScriptPromise = null;
      reject(new Error("Could not load Google Sign-In script. Check network or blocker settings."));
    };
    document.head.appendChild(script);
  });

  return gsiScriptPromise;
}

/**
 * Opens Google's official OAuth account picker popup via GIS Token Client
 * and resolves the signed-in user's basic profile (name, email, picture).
 */
export async function signInWithGooglePopup(): Promise<GoogleUserProfile> {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error(
      "Google Sign-In is not configured yet. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in Cloudflare Pages or .env.local."
    );
  }

  if (!window.google?.accounts?.oauth2) {
    await loadGoogleIdentityScript();
  }

  const oauth2 = window.google?.accounts?.oauth2;
  if (!oauth2) {
    throw new Error("Google Identity Services failed to initialize in this browser.");
  }

  const accessToken = await new Promise<string>((resolve, reject) => {
    const client = oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      prompt: "select_account",
      callback: (resp) => {
        if (resp.error || !resp.access_token) {
          reject(
            new Error(resp.error_description || resp.error || "Google sign-in was cancelled.")
          );
          return;
        }
        resolve(resp.access_token);
      },
      error_callback: (err) => {
        if (err.type === "popup_closed") {
          reject(new Error("Google sign-in popup was closed before finishing."));
        } else if (err.type === "popup_failed_to_open") {
          reject(new Error("Popup was blocked by your browser. Please allow popups and retry."));
        } else {
          reject(new Error(err.message || "Google sign-in failed."));
        }
      }
    });

    client.requestAccessToken({ prompt: "select_account" });
  });

  const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!userInfoRes.ok) {
    throw new Error("Unable to fetch your Google profile details.");
  }

  const info = (await userInfoRes.json()) as {
    sub?: string;
    email?: string;
    email_verified?: boolean;
    name?: string;
    given_name?: string;
    picture?: string;
  };

  if (!info.email) {
    throw new Error("Google account did not return an email address.");
  }

  return {
    sub: info.sub || info.email,
    email: info.email,
    emailVerified: Boolean(info.email_verified),
    name: info.name || info.email.split("@")[0],
    givenName: info.given_name,
    picture: info.picture
  };
}

/** Disables GIS auto-select cleanly when a student logs out. */
export function signOutGoogleSession(): void {
  if (typeof window !== "undefined") {
    window.google?.accounts?.id?.disableAutoSelect?.();
  }
}
