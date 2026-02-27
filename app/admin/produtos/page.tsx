'use client'

import Link from 'next/link'
import styles from '../page.module.css'

export default function AdminProdutosPage() {
  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>Editor de Conteúdo - Produtos</h1>
        <p>Esta área de administração de produtos ainda está em desenvolvimento.</p>
        <p>
          Enquanto isso, você pode editar os conteúdos principais em{' '}
          <Link href="/admin">/admin</Link> e <Link href="/admin/sobre">/admin/sobre</Link>.
        </p>
      </div>
    </div>
  )
}
