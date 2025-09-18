'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

// This page is obsolete after static site generation.
// We redirect to the main /game page to consolidate traffic and simplify maintenance.
export default function ObsoleteSourceListPage() {
  useEffect(() => {
    redirect('/game');
  }, []);

  return null; // Render nothing as the redirect will happen on the client side
}