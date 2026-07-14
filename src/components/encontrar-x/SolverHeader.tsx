"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/encontrar-x/page.module.css";

export default function SolverHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <Link href="/" className={styles.logo}>
          InfiniMath<span className={styles.logoDot} />
        </Link>
        <span className={styles.headerBadge}>Solucionador de X</span>
      </div>

      {/* Seletor rápido de ferramentas do InfiniMath */}
      <div className={styles.toolSwitcher}>
        <Link
          href="/calculadora"
          className={`${styles.toolBtn} ${pathname === "/calculadora" ? styles.toolBtnActive : ""}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="16" y1="14" x2="16" y2="18"></line>
            <path d="M16 10h.01"></path>
            <path d="M12 10h.01"></path>
            <path d="M8 10h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M8 14h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M8 18h.01"></path>
          </svg>
          Alta Precisão
        </Link>
        <Link
          href="/encontrar-x"
          className={`${styles.toolBtn} ${pathname === "/encontrar-x" ? styles.toolBtnActive : ""}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Encontrar o X
        </Link>
      </div>

      <Link href="/" className={styles.backBtn}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Voltar
      </Link>
    </header>
  );
}
