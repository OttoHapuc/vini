"use client";

import React, { useState, useMemo } from "react";
import Decimal from "decimal.js";
import styles from "@/app/encontrar-x/page.module.css";
import StepByStepCard, { MathStep } from "./StepByStepCard";

export default function EquacaoQuadratica() {
  const [a, setA] = useState<string>("1");
  const [b, setB] = useState<string>("-5");
  const [c, setC] = useState<string>("6");

  const loadPreset = (pa: string, pb: string, pc: string) => {
    setA(pa);
    setB(pb);
    setC(pc);
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

      if (!da || !db || !dc) {
        return { xValue: null, steps: [], error: null };
      }

      if (da.isZero()) {
        return {
          xValue: null,
          steps: [],
          error: "O coeficiente 'a' não pode ser zero em uma equação de 2º grau.",
        };
      }

      const stepsArr: MathStep[] = [];

      stepsArr.push({
        title: "Identificação dos Coeficientes",
        expression: `${da.toString()}x² ${db.isNegative() ? "-" : "+"} ${db.abs().toString()}x ${dc.isNegative() ? "-" : "+"} ${dc.abs().toString()} = 0`,
        description: `Coeficientes da equação quadrática ax² + bx + c = 0: a = ${da.toString()}, b = ${db.toString()}, c = ${dc.toString()}.`,
      });

      // Cálculo do Delta = b² - 4ac
      const bSq = db.pow(2);
      const fourAC = da.mul(dc).mul(4);
      const delta = bSq.sub(fourAC);

      stepsArr.push({
        title: "Cálculo do Discriminante (Δ)",
        expression: `Δ = b² - 4ac = (${db.toString()})² - 4 · (${da.toString()}) · (${dc.toString()})`,
        description: `Δ = ${bSq.toString()} - (${fourAC.toString()}) = ${delta.toString()}.`,
      });

      // Vértice da parábola
      const xv = db.neg().div(da.mul(2));
      const yv = delta.neg().div(da.mul(4));

      let resultText = "";

      if (delta.isZero()) {
        // Uma raiz real (raiz dupla)
        const xRoot = db.neg().div(da.mul(2));
        resultText = `x₁ = x₂ = ${xRoot.toString()}`;

        stepsArr.push({
          title: "Análise do Discriminante (Δ = 0)",
          expression: "Δ = 0",
          description:
            "Como Δ é igual a zero, a equação possui duas raízes reais iguais (ou uma raiz real dupla).",
        });

        stepsArr.push({
          title: "Aplicação da Fórmula de Bhaskara",
          expression: `X = -b / (2a) = -(${db.toString()}) / (2 · ${da.toString()})`,
          description: `X = ${db.neg().toString()} / ${da.mul(2).toString()} = ${xRoot.toString()}.`,
        });
      } else if (delta.isPositive()) {
        // Duas raízes reais distintas
        const sqrtDelta = delta.sqrt();
        const x1 = db.neg().add(sqrtDelta).div(da.mul(2));
        const x2 = db.neg().sub(sqrtDelta).div(da.mul(2));

        resultText = `x₁ = ${x1.toDecimalPlaces(6).toString()}  |  x₂ = ${x2.toDecimalPlaces(6).toString()}`;

        stepsArr.push({
          title: "Análise do Discriminante (Δ > 0)",
          expression: `Δ = ${delta.toString()} > 0`,
          description:
            "Como Δ é positivo, a equação possui duas raízes reais e distintas.",
        });

        stepsArr.push({
          title: "Fórmula de Bhaskara para x₁ e x₂",
          expression: `X = (-b ± √Δ) / 2a = (-(${db.toString()}) ± √${delta.toString()}) / (2 · ${da.toString()})`,
          description: `Raiz quadrada do Delta: √${delta.toString()} ≈ ${sqrtDelta.toDecimalPlaces(4).toString()}.`,
        });

        stepsArr.push({
          title: "Cálculo da Primeira Raiz (x₁)",
          expression: `x₁ = (${db.neg().toString()} + ${sqrtDelta.toDecimalPlaces(4).toString()}) / ${da.mul(2).toString()} = ${x1.toDecimalPlaces(6).toString()}`,
          description: "Resultado da soma no numerador.",
        });

        stepsArr.push({
          title: "Cálculo da Segunda Raiz (x₂)",
          expression: `x₂ = (${db.neg().toString()} - ${sqrtDelta.toDecimalPlaces(4).toString()}) / ${da.mul(2).toString()} = ${x2.toDecimalPlaces(6).toString()}`,
          description: "Resultado da subtração no numerador.",
        });
      } else {
        // Raízes complexas (Δ < 0)
        const absDelta = delta.abs();
        const sqrtAbsDelta = absDelta.sqrt();
        const realPart = db.neg().div(da.mul(2));
        const imagPart = sqrtAbsDelta.div(da.mul(2).abs());

        const realStr = realPart.isZero() ? "" : realPart.toDecimalPlaces(4).toString();
        const imagStr = imagPart.abs().toDecimalPlaces(4).toString();

        resultText = `${realStr ? realStr + " " : ""}± ${imagStr}i`;

        stepsArr.push({
          title: "Análise do Discriminante (Δ < 0)",
          expression: `Δ = ${delta.toString()} < 0`,
          description:
            "Como Δ é negativo, a equação não possui raízes reais. As soluções estão no conjunto dos Números Complexos (ℂ).",
        });

        stepsArr.push({
          title: "Fórmula de Bhaskara no Conjunto Complexo",
          expression: `X = -b/2a ± (√|Δ|/2a)i`,
          description: `Parte real: ${realPart.toDecimalPlaces(4).toString()}. Parte imaginária: ± ${imagStr}i.`,
        });
      }

      stepsArr.push({
        title: "Vértice da Parábola (Ponto Crítico)",
        expression: `V = (Xv, Yv) = (${xv.toDecimalPlaces(4).toString()}, ${yv.toDecimalPlaces(4).toString()})`,
        description: `Coordenada Xv = -b/2a = ${xv.toDecimalPlaces(4).toString()} e Yv = -Δ/4a = ${yv.toDecimalPlaces(4).toString()}.`,
      });

      return { xValue: resultText, steps: stepsArr, error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro na equação quadrática";
      return { xValue: null, steps: [], error: msg };
    }
  }, [a, b, c]);

  return (
    <div className={styles.solverGrid}>
      <div className={styles.inputPanel}>
        <div className={styles.panelHeader}>
          <h3>Equação de 2º Grau (Fórmula de Bhaskara)</h3>
          <p>Encontre as raízes reais ou complexas para ax² + bx + c = 0</p>
        </div>

        {/* Presets rápidos */}
        <div className={styles.presetsRow}>
          <span>Exemplos:</span>
          <button
            type="button"
            onClick={() => loadPreset("1", "-5", "6")}
            className={styles.presetChip}
          >
            x² - 5x + 6 = 0
          </button>
          <button
            type="button"
            onClick={() => loadPreset("2", "-8", "8")}
            className={styles.presetChip}
          >
            2x² - 8x + 8 = 0
          </button>
          <button
            type="button"
            onClick={() => loadPreset("1", "-2", "-15")}
            className={styles.presetChip}
          >
            x² - 2x - 15 = 0
          </button>
          <button
            type="button"
            onClick={() => loadPreset("1", "2", "5")}
            className={styles.presetChip}
          >
            x² + 2x + 5 = 0 (Complexa)
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
              <span className={styles.varLabel}>x²</span>
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
              <span className={styles.varLabel}>x</span>
            </div>

            <span className={styles.eqOp}>+</span>

            <div className={styles.eqTerm}>
              <input
                type="text"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className={styles.eqInput}
                placeholder="c"
              />
            </div>

            <span className={styles.eqEquals}>= 0</span>
          </div>
        </div>
      </div>

      <div className={styles.outputPanel}>
        <StepByStepCard
          xValue={xValue}
          subtitle="Equação Quadrática (Fórmula de Bhaskara)"
          steps={steps}
          error={error}
        />
      </div>
    </div>
  );
}
