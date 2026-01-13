import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>CONTATO</h3>
            <p><strong>Endereço:</strong> Rua São João Clímaco, 315 - São Paulo, SP</p>
            <p><strong>CEP:</strong> 04255-000</p>
            <p><strong>Telefone:</strong> <a href="tel:+551121487121">(11) 2148-7121</a></p>
          </div>

          <div className={styles.section}>
            <h3>E-MAIL</h3>
            <p><a href="mailto:zilmer@zilmer.com.br">zilmer@zilmer.com.br</a></p>
            <p><a href="mailto:vendas@zilmer.com.br">vendas@zilmer.com.br</a></p>
            <p><a href="mailto:financeiro@zilmer.com.br">financeiro@zilmer.com.br</a></p>
          </div>

          <div className={styles.section}>
            <h3>REDES SOCIAIS</h3>
            <div className={styles.socialLinks}>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                Twitter
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                Youtube
              </a>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Zilmer Transformadores. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
