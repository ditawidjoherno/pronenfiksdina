'use client';

import { SessionProvider } from 'next-auth/react';

export default function BerandaLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
