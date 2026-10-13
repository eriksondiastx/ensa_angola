import React from "react";
import { User } from "lucide-react";

interface UserAvatarProps {
  avatarUrl?: string | null;
  alt?: string;
  className?: string;
  iconClassName?: string;
}

export default function UserAvatar({
  avatarUrl,
  alt,
  className = "w-10 h-10",
  iconClassName = "w-1/2 h-1/2"
}: UserAvatarProps) {
  // During development stage (neste momento de desenvolvimento), we substitute user photos with an icon.
  // The icon will also serve as a default if the user doesn't have a profile picture.
  const DEV_MODE = true;
  const shouldShowIcon = DEV_MODE || !avatarUrl;

  if (shouldShowIcon) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-800 text-neutral-300 dark:bg-neutral-800 border-neutral-700/60 shrink-0 rounded-full select-none ${className}`}
        title={alt}
      >
        <User className={`text-ensa-orange shrink-0 ${iconClassName}`} />
      </div>
    );
  }

  return (
    <img
      src={avatarUrl}
      alt={alt || "Avatar"}
      className={`object-cover shrink-0 rounded-full ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}
