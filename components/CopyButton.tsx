'use client';
import React, { useState } from 'react';
import { Copy, CopyCheck } from 'lucide-react';

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      {!copied && (
        <Copy
          onClick={() => {
            navigator.clipboard.writeText(value);
            setCopied(true);
          }}
          className="h-4 w-4"
        />
      )}
      {copied && <CopyCheck className="h-4 w-4" />}
    </>
  );
}
