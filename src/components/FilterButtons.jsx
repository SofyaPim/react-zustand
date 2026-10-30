import { useAppStore } from "../store";

const FilterButtons = () => {
  // Ставим лог перерисовок компонента
  console.log("🟢 [RENDER] FilterButtons");

  // Читаем только значение фильтра и экшен для его изменения
  const currentFilter = useAppStore((state) => state.filter);
  const setFilter = useAppStore((state) => state.setFilter);

  const filters = ["all", "active", "done"];

  return (
    <div style={{ margin: "10px 0" }}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{
            marginRight: "5px",
            fontWeight: currentFilter === f ? "bold" : "normal",
          }}
        >
          {f === "all" ? "Все" : f === "active" ? "Активные" : "Выполненные"}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
