import BlogCard from '../common/BlogCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'

const JournalPreview = ({ posts }) => (
  <section className="section">
    <div className="container">
      <SectionHeading
        eyebrow="Журнал"
        title="Истории, которые вдохновляют"
        description="Загляните в закулисье мастерской: делимся философией бренда, делаем подборки и рассказываем, как ухаживать за украшениями."
      />
      <div className="grid-3">
        {posts.map(post => (
          <BlogCard key={post.uid} post={post} />
        ))}
      </div>
    </div>
  </section>
)

export default JournalPreview
