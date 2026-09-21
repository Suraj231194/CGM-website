export default function SectionHeader({ title, subtitle, centered = false }) {
    return (
        <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
            <h2 className="section-heading">{title}</h2>
            {subtitle && (
                <p className={`section-subheading mt-3 ${centered ? 'mx-auto' : ''}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
