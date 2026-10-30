import { useAppStore } from "../store";
// import { useMemo } from "react";
// import { useShallow } from "zustand/react/shallow";

const TaskList = () => {
  // Ставим лог перерисовок компонента
  console.log("🔵 [RENDER] TaskList");

  // Способ 1: раздельные вызовы хука
  const filter = useAppStore((state) => state.filter);
  const tasks = useAppStore((state) => state.tasks);
  const toggleTask = useAppStore((state) => state.toggleTask);
  const removeTask = useAppStore((state) => state.removeTask);

  //   const { tasks, filter } = useAppStore(
  //     useShallow((state) => ({
  //       tasks: state.tasks,
  //       filter: state.filter,
  //     })),
  //   );
  //   // ❌ НАМЕРЕННАЯ ОШИБКА: Селектор собирает новые объекты внутри map
  //   const { filteredTasks } = useAppStore(
  //     useShallow((state) => ({
  //       filteredTasks: state.tasks
  //         .filter((task) => {
  //           if (state.filter === "active") return !task.done;
  //           if (state.filter === "done") return task.done;
  //           return true;
  //         })
  //         .map((task) => ({ id: task.id, title: task.title })) // Каждая итерация создаёт {} в памяти!
  //     }))
  //   );

  //   // ❌ НАМЕРЕННАЯ ОШИБКА: Возвращаем свежесозданный объект из селектора
  //   const { tasks, filter } = useAppStore((state) => ({
  //     tasks: state.tasks,
  //     filter: state.filter,
  //   }));

  //   // useMemo выполняет тяжелую работу (сортировку и фильтрацию)
  //   // ТОЛЬКО если изменился сам массив задач или текущий фильтр.
  //   const filteredTasks = useMemo(() => {
  //     console.log("⚙️ [MEMO] Тяжелые вычисления (фильтрация и сортировка)");

  //     // 1. Сначала фильтруем исходный массив задач
  //     const filtered = tasks.filter((task) => {
  //       if (filter === "active") return !task.done;
  //       if (filter === "done") return task.done;
  //       return true;
  //     });

  //     // 2. Затем сортируем полученный результат по алфавиту
  //     return filtered.sort((a, b) => a.title.localeCompare(b.title));
  //   }, [tasks, filter]); // Сюда не входит count, поэтому клик по счетчику не вызовет этот блок!

  // Фильтруем задачи перед рендером
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {filteredTasks.map((task) => (
        <li key={task.id} style={{ marginBottom: "8px" }}>
          <label style={{ marginRight: "10px", textDecoration: task.done ? "line-through" : "none" }}>
            <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
            {task.title}
          </label>
          <button onClick={() => removeTask(task.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
