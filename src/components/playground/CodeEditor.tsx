
"use client";

import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-typescript';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
    value: string;
    onValueChange: (value: string) => void;
    language: string;
    placeholder?: string;
}

export function CodeEditor({ value, onValueChange, language, placeholder }: CodeEditorProps) {
    const lang = languages[language] ? language : 'javascript';
    const lineCount = value.split('\n').length;

    const editorStyle: React.CSSProperties = {
        fontFamily: '"Source Code Pro", monospace',
        fontSize: 14,
        lineHeight: '1.5',
        color: '#f8f8f2',
        minHeight: '100%',
        whiteSpace: 'pre',
    };

    return (
        <div className="relative h-full w-full font-code text-sm overflow-auto bg-black rounded-md border border-border">
            <div className="flex">
                <div className="sticky left-0 z-10 select-none bg-black pr-4 text-right text-muted-foreground" style={{lineHeight: editorStyle.lineHeight, fontSize: editorStyle.fontSize}}>
                    {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
                <Editor
                    value={value}
                    onValueChange={onValueChange}
                    highlight={(code) => highlight(code, languages[lang], lang)}
                    padding={0}
                    textareaId="code-editor"
                    className="flex-1 !outline-none"
                    style={editorStyle}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}
