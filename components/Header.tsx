'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/logoaba4.png" alt="Zilmer Transformadores" />
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            INÍCIO
          </Link>
          
          <div 
            className={styles.dropdown}
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <span>SOBRE</span>
            {isAboutOpen && (
              <>
                <div className={styles.dropdownBridge}></div>
                <div className={styles.dropdownMenu}>
                  <Link href="/sobre" onClick={() => setIsMenuOpen(false)}>
                    SOBRE NÓS
                  </Link>
                  <Link href="/sobre/historico" onClick={() => setIsMenuOpen(false)}>
                    HISTÓRICO
                  </Link>
                  <Link href="/sobre/clientes" onClick={() => setIsMenuOpen(false)}>
                    CLIENTES
                  </Link>
                  <Link href="/sobre/certificados" onClick={() => setIsMenuOpen(false)}>
                    CERTIFICADOS
                  </Link>
                </div>
              </>
            )}
          </div>

          <div 
            className={styles.dropdown}
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <span>PRODUTOS</span>
            {isProductsOpen && (
              <>
                <div className={styles.dropdownBridge}></div>
                <div className={styles.dropdownMenu}>
                  <Link href="/produtos/transformadores-oleo" onClick={() => setIsMenuOpen(false)}>
                    TRANSFORMADORES IMERSOS EM ÓLEO
                  </Link>
                  <Link href="/produtos/transformadores-seco" onClick={() => setIsMenuOpen(false)}>
                    TRANSFORMADORES A SECO
                  </Link>
                  <Link href="/produtos/transformadores-instrumentos" onClick={() => setIsMenuOpen(false)}>
                    TRANSFORMADORES PARA INSTRUMENTOS
                  </Link>
                </div>
              </>
            )}
          </div>

          <Link href="/contato" onClick={() => setIsMenuOpen(false)}>
            CONTATO
          </Link>
        </nav>

        <button 
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

