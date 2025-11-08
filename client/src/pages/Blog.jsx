import BlogCard from '../components/common/BlogCard.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import { useAppData } from '../context/AppDataProvider.jsx'

const Blog = () => {
  const { blogs } = useAppData()

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Журнал"
          title="Истории мастерской"
          description="Исследуем мир украшений, делимся советами по уходу и приглашаем вас в наше творческое пространство."
          align="center"
        />
        <div className="grid-3">
          {blogs.map(post => (
            <BlogCard key={post.uid} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
