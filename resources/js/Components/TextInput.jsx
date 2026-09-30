import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-2xl border-ink-900/50 bg-white px-4 py-2.5 text-ink-900 shadow-inset transition placeholder:text-ink-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/25 ' +
                className
            }
            ref={localRef}
        />
    );
});
