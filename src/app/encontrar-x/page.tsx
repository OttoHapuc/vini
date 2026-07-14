"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import SolverHeader from "@/components/encontrar-x/SolverHeader";
import ModeTabs, { SolverMode } from "@/components/encontrar-x/ModeTabs";
import RegraDeTresSimples from "@/components/encontrar-x/RegraDeTresSimples";
import RegraDeTresComposta from "@/components/encontrar-x/RegraDeTresComposta";
import EquacaoLinear from "@/components/encontrar-x/EquacaoLinear";
import EquacaoQuadratica from "@/components/encontrar-x/EquacaoQuadratica";
import ProporcaoSolver from "@/components/encontrar-x/ProporcaoSolver";

export default function EncontrarXPage() {
  const [activeMode, setActiveMode] = useState<SolverMode>("regra3-simples");

  return (
    <div className={styles.container}>
      {/* Esferas de Brilho / Efeitos Decorativos */}
      <div className={styles.glowBlob1} />
      <div className={styles.glowBlob2} />

      {/* Cabeçalho */}
      <SolverHeader />

      <main className={styles.mainLayout}>
        {/* Seletor de Modos */}
        <div className={styles.tabsSection}>
          <ModeTabs activeMode={activeMode} onSelectMode={setActiveMode} />
        </div>

        {/* Módulo Ativo */}
        <div className={styles.solverCard}>
          {activeMode === "regra3-simples" && <RegraDeTresSimples />}
          {activeMode === "regra3-composta" && <RegraDeTresComposta />}
          {activeMode === "equacao-1grau" && <EquacaoLinear />}
          {activeMode === "equacao-2grau" && <EquacaoQuadratica />}
          {activeMode === "proporcao" && <ProporcaoSolver />}
        </div>
      </main>
    </div>
  );
}
