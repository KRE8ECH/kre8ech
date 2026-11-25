"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  GoogleUserProfile,
  isGoogleSignInConfigured,
  loadGoogleIdentityScript,
  signInWithGooglePopup
} from "@/lib/googleAuth";

interface GoogleSignInButtonProps {
  onSuccess: (profile: GoogleUserProfile) => void;
  onError?: (message: string) => void;
  label?: string;
  className?: string;
}

export const GoogleLogoMark: React.FC<{ className?: string }> = ({
  className = "w-4 h-4"
}) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.88c2.27-2.09 3.54-5.17 3.54-8.89Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3.02c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.12A12 12 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.26A7.2 7.2 0 0 1 4.9 12c0-.78.14-1.54.37-2.26V6.62H1.26A12 12 0 0 0 0 12c0 1.94.46 3.77 1.26 5.38l4.01-3.12Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.26 6.62l4.01 3.12C6.22 6.88 8.87 4.77 12 4.77Z"
    />
  </svg>
);

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSuccess,
  onError,
  label = "Continue with Google",
  className = ""
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const configured = isGoogleSignInConfigured();

  // Preload GIS script on mount so popup launches synchronously inside user clicks
  useEffect(() => {
    if (configured) {
      loadGoogleIdentityScript().catch(() => {
        // Handled explicitly on click if loading fails
      });
    }
  }, [configured]);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const profile = await signInWithGooglePopup();
      onSuccess(profile);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Google Sign-In failed.";
      onError?.(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className={`w-full inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 text-[#202124] font-bold text-xs sm:text-sm border border-gray-300 hover:border-[#202124] shadow-xs hover:shadow-sm transition-all disabled:opacity-60 cursor-pointer ${className}`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
        ) : (
          <GoogleLogoMark className="w-4 h-4 shrink-0" />
        )}
        <span>{isLoading ? "Connecting to Google..." : label}</span>
      </button>

      {!configured && (
        <p className="text-[11px] text-amber-800 text-center font-medium">
          Add <code className="font-mono bg-amber-50 px-1 rounded">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> to enable live Google login.
        </p>
      )}
    </div>
  );
};
