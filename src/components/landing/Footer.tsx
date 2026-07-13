import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Footer() {
  return (
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
  );
}
