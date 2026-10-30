import { useAppStore } from "../store";

const TaskList = () => {
  const tasks = useAppStore((state) => state.tasks);
  const toggleTask = useAppStore((state) => state.toggleTask);
  const removeTask = useAppStore((state) => state.removeTask);

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ marginBottom: "8px" }}>
          <label style={{ marginRight: "10px", textDecoration: task.done ? "line-through" : "none" }}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            {task.title}
          </label>
          <button onClick={() => removeTask(task.id)}>❌ Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
