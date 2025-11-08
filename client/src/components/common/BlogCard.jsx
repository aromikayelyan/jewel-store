import { Link } from 'react-router-dom'
import { truncate } from '../../utils/formatters.js'

const BlogCard = ({ post }) => {
  const cover = post.images?.[0]
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.uid}`} className="blog-card__media" aria-label={post.title}>
        <div className="blog-card__image" style={{ backgroundImage: cover ? `url(${cover})` : undefined }} />
      </Link>
      <div className="blog-card__body">
        <span className="blog-card__subtitle">{post.subTitle}</span>
        <Link to={`/blog/${post.uid}`} className="blog-card__title">
          {post.title}
        </Link>
        <p className="blog-card__excerpt">{truncate(post.descriptionShort, 140)}</p>
        <Link to={`/blog/${post.uid}`} className="blog-card__link">
          Читать статью →
        </Link>
      </div>
    </article>
  )
}

export default BlogCard
