
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

interface CodeEditorProps {
    value: string;
    onValueChange: (value: string) => void;
    language: string;
    placeholder?: string;
}

export function CodeEditor({ value, onValueChange, language, placeholder }: CodeEditorProps) {
    const lang = languages[language] ? language : 'javascript';

    const editorStyle: React.CSSProperties = {
        fontFamily: '"Source Code Pro", monospace',
        fontSize: 14,
        lineHeight: '1.5',
        color: '#f8f8f2',
        minHeight: '100%',
        whiteSpace: 'pre',
    };

    return (
        <div className="relative h-full w-full font-code text-sm flex overflow-auto bg-black rounded-md border border-border">
            <Editor
                value={value}
                onValueChange={onValueChange}
                highlight={(code) => highlight(code, languages[lang], lang)}
                padding={16}
                textareaId="code-editor"
                className="w-full !outline-none"
                style={editorStyle}
                placeholder={placeholder}
            />
        </div>
    );
}
