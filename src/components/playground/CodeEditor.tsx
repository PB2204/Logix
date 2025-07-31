
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
import 'prismjs/themes/prism-tomorrow.css';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
    value: string;
    onValueChange: (value: string) => void;
    language: string;
    placeholder?: string;
}

export function CodeEditor({ value, onValueChange, language, placeholder }: CodeEditorProps) {
    const lang = languages[language] ? language : 'javascript';
    const lines = value.split('\n').length;
    
    const editorStyle = {
        fontFamily: '"Source Code Pro", monospace',
        fontSize: 14,
        lineHeight: '1.5',
        color: '#f8f8f2',
    };

    return (
        <div className="relative h-full w-full font-code text-sm flex">
            <div 
                className="w-12 text-right pr-4 text-gray-500 select-none"
                style={{
                    fontFamily: editorStyle.fontFamily,
                    fontSize: editorStyle.fontSize,
                    lineHeight: editorStyle.lineHeight,
                    paddingTop: 16,
                }}
                aria-hidden="true"
            >
                {Array.from({ length: lines }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                ))}
            </div>
            <Editor
                value={value}
                onValueChange={onValueChange}
                highlight={(code) => highlight(code, languages[lang], lang)}
                padding={{ top: 16, bottom: 16, left: 10, right: 16 }}
                textareaId="code-editor"
                className="h-full w-full bg-transparent !outline-none"
                style={editorStyle}
                placeholder={placeholder}
            />
        </div>
    );
}
