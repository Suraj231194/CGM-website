/*
 * Editorial cover art for Learning Center articles, chosen by category. The artwork is
 * decorative (the article title sits beside it), so it carries an empty alt.
 */
const COVERS = {
    Education: '/images/art/blog-education.svg',
    Lifestyle: '/images/art/blog-lifestyle.svg',
    Technology: '/images/art/blog-technology.svg',
};

export default function BlogCover({ category, className = '', eager = false }) {
    return (
        <img
            src={COVERS[category] || COVERS.Education}
            alt=""
            width="800"
            height="500"
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className={`h-full w-full object-cover ${className}`}
        />
    );
}
