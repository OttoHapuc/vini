import { useState, useEffect, useRef } from "react";
import Decimal from "decimal.js";

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
}

export default function useCalculator() {
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

  // Ref to store handlers for keyboard listener to avoid stale closures
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

      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        keyHandlersRef.current.handleDigit(key);
      } else if (key === "," || key === ".") {
        e.preventDefault();
        keyHandlersRef.current.handleDecimal();
      } else if (key === "+") {
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
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        keyHandlersRef.current.handleEquals();
      } else if (key === "Backspace") {
        e.preventDefault();
        keyHandlersRef.current.handleBackspace();
      } else if (key === "Escape") {
        e.preventDefault();
        keyHandlersRef.current.handleClear();
      } else if (key === "!") {
        e.preventDefault();
        keyHandlersRef.current.handleFactorial();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleRestoreHistory = (entry: HistoryEntry) => {
    setDisplay(entry.result);
    setExpression(entry.expression);
    setFirstOperand(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  return {
    display,
    expression,
    precision,
    memory,
    history,
    resultDisplayRef,
    setPrecision,
    updateHistory,
    handleDigit,
    handleDecimal,
    handleOperator,
    handleEquals,
    handleClear,
    handleBackspace,
    handleSqrt,
    handleFactorial,
    handleNegate,
    handleMemoryClear,
    handleMemoryRecall,
    handleMemoryAdd,
    handleMemorySubtract,
    handleMemoryStore,
    handleRestoreHistory,
  };
}
