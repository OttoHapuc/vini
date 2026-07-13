import Link from "next/link";
import styles from "@/app/calculadora/page.module.css";

export default function CalcHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <Link href="/" className={styles.logo}>
          InfiniMath<span className={styles.logoDot} />
        </Link>
      </div>
      <Link href="/" className={styles.backBtn}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Voltar para Apresentação
      </Link>
    </header>
  );
}
