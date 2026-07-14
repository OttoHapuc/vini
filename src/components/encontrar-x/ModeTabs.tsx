"use client";

import React from "react";
import styles from "@/app/encontrar-x/page.module.css";

export type SolverMode =
  | "regra3-simples"
  | "regra3-composta"
  | "equacao-1grau"
  | "equacao-2grau"
  | "proporcao";

interface ModeTabsProps {
  activeMode: SolverMode;
  onSelectMode: (mode: SolverMode) => void;
}

export default function ModeTabs({ activeMode, onSelectMode }: ModeTabsProps) {
  const modes: { id: SolverMode; label: string; icon: string; badge?: string }[] = [
    {
      id: "regra3-simples",
      label: "Regra de 3 Simples",
      icon: "📐",
    },
    {
      id: "regra3-composta",
      label: "Regra de 3 Composta",
      icon: "🏗️",
    },
    {
      id: "equacao-1grau",
      label: "Equação 1º Grau",
      icon: "📈",
    },
    {
      id: "equacao-2grau",
      label: "Equação 2º Grau",
      icon: "⚡",
      badge: "Bhaskara",
    },
    {
      id: "proporcao",
      label: "Proporção & Razão",
      icon: "⚖️",
    },
  ];

  return (
    <div className={styles.modeTabsContainer}>
      {modes.map((mode) => {
        const isActive = activeMode === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={`${styles.modeTabBtn} ${isActive ? styles.modeTabBtnActive : ""}`}
          >
            <span className={styles.modeIcon}>{mode.icon}</span>
            <span className={styles.modeLabel}>{mode.label}</span>
            {mode.badge && (
              <span className={styles.modeBadge}>{mode.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
