import { useAppStore } from "../store";

const TaskStats = () => {
  // Вычисляем количество невыполненных задач прямо внутри селектора.
  // Этот компонент будет перерисовываться ТОЛЬКО если изменится итоговое число!
  const uncompletedCount = useAppStore((state) => state.tasks.filter(t => !t.done).length);
  const clearDone = useAppStore((state) => state.clearDone);

  return (
    <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
      <p>Осталось выполнить: <strong>{uncompletedCount}</strong></p>
      <button onClick={clearDone}>🧹 Очистить выполненные</button>
    </div>
  );
};

export default TaskStats;
