const EmptyState = ({ title, description, action }) => (
  <div className="empty-state">
    <div className="empty-state__inner">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  </div>
)

export default EmptyState
