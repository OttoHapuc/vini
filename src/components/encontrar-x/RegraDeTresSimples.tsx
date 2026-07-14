"use client";

import React, { useState, useMemo } from "react";
import Decimal from "decimal.js";
import styles from "@/app/encontrar-x/page.module.css";
import StepByStepCard, { MathStep } from "./StepByStepCard";

type PositionX = "pos1" | "pos2" | "pos3" | "pos4";
type ProportionType = "direct" | "inverse";

export default function RegraDeTresSimples() {
  const [posX, setPosX] = useState<PositionX>("pos4");
  const [propType, setPropType] = useState<ProportionType>("direct");

  const [v1, setV1] = useState<string>("100");
  const [v2, setV2] = useState<string>("250");
  const [v3, setV3] = useState<string>("40");
  const [v4, setV4] = useState<string>("");

  const handleInput = (pos: PositionX, val: string) => {
    if (pos === "pos1") setV1(val);
    if (pos === "pos2") setV2(val);
    if (pos === "pos3") setV3(val);
    if (pos === "pos4") setV4(val);
  };

  const { xValue, steps, error } = useMemo(() => {
    try {
      const getNum = (str: string) => {
        const clean = str.replace(",", ".").trim();
        if (!clean || isNaN(Number(clean))) return null;
        return new Decimal(clean);
      };

      const n1 = posX === "pos1" ? null : getNum(v1);
      const n2 = posX === "pos2" ? null : getNum(v2);
      const n3 = posX === "pos3" ? null : getNum(v3);
      const n4 = posX === "pos4" ? null : getNum(v4);

      const a = posX === "pos1" ? "X" : n1 ? n1.toString() : "?";
      const b = posX === "pos2" ? "X" : n2 ? n2.toString() : "?";
      const c = posX === "pos3" ? "X" : n3 ? n3.toString() : "?";
      const d = posX === "pos4" ? "X" : n4 ? n4.toString() : "?";

      const missingInputs = [
        posX !== "pos1" && !n1,
        posX !== "pos2" && !n2,
        posX !== "pos3" && !n3,
        posX !== "pos4" && !n4,
      ].some(Boolean);

      if (missingInputs) {
        return { xValue: null, steps: [], error: null };
      }

      let res: Decimal;
      const stepsArr: MathStep[] = [];

      if (propType === "direct") {
        stepsArr.push({
          title: "Grandeza Diretamente Proporcional",
          expression: `${a} / ${b} = ${c} / ${d}`,
          description:
            "Como as grandezas são diretamente proporcionais, igualamos as razões e multiplicamos cruzado.",
        });

        if (posX === "pos4") {
          // A / B = C / X => A * X = B * C => X = (B * C) / A
          if (n1!.isZero()) throw new Error("Divisão por zero não é permitida (A = 0)");
          const bc = n2!.mul(n3!);
          res = bc.div(n1!);

          stepsArr.push({
            title: "Multiplicação Cruzada",
            expression: `${n1!.toString()} · X = ${n2!.toString()} · ${n3!.toString()}`,
            description: `Multiplicamos os meios (${n2!.toString()} × ${n3!.toString()} = ${bc.toString()}) e igualamos aos extremos (${n1!.toString()} × X).`,
          });
          stepsArr.push({
            title: "Isolar o X",
            expression: `X = ${bc.toString()} / ${n1!.toString()}`,
            description: `Dividimos o produto obtido pelo termo associado ao X (${n1!.toString()}).`,
          });
        } else if (posX === "pos3") {
          // A / B = X / D => B * X = A * D => X = (A * D) / B
          if (n2!.isZero()) throw new Error("Divisão por zero não é permitida (B = 0)");
          const ad = n1!.mul(n4!);
          res = ad.div(n2!);

          stepsArr.push({
            title: "Multiplicação Cruzada",
            expression: `${n2!.toString()} · X = ${n1!.toString()} · ${n4!.toString()}`,
            description: `Multiplicamos ${n1!.toString()} × ${n4!.toString()} = ${ad.toString()}.`,
          });
          stepsArr.push({
            title: "Isolar o X",
            expression: `X = ${ad.toString()} / ${n2!.toString()}`,
            description: `Dividimos por ${n2!.toString()}.`,
          });
        } else if (posX === "pos2") {
          // A / X = C / D => C * X = A * D => X = (A * D) / C
          if (n3!.isZero()) throw new Error("Divisão por zero não é permitida (C = 0)");
          const ad = n1!.mul(n4!);
          res = ad.div(n3!);

          stepsArr.push({
            title: "Multiplicação Cruzada",
            expression: `${n3!.toString()} · X = ${n1!.toString()} · ${n4!.toString()}`,
            description: `Multiplicamos ${n1!.toString()} × ${n4!.toString()} = ${ad.toString()}.`,
          });
          stepsArr.push({
            title: "Isolar o X",
            expression: `X = ${ad.toString()} / ${n3!.toString()}`,
            description: `Dividimos por ${n3!.toString()}.`,
          });
        } else {
          // pos1: X / B = C / D => D * X = B * C => X = (B * C) / D
          if (n4!.isZero()) throw new Error("Divisão por zero não é permitida (D = 0)");
          const bc = n2!.mul(n3!);
          res = bc.div(n4!);

          stepsArr.push({
            title: "Multiplicação Cruzada",
            expression: `${n4!.toString()} · X = ${n2!.toString()} · ${n3!.toString()}`,
            description: `Multiplicamos ${n2!.toString()} × ${n3!.toString()} = ${bc.toString()}.`,
          });
          stepsArr.push({
            title: "Isolar o X",
            expression: `X = ${bc.toString()} / ${n4!.toString()}`,
            description: `Dividimos por ${n4!.toString()}.`,
          });
        }
      } else {
        // Inverse proportion: A * B = C * D
        stepsArr.push({
          title: "Grandeza Inversamente Proporcional",
          expression: `${a} · ${b} = ${c} · ${d}`,
          description:
            "Como as grandezas são inversamente proporcionais (quando uma aumenta, a outra diminui na mesma proporção), o produto das grandezas permanece constante.",
        });

        if (posX === "pos4") {
          // A * B = C * X => X = (A * B) / C
          if (n3!.isZero()) throw new Error("Divisão por zero não é permitida (C = 0)");
          const ab = n1!.mul(n2!);
          res = ab.div(n3!);

          stepsArr.push({
            title: "Igualar os Produtos",
            expression: `${n3!.toString()} · X = ${n1!.toString()} · ${n2!.toString()}`,
            description: `O produto da primeira linha (${n1!.toString()} × ${n2!.toString()} = ${ab.toString()}) deve ser igual ao produto da segunda linha (${n3!.toString()} × X).`,
          });
          stepsArr.push({
            title: "Isolar o X",
            expression: `X = ${ab.toString()} / ${n3!.toString()}`,
            description: `Dividimos ${ab.toString()} por ${n3!.toString()}.`,
          });
        } else if (posX === "pos3") {
          // A * B = X * D => X = (A * B) / D
          if (n4!.isZero()) throw new Error("Divisão por zero não é permitida (D = 0)");
          const ab = n1!.mul(n2!);
          res = ab.div(n4!);

          stepsArr.push({
            title: "Igualar os Produtos",
            expression: `${n4!.toString()} · X = ${n1!.toString()} · ${n2!.toString()}`,
            description: `O produto (${n1!.toString()} × ${n2!.toString()} = ${ab.toString()}) é igual a X × ${n4!.toString()}.`,
          });
          stepsArr.push({
            title: "Isolar o X",
            expression: `X = ${ab.toString()} / ${n4!.toString()}`,
            description: `Dividimos por ${n4!.toString()}.`,
          });
        } else if (posX === "pos2") {
          // A * X = C * D => X = (C * D) / A
          if (n1!.isZero()) throw new Error("Divisão por zero não é permitida (A = 0)");
          const cd = n3!.mul(n4!);
          res = cd.div(n1!);

          stepsArr.push({
            title: "Igualar os Produtos",
            expression: `${n1!.toString()} · X = ${n3!.toString()} · ${n4!.toString()}`,
            description: `O produto (${n3!.toString()} × ${n4!.toString()} = ${cd.toString()}) é igual a ${n1!.toString()} × X.`,
          });
          stepsArr.push({
            title: "Isolar o X",
            expression: `X = ${cd.toString()} / ${n1!.toString()}`,
            description: `Dividimos por ${n1!.toString()}.`,
          });
        } else {
          // pos1: X * B = C * D => X = (C * D) / B
          if (n2!.isZero()) throw new Error("Divisão por zero não é permitida (B = 0)");
          const cd = n3!.mul(n4!);
          res = cd.div(n2!);

          stepsArr.push({
            title: "Igualar os Produtos",
            expression: `${n2!.toString()} · X = ${n3!.toString()} · ${n4!.toString()}`,
            description: `O produto (${n3!.toString()} × ${n4!.toString()} = ${cd.toString()}) é igual a X × ${n2!.toString()}.`,
          });
          stepsArr.push({
            title: "Isolar o X",
            expression: `X = ${cd.toString()} / ${n2!.toString()}`,
            description: `Dividimos por ${n2!.toString()}.`,
          });
        }
      }

      stepsArr.push({
        title: "Resultado Final",
        expression: `X = ${res.toString()}`,
        description: `Cálculo realizado com precisão exata do motor InfiniMath.`,
      });

      return { xValue: res.toString(), steps: stepsArr, error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro no cálculo da proporção";
      return { xValue: null, steps: [], error: msg };
    }
  }, [posX, propType, v1, v2, v3, v4]);

  return (
    <div className={styles.solverGrid}>
      <div className={styles.inputPanel}>
        <div className={styles.panelHeader}>
          <h3>Regra de 3 Simples</h3>
          <p>Encontre o valor de X relacionando duas grandezas proporcionais</p>
        </div>

        {/* Tipo de Proporção */}
        <div className={styles.propSelector}>
          <button
            type="button"
            onClick={() => setPropType("direct")}
            className={`${styles.propBtn} ${propType === "direct" ? styles.propBtnActive : ""}`}
          >
            <span className={styles.propIcon}>↗️</span>
            <div>
              <strong>Diretamente Proporcional</strong>
              <small>Se uma aumenta, a outra aumenta</small>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setPropType("inverse")}
            className={`${styles.propBtn} ${propType === "inverse" ? styles.propBtnActive : ""}`}
          >
            <span className={styles.propIcon}>🔄</span>
            <div>
              <strong>Inversamente Proporcional</strong>
              <small>Se uma aumenta, a outra diminui</small>
            </div>
          </button>
        </div>

        {/* Grade de Proporção A -> B, C -> D */}
        <div className={styles.ruleGrid}>
          <div className={styles.gridHeaderRow}>
            <span>Grandeza 1</span>
            <span></span>
            <span>Grandeza 2</span>
          </div>

          {/* Linha 1 */}
          <div className={styles.ruleRow}>
            <div className={styles.inputCell}>
              {posX === "pos1" ? (
                <div className={styles.xPlaceholder}>X</div>
              ) : (
                <input
                  type="text"
                  value={v1}
                  onChange={(e) => handleInput("pos1", e.target.value)}
                  placeholder="Ex: 100"
                  className={styles.numInput}
                />
              )}
              <button
                type="button"
                onClick={() => setPosX("pos1")}
                className={`${styles.xSelectBtn} ${posX === "pos1" ? styles.xSelectBtnActive : ""}`}
                title="Colocar X aqui"
              >
                {posX === "pos1" ? "Incógnita X" : "Definir X"}
              </button>
            </div>

            <div className={styles.arrowIcon}>➔</div>

            <div className={styles.inputCell}>
              {posX === "pos2" ? (
                <div className={styles.xPlaceholder}>X</div>
              ) : (
                <input
                  type="text"
                  value={v2}
                  onChange={(e) => handleInput("pos2", e.target.value)}
                  placeholder="Ex: 250"
                  className={styles.numInput}
                />
              )}
              <button
                type="button"
                onClick={() => setPosX("pos2")}
                className={`${styles.xSelectBtn} ${posX === "pos2" ? styles.xSelectBtnActive : ""}`}
                title="Colocar X aqui"
              >
                {posX === "pos2" ? "Incógnita X" : "Definir X"}
              </button>
            </div>
          </div>

          <div className={styles.gridSeparator}>
            <span>está na mesma proporção que</span>
          </div>

          {/* Linha 2 */}
          <div className={styles.ruleRow}>
            <div className={styles.inputCell}>
              {posX === "pos3" ? (
                <div className={styles.xPlaceholder}>X</div>
              ) : (
                <input
                  type="text"
                  value={v3}
                  onChange={(e) => handleInput("pos3", e.target.value)}
                  placeholder="Ex: 40"
                  className={styles.numInput}
                />
              )}
              <button
                type="button"
                onClick={() => setPosX("pos3")}
                className={`${styles.xSelectBtn} ${posX === "pos3" ? styles.xSelectBtnActive : ""}`}
                title="Colocar X aqui"
              >
                {posX === "pos3" ? "Incógnita X" : "Definir X"}
              </button>
            </div>

            <div className={styles.arrowIcon}>➔</div>

            <div className={styles.inputCell}>
              {posX === "pos4" ? (
                <div className={styles.xPlaceholder}>X</div>
              ) : (
                <input
                  type="text"
                  value={v4}
                  onChange={(e) => handleInput("pos4", e.target.value)}
                  placeholder="Ex: X"
                  className={styles.numInput}
                />
              )}
              <button
                type="button"
                onClick={() => setPosX("pos4")}
                className={`${styles.xSelectBtn} ${posX === "pos4" ? styles.xSelectBtnActive : ""}`}
                title="Colocar X aqui"
              >
                {posX === "pos4" ? "Incógnita X" : "Definir X"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Painel de Resultados */}
      <div className={styles.outputPanel}>
        <StepByStepCard
          xValue={xValue}
          subtitle={
            propType === "direct"
              ? "Regra de 3 Direta (Multiplicação Cruzada)"
              : "Regra de 3 Inversa (Produtos Constantes)"
          }
          steps={steps}
          error={error}
        />
      </div>
    </div>
  );
}
