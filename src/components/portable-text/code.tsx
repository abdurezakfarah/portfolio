'use client';

import { Button } from '@/components/shadcn/button';
import { CustomCode } from '@/sanity/sanity.types';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineContentCopy, MdOutlineDoneAll } from 'react-icons/md';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeProps = {
  value: CustomCode;
};

export default function Code({ value }: CodeProps) {
  const timeOutRef = useRef<NodeJS.Timeout>(null!);
  const [isCopied, setIsCopied] = useState(false);
  const { code, showCopy } = value;

  useEffect(() => {
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, []);

  const handleCopy = async (code: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }

      timeOutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  if (!code) return;

  return (
    <div className="my-4 rounded-lg font-fira">
      {(code.filename || showCopy) && (
        <div className="flex h-10 items-center justify-between rounded-t-lg bg-black-100 px-4 py-1">
          {code.filename && <span className="font-mono text-sm">{code.filename}</span>}
          {showCopy ? (
            isCopied ? (
              <div className="flex items-center gap-1.5 text-xs">
                <MdOutlineDoneAll className="size-4" />
                Copied
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(code.code!)}
                className="hover:bg-transparent"
              >
                <MdOutlineContentCopy className="size-4" />
              </Button>
            )
          ) : null}
        </div>
      )}

      <SyntaxHighlighter
        language={code.language}
        style={oneDark}
        customStyle={{
          margin: 0,
          background: '#100d25',
          borderBottomLeftRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          scrollPadding: '100px',
        }}
        codeTagProps={{
          style: {
            background: '#100d25',
            fontFamily: 'var(--font-fira-code), monospace',
            fontVariantLigatures: 'normal',
          },
        }}
      >
        {code.code!}
      </SyntaxHighlighter>
    </div>
  );
}
