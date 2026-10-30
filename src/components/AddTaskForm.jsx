import { useAppStore } from "../store";

const AddTaskForm = () => {
  const addTask = useAppStore((state) => state.addTask);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = String(formData.get("title")).trim();
    
    if (!title) return; // Не добавляем пустые задачи    
    addTask(title);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <input name="title" placeholder="Что нужно сделать?" required />
      <button type="submit">➕ Добавить задачу</button>
    </form>
  );
};

export default AddTaskForm;
