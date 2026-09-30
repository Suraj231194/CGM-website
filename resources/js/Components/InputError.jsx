import { AlertCircle } from 'lucide-react';

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'field-error ' + className}
        >
            <AlertCircle size={13} className="shrink-0" aria-hidden="true" />
            {message}
        </p>
    ) : null;
}
