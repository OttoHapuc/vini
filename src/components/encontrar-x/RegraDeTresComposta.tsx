"use client";

import React, { useState } from "react";
import Decimal from "decimal.js";
import styles from "@/app/encontrar-x/page.module.css";
import StepByStepCard, { MathStep } from "./StepByStepCard";

interface Column {
  id: string;
  name: string;
  row1: string;
  row2: string;
  type: "direct" | "inverse"; // Em relação à coluna do X
}

function computeComposta(columns: Column[], targetColId: string) {
  try {
    const targetCol = columns.find((c) => c.id === targetColId);
    if (!targetCol) return { xValue: null, steps: [], error: null };

    const baseValClean = targetCol.row1.replace(",", ".").trim();
    if (!baseValClean || isNaN(Number(baseValClean))) {
      return { xValue: null, steps: [], error: null };
    }
    const baseNum = new Decimal(baseValClean);
    if (baseNum.isZero()) {
      return {
        xValue: null,
        steps: [],
        error: "O valor conhecido da grandeza com X não pode ser zero.",
      };
    }

    const otherCols = columns.filter((c) => c.id !== targetColId);

    let numeratorProduct = new Decimal(1); // Produto dos numeradores da razão composta
    let denominatorProduct = new Decimal(1); // Produto dos denominadores da razão composta

    const stepsArr: MathStep[] = [];

    stepsArr.push({
      title: "Montagem da Equação Composta",
      expression: `${targetCol.row1} / X = Produto das Razões das outras grandezas`,
      description: `Isolamos a razão da grandeza procurada (${targetCol.name}) de um lado e multiplicamos as razões das outras grandezas, invertendo as que forem inversamente proporcionais.`,
    });

    const fractionsDesc: string[] = [];
    const numFractions: string[] = [];
    const denFractions: string[] = [];

    for (const col of otherCols) {
      const r1 = col.row1.replace(",", ".").trim();
      const r2 = col.row2.replace(",", ".").trim();

      if (!r1 || !r2 || isNaN(Number(r1)) || isNaN(Number(r2))) {
        return { xValue: null, steps: [], error: null };
      }

      const d1 = new Decimal(r1);
      const d2 = new Decimal(r2);

      if (d1.isZero() || d2.isZero()) {
        return {
          xValue: null,
          steps: [],
          error: `Os valores da grandeza "${col.name}" não podem ser zero.`,
        };
      }

      if (col.type === "direct") {
        numeratorProduct = numeratorProduct.mul(d1);
        denominatorProduct = denominatorProduct.mul(d2);
        fractionsDesc.push(`(${d1.toString()}/${d2.toString()}) [Direta]`);
        numFractions.push(d1.toString());
        denFractions.push(d2.toString());
      } else {
        numeratorProduct = numeratorProduct.mul(d2);
        denominatorProduct = denominatorProduct.mul(d1);
        fractionsDesc.push(`(${d2.toString()}/${d1.toString()}) [Inversa]`);
        numFractions.push(d2.toString());
        denFractions.push(d1.toString());
      }
    }

    stepsArr.push({
      title: "Razões Proporcionais Aplicadas",
      expression: `${targetCol.row1} / X = ${fractionsDesc.join(" × ")}`,
      description:
        "Multiplicamos cada razão na ordem correta segundo o tipo de proporcionalidade (Direta ou Inversa).",
    });

    stepsArr.push({
      title: "Multiplicação das Frações",
      expression: `${targetCol.row1} / X = ${numeratorProduct.toString()} / ${denominatorProduct.toString()}`,
      description: `Produto dos numeradores: ${numFractions.join(" × ")} = ${numeratorProduct.toString()}. Produto dos denominadores: ${denFractions.join(" × ")} = ${denominatorProduct.toString()}.`,
    });

    const prodRight = baseNum.mul(denominatorProduct);
    const xResult = prodRight.div(numeratorProduct);

    stepsArr.push({
      title: "Isolamento de X",
      expression: `X = (${targetCol.row1} × ${denominatorProduct.toString()}) / ${numeratorProduct.toString()}`,
      description: `Multiplicando cruzado e dividindo pelo termo que acompanha o X: (${prodRight.toString()}) / ${numeratorProduct.toString()}.`,
    });

    stepsArr.push({
      title: "Resultado Final",
      expression: `X = ${xResult.toString()}`,
      description: `Valor exato calculado para a grandeza "${targetCol.name}".`,
    });

    return { xValue: xResult.toString(), steps: stepsArr, error: null };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erro na regra de 3 composta";
    return { xValue: null, steps: [], error: msg };
  }
}

