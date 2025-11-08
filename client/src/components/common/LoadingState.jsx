const LoadingState = ({ message = 'Загружаем' }) => (
  <div className="loading-state">
    <span className="loading-state__spinner" aria-hidden="true" />
    <p>{message}…</p>
  </div>
)

export default LoadingState
