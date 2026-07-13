import styles from "@/app/calculadora/page.module.css";

interface CalcPrecisionControlProps {
  precision: number;
  setPrecision: (precision: number) => void;
  memory: string | null;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
  onMemoryStore: () => void;
}

export default function CalcPrecisionControl({
  precision,
  setPrecision,
  memory,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract,
  onMemoryStore,
}: CalcPrecisionControlProps) {
  return (
    <div className={styles.controlRow}>
      {/* Precision Config */}
      <div className={styles.precisionControl}>
        <span className={styles.precisionLabel}>Precisão (Dígitos):</span>
        <input
          type="number"
          min="10"
          max="1000"
          value={precision}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 10 && val <= 1000) {
              setPrecision(val);
            }
          }}
          className={styles.precisionInput}
        />
      </div>

      {/* Memory Buttons */}
      <div className={styles.memBar}>
        <button onClick={onMemoryClear} className={styles.memBtn}>
          MC
        </button>
        <button
          onClick={onMemoryRecall}
          className={`${styles.memBtn} ${memory !== null ? styles.memBtnActive : ""}`}
        >
          MR
        </button>
        <button onClick={onMemoryAdd} className={styles.memBtn}>
          M+
        </button>
        <button onClick={onMemorySubtract} className={styles.memBtn}>
          M-
        </button>
        <button onClick={onMemoryStore} className={styles.memBtn}>
          MS
        </button>
      </div>
    </div>
  );
}
