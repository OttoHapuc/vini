import React from "react";
import styles from "@/app/calculadora/page.module.css";

interface CalcDisplayProps {
  expression: string;
  display: string;
  resultDisplayRef: React.RefObject<HTMLDivElement | null>;
}

export default function CalcDisplay({
  expression,
  display,
  resultDisplayRef,
}: CalcDisplayProps) {
  return (
    <div className={styles.displayPanel}>
      <div className={styles.expressionDisplay}>{expression}</div>
      <div className={styles.resultDisplay} ref={resultDisplayRef}>
        {display}
      </div>
    </div>
  );
}
