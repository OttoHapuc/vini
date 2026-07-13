import styles from "@/app/page.module.css";

export default function Features() {
  return (
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
  );
}
