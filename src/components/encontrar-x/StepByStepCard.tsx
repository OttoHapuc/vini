"use client";

import React, { useState } from "react";
import styles from "@/app/encontrar-x/page.module.css";

export interface MathStep {
  title: string;
  expression?: string;
  description: string;
}

interface StepByStepCardProps {
  xValue: string | null;
  unit?: string;
  subtitle?: string;
  steps: MathStep[];
  error?: string | null;
}

export default function StepByStepCard({
  xValue,
  unit,
  subtitle,
  steps,
  error,
}: StepByStepCardProps) {
  const [copied, setCopied] = useState(false);
  const [showSteps, setShowSteps] = useState(true);

  const handleCopy = () => {
    if (xValue) {
      navigator.clipboard.writeText(xValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (error) {
    return (
      <div className={styles.errorCard}>
        <div className={styles.errorIcon}>⚠️</div>
        <div className={styles.errorText}>
          <h4>Não foi possível calcular o valor de X</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (xValue === null) {
    return (
      <div className={styles.emptyCard}>
        <div className={styles.emptyIcon}>🔍</div>
        <p>Preencha os valores nas entradas para encontrar o valor de X e visualizar a resolução passo a passo.</p>
      </div>
    );
  }

  return (
    <div className={styles.resultContainer}>
      {/* Principal Destaque de X */}
      <div className={styles.xHighlightCard}>
        <div className={styles.xHighlightHeader}>
          <span className={styles.xLabel}>Resultado Calculado</span>
          {subtitle && <span className={styles.xSubtitle}>{subtitle}</span>}
        </div>

        <div className={styles.xValueRow}>
          <div className={styles.xMainDisplay}>
            <span className={styles.xSymbol}>X =</span>
            <span className={styles.xNumber}>{xValue}</span>
            {unit && <span className={styles.xUnit}>{unit}</span>}
          </div>

          <button
            onClick={handleCopy}
            className={styles.copyBtn}
            title="Copiar resultado"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Copiado</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Seção de Passo a Passo */}
      {steps && steps.length > 0 && (
        <div className={styles.stepsCard}>
          <div className={styles.stepsHeader}>
            <div className={styles.stepsTitleArea}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Resolução Passo a Passo</span>
            </div>

            <button
              onClick={() => setShowSteps(!showSteps)}
              className={styles.toggleStepsBtn}
            >
              {showSteps ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {showSteps && (
            <div className={styles.stepsList}>
              {steps.map((step, idx) => (
                <div key={idx} className={styles.stepItem}>
                  <div className={styles.stepBadge}>{idx + 1}</div>
                  <div className={styles.stepContent}>
                    <div className={styles.stepTitle}>{step.title}</div>
                    {step.expression && (
                      <div className={styles.stepExpression}>
                        {step.expression}
                      </div>
                    )}
                    <div className={styles.stepDescription}>
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
