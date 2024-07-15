'use client';
import React, { useState } from 'react';
import { Copy, CopyCheck } from 'lucide-react';
export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <>
      {!copied && (
        <Copy
          onClick={() => {
            copyToClipboard(value);
          }}
          className="h-4 w-4"
        />
      )}
      {copied && <CopyCheck className="h-4 w-4" />}
    </>
  );
}
