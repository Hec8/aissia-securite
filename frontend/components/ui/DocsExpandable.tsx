"use client";

import { useState } from "react";

export default function DocsExpandable({
    items,
    initialVisible = 5,
    moreLabel = 'Plus',
    lessLabel = 'Moins',
}: {
    items: readonly string[];
    initialVisible?: number;
    moreLabel?: string;
    lessLabel?: string;
}) {
    const [expanded, setExpanded] = useState(false);

    const visible = expanded ? items : items.slice(0, initialVisible);

    return (
        <div className="w-full">
            <ul className="space-y-2">
                {visible.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="flex-none w-7 h-7 rounded-full bg-[var(--primary)] text-[var(--secondary)] flex items-center justify-center"> 
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span className="flex-1 text-sm text-white leading-relaxed">{it}</span>
                    </li>
                ))}

                {items.length > initialVisible && (
                    <li className="flex justify-center">
                        <button
                            type="button"
                            onClick={() => setExpanded(prev => !prev)}
                            className="inline-flex items-center px-3 py-1.5 bg-[var(--secondary)] text-[var(--primary)] rounded-full text-sm font-medium hover:opacity-95 shadow-sm"
                        >
                            {expanded ? lessLabel : `${moreLabel} (${items.length - initialVisible})`}
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}
