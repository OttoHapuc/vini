import styles from "@/app/page.module.css";

export default function Testimonials() {
  return (
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
  );
}
