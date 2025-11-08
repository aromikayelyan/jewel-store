const features = [
  {
    title: 'Этика и прозрачность',
    description: 'Работаем с переработанным золотом и сертифицированными камнями. Каждый этап производства прозрачен.'
  },
  {
    title: 'Персонализация',
    description: 'Создаём украшения по индивидуальному эскизу и гравируем послания, чтобы изделие стало личной реликвией.'
  },
  {
    title: 'Сервис ухода',
    description: 'Бесплатно освежаем покрытие и проверяем крепления камней раз в год, чтобы изделие служило десятилетиями.'
  }
]

const FeatureHighlights = () => (
  <section className="section">
    <div className="container">
      <div className="feature-grid glass-panel">
        {features.map(feature => (
          <div key={feature.title} className="feature-grid__item">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default FeatureHighlights
