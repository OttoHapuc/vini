"use client";

import React, { useState, useMemo } from "react";
import Decimal from "decimal.js";
import styles from "@/app/encontrar-x/page.module.css";
import StepByStepCard, { MathStep } from "./StepByStepCard";

export default function EquacaoLinear() {
  const [a, setA] = useState<string>("3");
  const [b, setB] = useState<string>("-12");
  const [c, setC] = useState<string>("1");
  const [d, setD] = useState<string>("18");

  const loadPreset = (pa: string, pb: string, pc: string, pd: string) => {
    setA(pa);
    setB(pb);
    setC(pc);
    setD(pd);
  };

  const { xValue, steps, error } = useMemo(() => {
    try {
      const getDec = (str: string) => {
        const clean = str.replace(",", ".").trim();
        if (!clean || isNaN(Number(clean))) return null;
        return new Decimal(clean);
      };

      const da = getDec(a);
      const db = getDec(b);
      const dc = getDec(c);
      const dd = getDec(d);

      if (!da || !db || !dc || !dd) {
        return { xValue: null, steps: [], error: null };
      }

      const stepsArr: MathStep[] = [];

      stepsArr.push({
        title: "Equação Inicial",
        expression: `${da.toString()}x ${db.isNegative() ? "-" : "+"} ${db.abs().toString()} = ${dc.toString()}x ${dd.isNegative() ? "-" : "+"} ${dd.abs().toString()}`,
        description: "Forma canônica: ax + b = cx + d.",
      });

      // Isolamento dos termos em x: (a - c)x = d - b
      const aMinusC = da.sub(dc);
      const dMinusB = dd.sub(db);

      stepsArr.push({
        title: "Reagrupar Termos Semelhantes",
        expression: `(${da.toString()} - ${dc.toString()})x = ${dd.toString()} - (${db.toString()})`,
        description:
          "Passamos os termos com variável x para o lado esquerdo e os termos constantes para o lado direito da igualdade.",
      });

      stepsArr.push({
        title: "Simplificar os Lados",
        expression: `${aMinusC.toString()}x = ${dMinusB.toString()}`,
        description: `Coeficiente de x: ${aMinusC.toString()}. Termo independente no lado direito: ${dMinusB.toString()}.`,
      });

      if (aMinusC.isZero()) {
        if (dMinusB.isZero()) {
          stepsArr.push({
            title: "Identidade Verdadeira (0x = 0)",
            expression: "0 = 0",
            description: "A equação é verdadeira para qualquer valor real de X (Infinitas soluções).",
          });
          return { xValue: "Infinitas Soluções (ℝ)", steps: stepsArr, error: null };
        } else {
          throw new Error(
            `A equação 0x = ${dMinusB.toString()} não possui solução real (Sistema Impossível).`
          );
        }
      }

      const res = dMinusB.div(aMinusC);

      stepsArr.push({
        title: "Isolar a Incógnita X",
        expression: `x = ${dMinusB.toString()} / ${aMinusC.toString()}`,
        description: `Dividimos ambos os lados por ${aMinusC.toString()}.`,
      });

      stepsArr.push({
        title: "Resultado Final",
        expression: `X = ${res.toString()}`,
        description: "Solução exata da equação de 1º grau.",
      });

      return { xValue: res.toString(), steps: stepsArr, error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro na equação";
      return { xValue: null, steps: [], error: msg };
    }
  }, [a, b, c, d]);

  return (
    <div className={styles.solverGrid}>
      <div className={styles.inputPanel}>
        <div className={styles.panelHeader}>
          <h3>Equação de 1º Grau (Linear)</h3>
          <p>Resolva equações lineares no formato ax + b = cx + d</p>
        </div>

        {/* Presets rápidos */}
        <div className={styles.presetsRow}>
          <span>Exemplos:</span>
          <button
            type="button"
            onClick={() => loadPreset("2", "15", "0", "45")}
            className={styles.presetChip}
          >
            2x + 15 = 45
          </button>
          <button
            type="button"
            onClick={() => loadPreset("5", "-8", "2", "10")}
            className={styles.presetChip}
          >
            5x - 8 = 2x + 10
          </button>
          <button
            type="button"
            onClick={() => loadPreset("3", "-12", "1", "18")}
            className={styles.presetChip}
          >
            3x - 12 = x + 18
          </button>
          <button
            type="button"
            onClick={() => loadPreset("7", "21", "0", "0")}
            className={styles.presetChip}
          >
            7x + 21 = 0
          </button>
        </div>

        {/* Modelo visual da equação */}
        <div className={styles.eqBox}>
          <div className={styles.eqRow}>
            <div className={styles.eqTerm}>
              <input
                type="text"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className={styles.eqInput}
                placeholder="a"
              />
              <span className={styles.varLabel}>x</span>
            </div>

            <span className={styles.eqOp}>+</span>

            <div className={styles.eqTerm}>
              <input
                type="text"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className={styles.eqInput}
                placeholder="b"
              />
            </div>

            <span className={styles.eqEquals}>=</span>

            <div className={styles.eqTerm}>
              <input
                type="text"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className={styles.eqInput}
                placeholder="c"
              />
              <span className={styles.varLabel}>x</span>
            </div>

            <span className={styles.eqOp}>+</span>

            <div className={styles.eqTerm}>
              <input
                type="text"
                value={d}
                onChange={(e) => setD(e.target.value)}
                className={styles.eqInput}
                placeholder="d"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.outputPanel}>
        <StepByStepCard
          xValue={xValue}
          subtitle="Equação de 1º Grau (Isolamento da Incógnita)"
          steps={steps}
          error={error}
        />
      </div>
    </div>
  );
}
