export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                'inline-flex items-center justify-center rounded-full border border-ink-900/15 bg-white px-6 py-2.5 text-sm font-semibold text-ink-800 transition duration-300 ease-premium hover:border-brand-600 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 ' +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
