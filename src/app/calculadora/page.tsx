"use client";

import useCalculator from "./useCalculator";
import CalcHeader from "@/components/calculadora/CalcHeader";
import CalcDisplay from "@/components/calculadora/CalcDisplay";
import CalcPrecisionControl from "@/components/calculadora/CalcPrecisionControl";
import CalcKeypad from "@/components/calculadora/CalcKeypad";
import CalcHistory from "@/components/calculadora/CalcHistory";
import styles from "./page.module.css";

export default function Calculadora() {
  const {
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
  } = useCalculator();

  return (
    <div className={styles.container}>
      <div className={styles.glowBlob1} />
      <div className={styles.glowBlob2} />

      {/* Header */}
      <CalcHeader />

      {/* Main calculator layout */}
      <div className={styles.mainLayout}>
        <div className={styles.calcCard}>
          {/* Output Display */}
          <CalcDisplay
            expression={expression}
            display={display}
            resultDisplayRef={resultDisplayRef}
          />

          {/* Config & Memory Row */}
          <CalcPrecisionControl
            precision={precision}
            setPrecision={setPrecision}
            memory={memory}
            onMemoryClear={handleMemoryClear}
            onMemoryRecall={handleMemoryRecall}
            onMemoryAdd={handleMemoryAdd}
            onMemorySubtract={handleMemorySubtract}
            onMemoryStore={handleMemoryStore}
          />

          {/* Calculator Keyboard */}
          <CalcKeypad
            onClear={handleClear}
            onBackspace={handleBackspace}
            onOperator={handleOperator}
            onDigit={handleDigit}
            onDecimal={handleDecimal}
            onEquals={handleEquals}
            onSqrt={handleSqrt}
            onFactorial={handleFactorial}
            onNegate={handleNegate}
          />
        </div>

        {/* History Panel */}
        <CalcHistory
          history={history}
          onClearHistory={() => updateHistory([])}
          onRestoreHistory={handleRestoreHistory}
        />
      </div>
    </div>
  );
}
