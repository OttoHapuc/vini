"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Decimal from "decimal.js";
import styles from "./page.module.css";

interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
}

export default function Calculadora() {
  const [display, setDisplay] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [firstOperand, setFirstOperand] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [precision, setPrecision] = useState<number>(100);
  const [memory, setMemory] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Ref to display container for auto scroll to bottom
  const resultDisplayRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the result display when numbers grow
  useEffect(() => {
    if (resultDisplayRef.current) {
      resultDisplayRef.current.scrollTop = resultDisplayRef.current.scrollHeight;
    }
  }, [display]);

  // Load history from localStorage if available
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedHistory = localStorage.getItem("calc_history");
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Erro ao carregar histórico", e);
        }
      }
      const savedMemory = localStorage.getItem("calc_memory");
      if (savedMemory) {
        setMemory(savedMemory);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync memory and history
  const updateHistory = (newHistory: HistoryEntry[]) => {
    setHistory(newHistory);
    localStorage.setItem("calc_history", JSON.stringify(newHistory));
  };

  const handleSetMemory = (val: string | null) => {
    setMemory(val);
    if (val) {
      localStorage.setItem("calc_memory", val);
    } else {
      localStorage.removeItem("calc_memory");
    }
  };

  // Safe arithmetic operation wrapper
  const performCalculation = (
    first: string,
    second: string,
    op: string
  ): string => {
    try {
      Decimal.set({ precision: precision });
      const decFirst = new Decimal(first);
      const decSecond = new Decimal(second);
      let res: Decimal;

      switch (op) {
        case "+":
          res = decFirst.plus(decSecond);
          break;
        case "-":
          res = decFirst.minus(decSecond);
          break;
        case "*":
          res = decFirst.times(decSecond);
          break;
        case "/":
          if (decSecond.isZero()) return "Erro: Divisão por zero";
          res = decFirst.div(decSecond);
          break;
        case "^":
          res = decFirst.pow(decSecond);
          break;
        case "%":
          res = decFirst.mod(decSecond);
          break;
        default:
          return "Erro";
      }
      return res.toString();
    } catch (err: unknown) {
      return "Erro: " + (err instanceof Error ? err.message : String(err));
    }
  };

  // Keyboard and Button Handlers
  const handleDigit = (digit: string) => {
    if (display === "Erro" || display.startsWith("Erro:")) {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (nextOperator: string) => {
    if (display === "Erro" || display.startsWith("Erro:")) return;

    const inputValue = display;

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator && !waitingForOperand) {
      const result = performCalculation(firstOperand, inputValue, operator);
      setDisplay(result);
      setFirstOperand(result);
    }

    setOperator(nextOperator);
    setExpression(`${firstOperand === null || waitingForOperand ? inputValue : firstOperand} ${nextOperator}`);
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    if (operator === null || firstOperand === null || waitingForOperand) return;

    const inputValue = display;
    const result = performCalculation(firstOperand, inputValue, operator);

    if (result.startsWith("Erro")) {
      setDisplay(result);
      setFirstOperand(null);
      setOperator(null);
      setExpression("");
      setWaitingForOperand(true);
      return;
    }

    const newExpr = `${firstOperand} ${operator} ${inputValue} =`;
    setExpression(newExpr);
    setDisplay(result);
    setFirstOperand(null);
    setOperator(null);
    setWaitingForOperand(true);

    // Save to history
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      expression: newExpr,
      result: result,
    };
    updateHistory([entry, ...history].slice(0, 50)); // Keep last 50
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (display === "Erro" || display.startsWith("Erro:") || waitingForOperand) {
      setDisplay("0");
      return;
    }

    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  // Special Unary Operations
  const handleSqrt = () => {
    try {
      Decimal.set({ precision: precision });
      const dec = new Decimal(display);
      if (dec.isNegative()) {
        setDisplay("Erro: Raiz de negativo");
        return;
      }
      const result = dec.squareRoot().toString();
      const newExpr = `√(${display}) =`;
      setExpression(newExpr);
      setDisplay(result);
      setWaitingForOperand(true);

      const entry: HistoryEntry = {
        id: Date.now().toString(),
        expression: newExpr,
        result: result,
      };
      updateHistory([entry, ...history].slice(0, 50));
    } catch {
      setDisplay("Erro");
    }
  };

  const handleFactorial = () => {
    try {
      Decimal.set({ precision: precision });
      const dec = new Decimal(display);
      if (!dec.isInteger() || dec.isNegative()) {
        setDisplay("Erro: Inteiro ≥ 0");
        return;
      }
      if (dec.greaterThan(3000)) {
        setDisplay("Erro: Max 3000!");
        return;
      }

      const num = dec.toNumber();
      let res = new Decimal(1);
      for (let i = 2; i <= num; i++) {
        res = res.times(i);
      }

      const result = res.toString();
      const newExpr = `${display}! =`;
      setExpression(newExpr);
      setDisplay(result);
      setWaitingForOperand(true);

      const entry: HistoryEntry = {
        id: Date.now().toString(),
        expression: newExpr,
        result: result,
      };
      updateHistory([entry, ...history].slice(0, 50));
    } catch {
      setDisplay("Erro");
    }
  };

  const handleNegate = () => {
    if (display === "0" || display.startsWith("Erro")) return;
    if (display.startsWith("-")) {
      setDisplay(display.slice(1));
    } else {
      setDisplay("-" + display);
    }
  };

  // Memory Functions
  const handleMemoryClear = () => {
    handleSetMemory(null);
  };

  const handleMemoryRecall = () => {
    if (memory !== null) {
      setDisplay(memory);
      setWaitingForOperand(true);
    }
  };

  const handleMemoryAdd = () => {
    try {
      Decimal.set({ precision: precision });
      const currentVal = new Decimal(display);
      const memVal = memory ? new Decimal(memory) : new Decimal(0);
      const result = memVal.plus(currentVal).toString();
      handleSetMemory(result);
      setWaitingForOperand(true);
    } catch {
      setDisplay("Erro");
    }
  };

  const handleMemorySubtract = () => {
    try {
      Decimal.set({ precision: precision });
      const currentVal = new Decimal(display);
      const memVal = memory ? new Decimal(memory) : new Decimal(0);
      const result = memVal.minus(currentVal).toString();
      handleSetMemory(result);
      setWaitingForOperand(true);
    } catch {
      setDisplay("Erro");
    }
  };

  const handleMemoryStore = () => {
    if (display !== "Erro" && !display.startsWith("Erro:")) {
      handleSetMemory(display);
      setWaitingForOperand(true);
    }
  };

  // Ref to store handlers for keyboard listener to avoid stale closures and missing dependencies
  const keyHandlersRef = useRef({
    handleDigit,
    handleDecimal,
    handleOperator,
    handleEquals,
    handleBackspace,
    handleClear,
    handleFactorial,
  });

  useEffect(() => {
    keyHandlersRef.current = {
      handleDigit,
      handleDecimal,
      handleOperator,
      handleEquals,
      handleBackspace,
      handleClear,
      handleFactorial,
    };
  });

  // Keyboard support mapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;

      // Digits
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        keyHandlersRef.current.handleDigit(key);
      }
      // Decimal point
      else if (key === "," || key === ".") {
        e.preventDefault();
        keyHandlersRef.current.handleDecimal();
      }
      // Operators
      else if (key === "+") {
        e.preventDefault();
        keyHandlersRef.current.handleOperator("+");
      } else if (key === "-") {
        e.preventDefault();
        keyHandlersRef.current.handleOperator("-");
      } else if (key === "*") {
        e.preventDefault();
        keyHandlersRef.current.handleOperator("*");
      } else if (key === "/") {
        e.preventDefault();
        keyHandlersRef.current.handleOperator("/");
      } else if (key === "%") {
        e.preventDefault();
        keyHandlersRef.current.handleOperator("%");
      } else if (key === "^") {
        e.preventDefault();
        keyHandlersRef.current.handleOperator("^");
      }
      // Equals
      else if (key === "Enter" || key === "=") {
        e.preventDefault();
        keyHandlersRef.current.handleEquals();
      }
      // Backspace
      else if (key === "Backspace") {
        e.preventDefault();
        keyHandlersRef.current.handleBackspace();
      }
      // Clear
      else if (key === "Escape") {
        e.preventDefault();
        keyHandlersRef.current.handleClear();
      }
      // Factorial
      else if (key === "!") {
        e.preventDefault();
        keyHandlersRef.current.handleFactorial();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.glowBlob1} />
      <div className={styles.glowBlob2} />

      {/* Header */}
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

      {/* Main calculator layout */}
      <div className={styles.mainLayout}>
        <div className={styles.calcCard}>
          {/* Output Display */}
          <div className={styles.displayPanel}>
            <div className={styles.expressionDisplay}>{expression}</div>
            <div className={styles.resultDisplay} ref={resultDisplayRef}>
              {display}
            </div>
          </div>

          {/* Config & Memory Row */}
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
              <button onClick={handleMemoryClear} className={styles.memBtn}>
                MC
              </button>
              <button
                onClick={handleMemoryRecall}
                className={`${styles.memBtn} ${memory !== null ? styles.memBtnActive : ""}`}
              >
                MR
              </button>
              <button onClick={handleMemoryAdd} className={styles.memBtn}>
                M+
              </button>
              <button onClick={handleMemorySubtract} className={styles.memBtn}>
                M-
              </button>
              <button onClick={handleMemoryStore} className={styles.memBtn}>
                MS
              </button>
            </div>
          </div>

          {/* Calculator Keyboard */}
          <div className={styles.keypad}>
            {/* Row 1 */}
            <button
              onClick={handleClear}
              className={`${styles.key} ${styles.keyClear}`}
            >
              C
            </button>
            <button onClick={handleBackspace} className={styles.key}>
              ⌫
            </button>
            <button
              onClick={() => handleOperator("%")}
              className={`${styles.key} ${styles.keyOp}`}
            >
              mod
            </button>
            <button
              onClick={() => handleOperator("^")}
              className={`${styles.key} ${styles.keyOp}`}
            >
              xʸ
            </button>
            <button
              onClick={() => handleOperator("/")}
              className={`${styles.key} ${styles.keyOp}`}
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={handleSqrt}
              className={`${styles.key} ${styles.keyAdv}`}
              data-adv="true"
            >
              √
            </button>
            <button
              onClick={() => handleDigit("7")}
              className={`${styles.key} ${styles.keyNum}`}
            >
              7
            </button>
            <button
              onClick={() => handleDigit("8")}
              className={`${styles.key} ${styles.keyNum}`}
            >
              8
            </button>
            <button
              onClick={() => handleDigit("9")}
              className={`${styles.key} ${styles.keyNum}`}
            >
              9
            </button>
            <button
              onClick={() => handleOperator("*")}
              className={`${styles.key} ${styles.keyOp}`}
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={handleFactorial}
              className={`${styles.key} ${styles.keyAdv}`}
              data-adv="true"
            >
              n!
            </button>
            <button
              onClick={() => handleDigit("4")}
              className={`${styles.key} ${styles.keyNum}`}
            >
              4
            </button>
            <button
              onClick={() => handleDigit("5")}
              className={`${styles.key} ${styles.keyNum}`}
            >
              5
            </button>
            <button
              onClick={() => handleDigit("6")}
              className={`${styles.key} ${styles.keyNum}`}
            >
              6
            </button>
            <button
              onClick={() => handleOperator("-")}
              className={`${styles.key} ${styles.keyOp}`}
            >
              −
            </button>

            {/* Row 4 */}
            <button
              onClick={handleNegate}
              className={`${styles.key} ${styles.keyAdv}`}
              data-adv="true"
            >
              ±
            </button>
            <button
              onClick={() => handleDigit("1")}
              className={`${styles.key} ${styles.keyNum}`}
            >
              1
            </button>
            <button
              onClick={() => handleDigit("2")}
              className={`${styles.key} ${styles.keyNum}`}
            >
              2
            </button>
            <button
              onClick={() => handleDigit("3")}
              className={`${styles.key} ${styles.keyNum}`}
            >
              3
            </button>
            <button
              onClick={() => handleOperator("+")}
              className={`${styles.key} ${styles.keyOp}`}
            >
              +
            </button>

            {/* Row 5 */}
            <button style={{ visibility: "hidden" }} className={styles.key}>
              spacer
            </button>
            <button
              onClick={() => handleDigit("0")}
              className={`${styles.key} ${styles.keyNum}`}
              style={{ gridColumn: "span 1" }}
            >
              0
            </button>
            <button onClick={handleDecimal} className={styles.key}>
              ,
            </button>
            <button
              onClick={handleEquals}
              className={`${styles.key} ${styles.keyEquals}`}
              style={{ gridColumn: "span 2" }}
            >
              =
            </button>
          </div>
        </div>

        {/* History Panel */}
        <div className={styles.historyPanel}>
          <div className={styles.historyHeader}>
            <h3 className={styles.historyTitle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Histórico
            </h3>
            {history.length > 0 && (
              <button
                onClick={() => updateHistory([])}
                className={styles.historyClearBtn}
              >
                Limpar
              </button>
            )}
          </div>
          <div className={styles.historyList}>
            {history.length === 0 ? (
              <div className={styles.emptyHistory}>Nenhum cálculo recente</div>
            ) : (
              history.map((entry) => (
                <div
                  key={entry.id}
                  className={styles.historyItem}
                  onClick={() => {
                    setDisplay(entry.result);
                    setExpression(entry.expression);
                    setFirstOperand(null);
                    setOperator(null);
                    setWaitingForOperand(true);
                  }}
                  title="Clique para restaurar cálculo"
                >
                  <div className={styles.historyExpr}>{entry.expression}</div>
                  <div className={styles.historyRes}>{entry.result}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
