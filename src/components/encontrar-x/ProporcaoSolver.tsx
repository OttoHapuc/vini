"use client";

import React, { useState, useMemo } from "react";
import Decimal from "decimal.js";
import styles from "@/app/encontrar-x/page.module.css";
import StepByStepCard, { MathStep } from "./StepByStepCard";

type PosFraction = "numLeft" | "denLeft" | "numRight" | "denRight";

export default function ProporcaoSolver() {
  const [posX, setPosX] = useState<PosFraction>("denRight");
  const [a, setA] = useState<string>("15");
  const [b, setB] = useState<string>("4");
  const [c, setC] = useState<string>("75");
  const [d, setD] = useState<string>("");

  const handleInput = (pos: PosFraction, val: string) => {
    if (pos === "numLeft") setA(val);
    if (pos === "denLeft") setB(val);
    if (pos === "numRight") setC(val);
    if (pos === "denRight") setD(val);
  };

  const { xValue, steps, error } = useMemo(() => {
    try {
      const getDec = (str: string) => {
        const clean = str.replace(",", ".").trim();
        if (!clean || isNaN(Number(clean))) return null;
        return new Decimal(clean);
      };

      const da = posX === "numLeft" ? null : getDec(a);
      const db = posX === "denLeft" ? null : getDec(b);
      const dc = posX === "numRight" ? null : getDec(c);
      const dd = posX === "denRight" ? null : getDec(d);

      const isMissing = [
        posX !== "numLeft" && !da,
        posX !== "denLeft" && !db,
        posX !== "numRight" && !dc,
        posX !== "denRight" && !dd,
      ].some(Boolean);

      if (isMissing) {
        return { xValue: null, steps: [], error: null };
      }

      const stepsArr: MathStep[] = [];
      let res: Decimal;

      const fa = posX === "numLeft" ? "X" : da!.toString();
      const fb = posX === "denLeft" ? "X" : db!.toString();
      const fc = posX === "numRight" ? "X" : dc!.toString();
      const fd = posX === "denRight" ? "X" : dd!.toString();

      stepsArr.push({
        title: "Igualdade de Razões (Proporção)",
        expression: `${fa} / ${fb} = ${fc} / ${fd}`,
        description:
          "Pela propriedade fundamental das proporções, o produto dos extremos é igual ao produto dos meios.",
      });

      if (posX === "denRight") {
        // A / B = C / X => A * X = B * C => X = (B * C) / A
        if (da!.isZero()) throw new Error("O numerador A não pode ser zero na divisão");
        const bc = db!.mul(dc!);
        res = bc.div(da!);

        stepsArr.push({
          title: "Multiplicação Cruzada",
          expression: `${da!.toString()} · X = ${db!.toString()} · ${dc!.toString()}`,
          description: `Produto dos meios: ${db!.toString()} × ${dc!.toString()} = ${bc.toString()}.`,
        });
        stepsArr.push({
          title: "Isolar o X",
          expression: `X = ${bc.toString()} / ${da!.toString()}`,
          description: `Dividimos ambos os membros por ${da!.toString()}.`,
        });
      } else if (posX === "numRight") {
        // A / B = X / D => B * X = A * D => X = (A * D) / B
        if (db!.isZero()) throw new Error("O denominador B não pode ser zero");
        const ad = da!.mul(dd!);
        res = ad.div(db!);

        stepsArr.push({
          title: "Multiplicação Cruzada",
          expression: `${db!.toString()} · X = ${da!.toString()} · ${dd!.toString()}`,
          description: `Produto dos extremos: ${da!.toString()} × ${dd!.toString()} = ${ad.toString()}.`,
        });
        stepsArr.push({
          title: "Isolar o X",
          expression: `X = ${ad.toString()} / ${db!.toString()}`,
          description: `Dividimos ambos os membros por ${db!.toString()}.`,
        });
      } else if (posX === "denLeft") {
        // A / X = C / D => C * X = A * D => X = (A * D) / C
        if (dc!.isZero()) throw new Error("O numerador C não pode ser zero");
        const ad = da!.mul(dd!);
        res = ad.div(dc!);

        stepsArr.push({
          title: "Multiplicação Cruzada",
          expression: `${dc!.toString()} · X = ${da!.toString()} · ${dd!.toString()}`,
          description: `Produto dos extremos: ${da!.toString()} × ${dd!.toString()} = ${ad.toString()}.`,
        });
        stepsArr.push({
          title: "Isolar o X",
          expression: `X = ${ad.toString()} / ${dc!.toString()}`,
          description: `Dividimos por ${dc!.toString()}.`,
        });
      } else {
        // numLeft: X / B = C / D => D * X = B * C => X = (B * C) / D
        if (dd!.isZero()) throw new Error("O denominador D não pode ser zero");
        const bc = db!.mul(dc!);
        res = bc.div(dd!);

        stepsArr.push({
          title: "Multiplicação Cruzada",
          expression: `${dd!.toString()} · X = ${db!.toString()} · ${dc!.toString()}`,
          description: `Produto dos meios: ${db!.toString()} × ${dc!.toString()} = ${bc.toString()}.`,
        });
        stepsArr.push({
          title: "Isolar o X",
          expression: `X = ${bc.toString()} / ${dd!.toString()}`,
          description: `Dividimos por ${dd!.toString()}.`,
        });
      }

      stepsArr.push({
        title: "Resultado da Proporção",
        expression: `X = ${res.toString()}`,
        description: "Valor exato que mantém a proporção perfeita.",
      });

      return { xValue: res.toString(), steps: stepsArr, error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro no cálculo da proporção";
      return { xValue: null, steps: [], error: msg };
    }
  }, [posX, a, b, c, d]);

  return (
    <div className={styles.solverGrid}>
      <div className={styles.inputPanel}>
        <div className={styles.panelHeader}>
          <h3>Proporção & Razão (A / B = C / D)</h3>
          <p>Selecione em qual posição da fração está a incógnita X e calcule</p>
        </div>

        {/* Visualização de Fração */}
        <div className={styles.fractionBox}>
          {/* Fração 1 */}
          <div className={styles.fractionCol}>
            <div className={styles.fractionInputWrapper}>
              {posX === "numLeft" ? (
                <div className={styles.xFractionCell}>X</div>
              ) : (
                <input
                  type="text"
                  value={a}
                  onChange={(e) => handleInput("numLeft", e.target.value)}
                  placeholder="A"
                  className={styles.fractionInput}
                />
              )}
              <button
                type="button"
                onClick={() => setPosX("numLeft")}
                className={`${styles.miniXBtn} ${posX === "numLeft" ? styles.miniXBtnActive : ""}`}
              >
                X
              </button>
            </div>

            <div className={styles.fractionDivider} />

            <div className={styles.fractionInputWrapper}>
              {posX === "denLeft" ? (
                <div className={styles.xFractionCell}>X</div>
              ) : (
                <input
                  type="text"
                  value={b}
                  onChange={(e) => handleInput("denLeft", e.target.value)}
                  placeholder="B"
                  className={styles.fractionInput}
                />
              )}
              <button
                type="button"
                onClick={() => setPosX("denLeft")}
                className={`${styles.miniXBtn} ${posX === "denLeft" ? styles.miniXBtnActive : ""}`}
              >
                X
              </button>
            </div>
          </div>

          <div className={styles.fractionEquals}>=</div>

          {/* Fração 2 */}
          <div className={styles.fractionCol}>
            <div className={styles.fractionInputWrapper}>
              {posX === "numRight" ? (
                <div className={styles.xFractionCell}>X</div>
              ) : (
                <input
                  type="text"
                  value={c}
                  onChange={(e) => handleInput("numRight", e.target.value)}
                  placeholder="C"
                  className={styles.fractionInput}
                />
              )}
              <button
                type="button"
                onClick={() => setPosX("numRight")}
                className={`${styles.miniXBtn} ${posX === "numRight" ? styles.miniXBtnActive : ""}`}
              >
                X
              </button>
            </div>

            <div className={styles.fractionDivider} />

            <div className={styles.fractionInputWrapper}>
              {posX === "denRight" ? (
                <div className={styles.xFractionCell}>X</div>
              ) : (
                <input
                  type="text"
                  value={d}
                  onChange={(e) => handleInput("denRight", e.target.value)}
                  placeholder="D"
                  className={styles.fractionInput}
                />
              )}
              <button
                type="button"
                onClick={() => setPosX("denRight")}
                className={`${styles.miniXBtn} ${posX === "denRight" ? styles.miniXBtnActive : ""}`}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.outputPanel}>
        <StepByStepCard
          xValue={xValue}
          subtitle="Proporção Fundamental (A/B = C/D)"
          steps={steps}
          error={error}
        />
      </div>
    </div>
  );
}