export default function RegraDeTresComposta() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "col-1",
      name: "Operários",
      row1: "12",
      row2: "18",
      type: "direct",
    },
    {
      id: "col-2",
      name: "Horas/dia",
      row1: "8",
      row2: "6",
      type: "direct",
    },
    {
      id: "col-3",
      name: "Peças Produzidas",
      row1: "480",
      row2: "",
      type: "direct",
    },
  ]);

  const [targetColId, setTargetColId] = useState<string>("col-3");

  const addColumn = () => {
    const newId = `col-${Date.now()}`;
    setColumns([
      ...columns,
      {
        id: newId,
        name: `Grandeza ${columns.length + 1}`,
        row1: "10",
        row2: "15",
        type: "direct",
      },
    ]);
  };

  const removeColumn = (id: string) => {
    if (columns.length <= 2) return;
    const filtered = columns.filter((c) => c.id !== id);
    setColumns(filtered);
    if (targetColId === id && filtered.length > 0) {
      setTargetColId(filtered[0].id);
    }
  };

  const updateColumn = (id: string, field: keyof Column, value: string) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, [field]: value } : col))
    );
  };

  const { xValue, steps, error } = computeComposta(columns, targetColId);

  return (
    <div className={styles.solverGrid}>
      <div className={styles.inputPanel}>
        <div className={styles.panelHeader}>
          <div className={styles.headerTitleRow}>
            <h3>Regra de 3 Composta</h3>
            <button onClick={addColumn} className={styles.addColBtn}>
              + Adicionar Grandeza
            </button>
          </div>
          <p>
            Adicione grandezas, selecione onde está a incógnita X e defina a proporcionalidade de cada coluna
          </p>
        </div>

        {/* Grade Dinâmica */}
        <div className={styles.compostaContainer}>
          <div className={styles.columnsList}>
            {columns.map((col) => {
              const isTarget = col.id === targetColId;

              return (
                <div
                  key={col.id}
                  className={`${styles.colCard} ${isTarget ? styles.colCardTarget : ""}`}
                >
                  <div className={styles.colCardHeader}>
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) =>
                        updateColumn(col.id, "name", e.target.value)
                      }
                      className={styles.colNameInput}
                      placeholder="Nome da grandeza"
                    />

                    {columns.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeColumn(col.id)}
                        className={styles.removeColBtn}
                        title="Remover grandeza"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Seletor de Incógnita ou Proporcionalidade */}
                  <div className={styles.colTypeBar}>
                    <button
                      type="button"
                      onClick={() => setTargetColId(col.id)}
                      className={`${styles.targetToggleBtn} ${isTarget ? styles.targetToggleBtnActive : ""}`}
                    >
                      {isTarget ? "Incógnita X Aqui" : "Definir como X"}
                    </button>

                    {!isTarget && (
                      <div className={styles.propTypeToggle}>
                        <button
                          type="button"
                          onClick={() => updateColumn(col.id, "type", "direct")}
                          className={`${styles.propTypeBtn} ${col.type === "direct" ? styles.propTypeBtnActive : ""}`}
                          title="Diretamente Proporcional"
                        >
                          Direta
                        </button>
                        <button
                          type="button"
                          onClick={() => updateColumn(col.id, "type", "inverse")}
                          className={`${styles.propTypeBtn} ${col.type === "inverse" ? styles.propTypeBtnActive : ""}`}
                          title="Inversamente Proporcional"
                        >
                          Inversa
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Valores Linha 1 e Linha 2 */}
                  <div className={styles.colRows}>
                    <div className={styles.colRowInput}>
                      <label>Cenário 1</label>
                      <input
                        type="text"
                        value={col.row1}
                        onChange={(e) =>
                          updateColumn(col.id, "row1", e.target.value)
                        }
                        placeholder="Valor 1"
                        className={styles.numInput}
                      />
                    </div>

                    <div className={styles.colRowInput}>
                      <label>Cenário 2</label>
                      {isTarget ? (
                        <div className={styles.targetXBox}>X</div>
                      ) : (
                        <input
                          type="text"
                          value={col.row2}
                          onChange={(e) =>
                            updateColumn(col.id, "row2", e.target.value)
                          }
                          placeholder="Valor 2"
                          className={styles.numInput}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.outputPanel}>
        <StepByStepCard
          xValue={xValue}
          subtitle="Regra de 3 Composta (Multiplicação de Razões)"
          steps={steps}
          error={error}
        />
      </div>
    </div>
  );
}
