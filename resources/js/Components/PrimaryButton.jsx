export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={'btn-primary !py-2.5 text-sm ' + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
