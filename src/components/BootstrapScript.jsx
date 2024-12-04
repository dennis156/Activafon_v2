// src/components/BootstrapScript.tsx
"use client";

import { useEffect } from 'react';

export default function BootstrapScript() {
  useEffect(() => {
    // Only execute this on the client-side
    import('bootstrap/dist/js/bootstrap.bundle.min').then((bootstrap) => {
      // You can use bootstrap here if needed
    });
  }, []);

  return null;
}
