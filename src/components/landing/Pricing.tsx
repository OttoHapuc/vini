import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Pricing() {
  return (
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
  );
}
