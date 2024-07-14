// CodeBlock.tsx
'use client';
import React from 'react';
import SyntaxHighLighter from 'react-syntax-highlighter';
function copyCode(value: string) {
  navigator.clipboard.writeText(value);
  alert('copied to clipboard');
}

function CodeBlock({
  language,
  value,
  ...props
}: {
  language: string;
  value: string;
}) {
  return (
    <>
      <div className="not-prose flex items-center justify-between text-xs">
        <p>{language}</p>
        <p onClick={() => copyCode(value)}>Copy</p>
      </div>
      <SyntaxHighLighter
        className="bg-inherit"
        language={language}
        PreTag="div"
        {...props}
      >
        {value}
      </SyntaxHighLighter>
    </>
  );
}

export default CodeBlock;
