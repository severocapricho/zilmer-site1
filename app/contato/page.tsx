import styles from './page.module.css'

export default function ContatoPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>Entre em Contato</h1>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <h3>Endereço</h3>
              <p>Rua São João Clímaco, 315</p>
              <p>São Paulo, SP</p>
              <p>CEP: 04255-000</p>
            </div>

            <div className={styles.infoCard}>
              <h3>Telefone</h3>
              <p><a href="tel:+551121487121">(11) 2148-7121</a></p>
            </div>

            <div className={styles.infoCard}>
              <h3>E-mail</h3>
              <p><a href="mailto:zilmer@zilmer.com.br">zilmer@zilmer.com.br</a></p>
              <p><a href="mailto:vendas@zilmer.com.br">vendas@zilmer.com.br</a></p>
              <p><a href="mailto:financeiro@zilmer.com.br">financeiro@zilmer.com.br</a></p>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>Envie uma Mensagem</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="telefone">Telefone</label>
                <input type="tel" id="telefone" name="telefone" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="assunto">Assunto</label>
                <input type="text" id="assunto" name="assunto" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="mensagem">Mensagem</label>
                <textarea id="mensagem" name="mensagem" rows={5} required></textarea>
              </div>

              <button type="submit" className="btn">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}





