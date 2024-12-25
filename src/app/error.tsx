'use client'; // Error boundaries must be Client Components

import { SignOutButton } from '@/components/soli/ui/signout-button';
import { useEffect } from 'react';
import { ERROR_FALLBACK } from './consts/api/error-fallback.const';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.log('ERR>>', error);
  // }, [error]);

  return (
    <div>
      <h2>{error.message || ERROR_FALLBACK}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>

      <SignOutButton />
    </div>
  );
}
