import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
    return typeof window !== 'undefined'
        && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * True once the element has scrolled into view (and stays true). Visible immediately when
 * IntersectionObserver is missing or the user prefers reduced motion, so content is never
 * stranded at opacity 0.
 */
export function useInView(options = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;

        if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
            setInView(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.12, ...options },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []); // options are read once, on mount

    return [ref, inView];
}

/** Fades and lifts its children into place the first time they scroll into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
    const [ref, inView] = useInView();

    return (
        <Tag
            ref={ref}
            className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
            style={{ '--reveal-delay': `${delay}ms`, ...style }}
            {...rest}
        >
            {children}
        </Tag>
    );
}
