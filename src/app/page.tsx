import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Decorative Blur Blobs */}
      <div className={styles.glowBlob1} />
      <div className={styles.glowBlob2} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          vini<span className={styles.logoDot} />
        </div>
        <nav className={styles.navLinks}>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            Docs
          </a>
          <a
            href="https://github.com/vercel/next.js"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            GitHub
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <span className={styles.badge}>Next.js + Vanilla CSS</span>
          <h1 className={styles.title}>
            Seu novo projeto começou com sucesso.
          </h1>
          <p className={styles.subtitle}>
            Uma base de código extremamente limpa, rápida e estruturada com App Router, TypeScript e estilos CSS nativos de alta performance.
          </p>
          <div className={styles.buttons}>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryBtn}
            >
              Começar a Explorar
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a
              href="https://vercel.com/templates?framework=next.js"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              Templates Next.js
            </a>
          </div>
        </section>

        {/* Feature Grid */}
        <section className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <h2 className={styles.cardTitle}>App Router</h2>
            <p className={styles.cardDescription}>
              Estrutura baseada no sistema de arquivos avançado do Next.js. Suporta layouts aninhados, componentes de servidor e streaming.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <h2 className={styles.cardTitle}>TypeScript</h2>
            <p className={styles.cardDescription}>
              Configuração tipada robusta de fábrica. Detecção de erros em tempo real e autocomplete superior no editor.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                <path d="M12 16V12"></path>
                <path d="M12 8H12.01"></path>
              </svg>
            </div>
            <h2 className={styles.cardTitle}>Vanilla CSS</h2>
            <p className={styles.cardDescription}>
              Estilização extremamente flexível, sem o peso ou a rigidez de frameworks externos. Total controle sobre cada pixel e animação.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Desenvolvido com <span className={styles.heart}>♥</span> para o projeto vini.
        </p>
        <p>&copy; {new Date().getFullYear()} Next.js App.</p>
      </footer>
    </div>
  );
}
