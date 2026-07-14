import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <span className={styles.badge}>A Nova Era dos Cálculos de Alta Precisão</span>
      <h1 className={styles.title}>
        Cálculos sem Limites.<br />Precisão Infinitamente.
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
  );
}
