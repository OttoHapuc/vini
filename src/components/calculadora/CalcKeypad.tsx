import styles from "@/app/calculadora/page.module.css";

interface CalcKeypadProps {
  onClear: () => void;
  onBackspace: () => void;
  onOperator: (op: string) => void;
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onEquals: () => void;
  onSqrt: () => void;
  onFactorial: () => void;
  onNegate: () => void;
}

export default function CalcKeypad({
  onClear,
  onBackspace,
  onOperator,
  onDigit,
  onDecimal,
  onEquals,
  onSqrt,
  onFactorial,
  onNegate,
}: CalcKeypadProps) {
  return (
    <div className={styles.keypad}>
      {/* Row 1 */}
      <button onClick={onClear} className={`${styles.key} ${styles.keyClear}`}>
        C
      </button>
      <button onClick={onBackspace} className={styles.key}>
        ⌫
      </button>
      <button onClick={() => onOperator("%")} className={`${styles.key} ${styles.keyOp}`}>
        mod
      </button>
      <button onClick={() => onOperator("^")} className={`${styles.key} ${styles.keyOp}`}>
        xʸ
      </button>
      <button onClick={() => onOperator("/")} className={`${styles.key} ${styles.keyOp}`}>
        ÷
      </button>

      {/* Row 2 */}
      <button onClick={onSqrt} className={`${styles.key} ${styles.keyAdv}`} data-adv="true">
        √
      </button>
      <button onClick={() => onDigit("7")} className={`${styles.key} ${styles.keyNum}`}>
        7
      </button>
      <button onClick={() => onDigit("8")} className={`${styles.key} ${styles.keyNum}`}>
        8
      </button>
      <button onClick={() => onDigit("9")} className={`${styles.key} ${styles.keyNum}`}>
        9
      </button>
      <button onClick={() => onOperator("*")} className={`${styles.key} ${styles.keyOp}`}>
        ×
      </button>

      {/* Row 3 */}
      <button onClick={onFactorial} className={`${styles.key} ${styles.keyAdv}`} data-adv="true">
        n!
      </button>
      <button onClick={() => onDigit("4")} className={`${styles.key} ${styles.keyNum}`}>
        4
      </button>
      <button onClick={() => onDigit("5")} className={`${styles.key} ${styles.keyNum}`}>
        5
      </button>
      <button onClick={() => onDigit("6")} className={`${styles.key} ${styles.keyNum}`}>
        6
      </button>
      <button onClick={() => onOperator("-")} className={`${styles.key} ${styles.keyOp}`}>
        −
      </button>

      {/* Row 4 */}
      <button onClick={onNegate} className={`${styles.key} ${styles.keyAdv}`} data-adv="true">
        ±
      </button>
      <button onClick={() => onDigit("1")} className={`${styles.key} ${styles.keyNum}`}>
        1
      </button>
      <button onClick={() => onDigit("2")} className={`${styles.key} ${styles.keyNum}`}>
        2
      </button>
      <button onClick={() => onDigit("3")} className={`${styles.key} ${styles.keyNum}`}>
        3
      </button>
      <button onClick={() => onOperator("+")} className={`${styles.key} ${styles.keyOp}`}>
        +
      </button>

      {/* Row 5 */}
      <button style={{ visibility: "hidden" }} className={styles.key}>
        spacer
      </button>
      <button onClick={() => onDigit("0")} className={`${styles.key} ${styles.keyNum}`}>
        0
      </button>
      <button onClick={onDecimal} className={styles.key}>
        ,
      </button>
      <button
        onClick={onEquals}
        className={`${styles.key} ${styles.keyEquals}`}
        style={{ gridColumn: "span 2" }}
      >
        =
      </button>
    </div>
  );
}
