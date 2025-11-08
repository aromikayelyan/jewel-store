import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useAppData } from '../context/AppDataProvider.jsx'

const BlogPost = () => {
  const { id } = useParams()
  const { getBlog } = useAppData()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    setStatus('loading')
    getBlog(id)
      .then(data => {
        if (!active) return
        setPost(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [id, getBlog])

  if (status === 'loading') {
    return (
      <section className="section">
        <div className="container">
          <LoadingState message="Открываем статью" />
        </div>
      </section>
    )
  }

  if (!post || status === 'error') {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            title="Статья недоступна"
            description="Возможно, материал был перемещён. Вернитесь к списку публикаций."
            action={<Button as={Link} to="/blog">Все материалы</Button>}
          />
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container blog-post">
        <Link to="/blog" className="blog-post__back">
          ← Все статьи
        </Link>
        <article className="glass-panel blog-post__content">
          <header>
            <span className="tag">{post.subTitle}</span>
            <h1>{post.title}</h1>
            <p className="blog-post__lead">{post.descriptionShort}</p>
          </header>
          {post.images?.length > 0 && (
            <div className="blog-post__gallery">
              {post.images.map(src => (
                <img key={src} src={src} alt={post.title} loading="lazy" />
              ))}
            </div>
          )}
          <div className="blog-post__body">
            {post.descriptionFull
              ?.split('\n')
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export default BlogPost
