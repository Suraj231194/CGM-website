/*
 * Editorial cover art for Learning Center articles, chosen by category. The artwork is
 * decorative (the article title sits beside it), so it carries an empty alt.
 *
 * Odd variants mirror the art so neighbouring posts in the same category do not repeat the
 * same cover. The mirror sits on a wrapper, leaving the img's own transform free for the
 * callers' hover-zoom classes. The SVGs contain no text, so mirroring is safe.
 */
const COVERS = {
    Education: '/images/art/blog-education.svg',
    Lifestyle: '/images/art/blog-lifestyle.svg',
    Technology: '/images/art/blog-technology.svg',
};

export default function BlogCover({ category, className = '', eager = false, variant = 0 }) {
    return (
        <span className={`block h-full w-full ${variant % 2 ? '-scale-x-100' : ''}`}>
            <img
                src={COVERS[category] || COVERS.Education}
                alt=""
                width="800"
                height="500"
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                className={`h-full w-full object-cover ${className}`}
            />
        </span>
    );
}
