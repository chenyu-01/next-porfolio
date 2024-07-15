// @/components/CodeBlock
'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  duotoneDark,
  duotoneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from '@/components/CopyButton';

function CodeBlock({
  language,
  value,
  ...props
}: {
  language: string;
  value: string;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <>
      <div className="flex w-full items-center justify-between rounded bg-gray-300 px-2 text-lg dark:bg-gray-600">
        <p>{language}</p>
        <CopyButton value={value} />
      </div>
      <SyntaxHighlighter
        PreTag={'div'}
        language={language}
        wrapLongLines
        className="not-prose rounded"
        style={isDark ? duotoneDark : duotoneLight}
        customStyle={{
          margin: 0,
        }}
        {...props}
      >
        {value}
      </SyntaxHighlighter>
    </>
  );
}

export default CodeBlock;
