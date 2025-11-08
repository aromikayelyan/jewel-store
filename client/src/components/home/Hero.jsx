import { Link } from 'react-router-dom'
import Button from '../common/Button.jsx'

const Hero = () => (
  <section className="hero section">
    <div className="container hero__grid">
      <div className="hero__content">
        <span className="tag">Новая коллекция · 2024</span>
        <h1>
          Украшения, которые подчёркивают <span className="gradient-text">вашу историю</span>
        </h1>
        <p>
          Мы создаём изделия вручную и работаем только с ответственными поставщиками. Каждое украшение MOAH —
          это знак внимания к себе и эстетика, которая не устаревает.
        </p>
        <div className="hero__actions">
          <Button as={Link} to="/catalog" variant="primary" size="lg">
            Смотреть коллекцию
          </Button>
          <Button as={Link} to="/about" variant="ghost" size="lg">
            О мастерской
          </Button>
        </div>
        <ul className="hero__stats">
          <li>
            <span>12 лет</span>
            <p>создаём украшения вручную</p>
          </li>
          <li>
            <span>85%</span>
            <p>клиентов возвращаются за новым изделием</p>
          </li>
          <li>
            <span>∞</span>
            <p>вдохновения от природы и архитектуры</p>
          </li>
        </ul>
      </div>
      <div className="hero__visual">
        <div className="hero__visual-card">
          <div className="hero__visual-media" />
          <div className="hero__badge">
            <span>В наличии</span>
            <p>Серьги «Solstice»</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Hero
