const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  children
}) => (
  <div
    className="section-heading"
    style={{
      textAlign: align,
      display: 'grid',
      gap: '0.85rem',
      justifyItems: align === 'center' ? 'center' : 'start',
      marginBottom: '2.5rem'
    }}
  >
    {eyebrow && <span className="tag">{eyebrow}</span>}
    {title && <h2 style={{ fontSize: '2.4rem', fontFamily: 'EB Garamond, serif', lineHeight: 1.1 }}>{title}</h2>}
    {description && (
      <p style={{ color: 'var(--text-secondary)', maxWidth: align === 'center' ? '620px' : '520px' }}>
        {description}
      </p>
    )}
    {children}
  </div>
)

export default SectionHeading
