import Button from '../components/common/Button.jsx'

const NotFound = () => (
  <section className="section">
    <div className="container">
      <div className="glass-panel not-found">
        <span className="tag">Ошибка 404</span>
        <h1>Страница не найдена</h1>
        <p>Возможно, мы переместили этот раздел. Вернитесь на главную или перейдите в каталог украшений.</p>
        <div className="not-found__actions">
          <Button as="a" href="/" variant="primary">
            На главную
          </Button>
          <Button as="a" href="/catalog" variant="ghost">
            К коллекции
          </Button>
        </div>
      </div>
    </div>
  </section>
)

export default NotFound
