import { useAppStore } from "../store";

const TaskList = () => {
  console.log("[RENDER] TaskList");

  const tasks = useAppStore((state) => state.tasks);
  const filter = useAppStore((state) => state.filter);
  const showDone = useAppStore((state) => state.settings.showDone);
  const sort = useAppStore((state) => state.settings.sort);
  const tags = useAppStore((state) => state.tags);
  const assignees = useAppStore((state) => state.assignees);

  const toggleTask = useAppStore((state) => state.toggleTask);
  const removeTask = useAppStore((state) => state.removeTask);
  const assignTask = useAppStore((state) => state.assignTask);

  const sortedTasks =
    sort === "title"
      ? tasks.toSorted((a, b) => a.title.localeCompare(b.title))
      : tasks;

  const filteredTasks = sortedTasks.filter((task) => {
    if (!showDone && task.done) return false;
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  return (
    <section>
      <p>Активные теги: {[...tags].join(", ") || "нет"}</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ marginBottom: 8 }}>
            <label
              style={{
                marginRight: 10,
                textDecoration: task.done ? "line-through" : "none",
              }}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              {task.title}
            </label>

            <select
              aria-label={`Исполнитель задачи ${task.title}`}
              value={assignees.get(task.id) ?? ""}
              onChange={(event) => assignTask(task.id, event.target.value)}
            >
              <option value="">Не назначен</option>
              <option value="Анна">Анна</option>
              <option value="Иван">Иван</option>
            </select>

            <button onClick={() => removeTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TaskList;