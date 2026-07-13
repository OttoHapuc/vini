import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Header() {
  return (
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
  );
}
