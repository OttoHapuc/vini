import styles from "@/app/calculadora/page.module.css";

interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
}

interface CalcHistoryProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
  onRestoreHistory: (entry: HistoryEntry) => void;
}

export default function CalcHistory({
  history,
  onClearHistory,
  onRestoreHistory,
}: CalcHistoryProps) {
  return (
    <div className={styles.historyPanel}>
      <div className={styles.historyHeader}>
        <h3 className={styles.historyTitle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Histórico
        </h3>
        {history.length > 0 && (
          <button onClick={onClearHistory} className={styles.historyClearBtn}>
            Limpar
          </button>
        )}
      </div>
      <div className={styles.historyList}>
        {history.length === 0 ? (
          <div className={styles.emptyHistory}>Nenhum cálculo recente</div>
        ) : (
          history.map((entry) => (
            <div
              key={entry.id}
              className={styles.historyItem}
              onClick={() => onRestoreHistory(entry)}
              title="Clique para restaurar cálculo"
            >
              <div className={styles.historyExpr}>{entry.expression}</div>
              <div className={styles.historyRes}>{entry.result}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
