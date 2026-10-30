import { useAppStore } from "../store";

const AddTaskForm = () => {
  // Подписываем компонент на два действия из Zustand.
  // Они не меняют состояние сами по себе — только при вызове.
  const addTask = useAppStore((state) => state.addTask);
  const addUniqueTask = useAppStore((state) => state.addUniqueTask);

  // Читаем значение поля формы по атрибуту name="title".
  // FormData удобно собирает значения полей формы.
  // String и trim приводят значение к строке и убирают пробелы по краям.
  const getTitle = (form) =>
    String(new FormData(form).get("title") ?? "").trim();

  // Обработчик обычной отправки формы.
  const handleSubmit = (event) => {
    // Не даём браузеру перезагрузить страницу после отправки формы.
    event.preventDefault();

    // currentTarget — именно форма, на которой установлен onSubmit.
    const form = event.currentTarget;
    const title = getTitle(form);

    // Не добавляем задачу, если после удаления пробелов поле пустое.
    if (!title) return;

    // Вызываем действие Zustand и очищаем поле формы.
    addTask(title);
    form.reset();
  };

  // Обработчик кнопки «Добавить, если такой ещё нет».
  const handleUniqueAdd = (event) => {
    // Кнопка находится внутри формы; form указывает на эту форму.
    const form = event.currentTarget.form;

    // addUniqueTask проверяет, есть ли задача с таким названием.
    // Если задача добавлена, очищаем форму.
    if (addUniqueTask(getTitle(form))) form.reset();
  };

  return (
    // onSubmit срабатывает при отправке формы, в том числе по Enter.
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      {/* name нужен, чтобы FormData могла найти значение поля. */}
      <input name="title" placeholder="Что нужно сделать?" required />

      {/* type="submit" отправляет форму и вызывает handleSubmit. */}
      <button type="submit">Добавить</button>

      {/* type="button" не отправляет форму автоматически. */}
      <button type="button" onClick={handleUniqueAdd}>
        Добавить, если такой ещё нет
      </button>
    </form>
  );
};

export default AddTaskForm;
