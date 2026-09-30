export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-md border-ink-900/50 text-brand-700 shadow-sm focus:ring-brand-500 ' +
                className
            }
        />
    );
}
