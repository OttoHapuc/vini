import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Background Decorative Globs */}
      <div className={styles.glowBlob1} />
      <div className={styles.glowBlob2} />
      <div className={styles.glowBlob3} />

      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          InfiniMath<span className={styles.logoDot} />
        </Link>
        <nav className={styles.navLinks}>
          <a href="#recursos" className={styles.navLink}>
            Recursos
          </a>
          <a href="#precos" className={styles.navLink}>
            Preços
          </a>
          <a href="#depoimentos" className={styles.navLink}>
            Depoimentos
          </a>
          <Link href="/calculadora" className={styles.ctaHeader}>
            Abrir Calculadora
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <span className={styles.badge}>A Nova Era dos Cálculos de Alta Precisão</span>
          <h1 className={styles.title}>
            Cálculos sem Limites.<br />Precisão Infinita.
          </h1>
          <p className={styles.subtitle}>
            Conheça o <strong>InfiniMath</strong>, o motor matemático definitivo projetado para cientistas, engenheiros e analistas. Calcule fatoriais gigantescos, exponenciações absurdas e operações complexas com até 1.000 dígitos de precisão exata.
          </p>
          <div className={styles.buttons}>
            <Link href="/calculadora" className={styles.primaryBtn}>
              Começar Agora (Grátis)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <a href="#recursos" className={styles.secondaryBtn}>
              Conhecer Recursos
            </a>
          </div>
        </section>

        {/* Feature Section */}
        <section id="recursos" className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Precisão Extrema de Fábrica</h2>
            <p className={styles.sectionSubtitle}>
              Diga adeus aos erros de arredondamento causados pelo limite padrão IEEE 754 de computadores.
            </p>
          </div>

          <div className={styles.grid}>
            {/* Card 1 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Precisão Customizável</h3>
              <p className={styles.cardDescription}>
                Escolha a precisão de cálculo de 10 a 1.000 dígitos significativos. Ideal para cálculos astrofísicos, estatísticos e criptográficos de alta exatidão.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Operações Ultra Complexas</h3>
              <p className={styles.cardDescription}>
                Calcule potências com expoentes gigantescos (`x^y`), fatorial até `3000!`, divisões e módulos com precisão arbitrária sem nenhum atraso.
              </p>
            </div>

            {/* Card 3 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Histórico de Sessão</h3>
              <p className={styles.cardDescription}>
                Uma linha do tempo de operações que armazena os cálculos mais complexos que você realizou na sessão, permitindo restaurar qualquer expressão em um clique.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="precos" className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Planos Simples e Transparentes</h2>
            <p className={styles.sectionSubtitle}>
              Escolha a precisão ideal para os seus desafios acadêmicos ou corporativos.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {/* Free Plan */}
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3 className={styles.pricingName}>Versão Standard</h3>
                <div className={styles.pricingPrice}>
                  <span className={styles.priceAmount}>R$ 0</span>
                  <span className={styles.pricePeriod}>/ sempre grátis</span>
                </div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li className={styles.pricingFeatureItem}>
                  <svg className={styles.pricingFeatureItemIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Até 100 dígitos significativos
                </li>
                <li className={styles.pricingFeatureItem}>
                  <svg className={styles.pricingFeatureItemIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Operações avançadas (n!, xʸ, √, mod)
                </li>
                <li className={styles.pricingFeatureItem}>
                  <svg className={styles.pricingFeatureItemIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Histórico de cálculos local
                </li>
                <li className={styles.pricingFeatureItem}>
                  <svg className={styles.pricingFeatureItemIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Suporte total ao teclado físico
                </li>
              </ul>
              <Link href="/calculadora" className={`${styles.pricingBtn} ${styles.pricingBtnSecondary}`}>
                Acessar Calculadora
              </Link>
            </div>

            {/* Pro Plan */}
            <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
              <div className={styles.popularBadge}>Mais Popular</div>
              <div className={styles.pricingHeader}>
                <h3 className={styles.pricingName}>InfiniMath Pro</h3>
                <div className={styles.pricingPrice}>
                  <span className={styles.priceAmount}>R$ 19</span>
                  <span className={styles.pricePeriod}>/ mês</span>
                </div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li className={styles.pricingFeatureItem}>
                  <svg className={styles.pricingFeatureItemIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Até 1.000 dígitos significativos
                </li>
                <li className={styles.pricingFeatureItem}>
                  <svg className={styles.pricingFeatureItemIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Fatorial estendido até 10.000!
                </li>
                <li className={styles.pricingFeatureItem}>
                  <svg className={styles.pricingFeatureItemIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Histórico infinito em nuvem
                </li>
                <li className={styles.pricingFeatureItem}>
                  <svg className={styles.pricingFeatureItemIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Exportação de dados para CSV/JSON
                </li>
              </ul>
              <Link href="/calculadora" className={`${styles.pricingBtn} ${styles.pricingBtnPrimary}`}>
                Experimentar Versão Pro
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Aprovado por Profissionais</h2>
            <p className={styles.sectionSubtitle}>
              Quem usa o InfiniMath aprova a alta exatidão numérica.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialQuote}>
                &ldquo;O InfiniMath resolveu um grande gargalo na validação de cálculos astrofísicos. As inconsistências de arredondamento do JavaScript padrão sumiram.&rdquo;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>AR</div>
                <div className={styles.authorMeta}>
                  <span className={styles.authorName}>Dr. Arthur Ramos</span>
                  <span className={styles.authorTitle}>Astrofísico e Pesquisador</span>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <p className={styles.testimonialQuote}>
                &ldquo;Calcular fatoriais enormes e divisões com precisão milimétrica é excelente para modelagem estatística. E o mapeamento de atalhos do teclado é cirúrgico.&rdquo;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>MS</div>
                <div className={styles.authorMeta}>
                  <span className={styles.authorName}>Mariana Santos</span>
                  <span className={styles.authorTitle}>Cientista de Dados</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <Link href="/" className={styles.logo}>
            InfiniMath<span className={styles.logoDot} />
          </Link>
          <div className={styles.footerLinks}>
            <a href="#recursos" className={styles.footerLink}>Recursos</a>
            <a href="#precos" className={styles.footerLink}>Preços</a>
            <a href="#depoimentos" className={styles.footerLink}>Depoimentos</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            Desenvolvido com <span className={styles.heart}>♥</span> para a plataforma vini.
          </p>
          <p>&copy; {new Date().getFullYear()} InfiniMath. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
