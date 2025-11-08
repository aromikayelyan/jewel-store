const Newsletter = () => (
  <section className="section">
    <div className="container">
      <div className="newsletter glass-panel">
        <div className="newsletter__content">
          <span className="tag">Никакого спама</span>
          <h3>Присоединяйтесь к закрытому клубу MOAH</h3>
          <p>
            Рассказываем о новых коллекциях первыми, делимся вдохновением и отправляем приглашения на камерные встречи в
            нашей мастерской.
          </p>
        </div>
        <form
          className="newsletter__form"
          onSubmit={event => {
            event.preventDefault()
            const form = event.currentTarget
            form.reset()
          }}
        >
          <input type="email" name="email" placeholder="Ваш email" required aria-label="Email" />
          <button type="submit">Подписаться</button>
        </form>
      </div>
    </div>
  </section>
)

export default Newsletter
