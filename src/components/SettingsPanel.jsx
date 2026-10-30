import { useAppStore } from "../store";

const SettingsPanel = () => {
  // Каждый вызов useAppStore подписывает компонент на выбранное значение.
  // Например, изменение settings.sort не меняет showDone, поэтому соответствующие подписки сравниваются отдельно.
  const showDone = useAppStore((state) => state.settings.showDone);
  const sort = useAppStore((state) => state.settings.sort);
  const tags = useAppStore((state) => state.tags);

  // Из стора также получаем функции, которые изменяют его состояние.
  const toggleShowDone = useAppStore((state) => state.toggleShowDone);
  const setSort = useAppStore((state) => state.setSort);
  const toggleTag = useAppStore((state) => state.toggleTag);
  const sortByTitle = useAppStore((state) => state.sortByTitle);

  // Это обычный массив JavaScript, а не часть состояния Zustand.
  // map ниже создаст по кнопке для каждого тега.
  const availableTags = ["frontend", "urgent", "bug"];

  return (
    <section>
      <h3>Настройки</h3>

      <label>
        <input
          // checked делает checkbox управляемым React: его состояние берётся из стора, а не хранится внутри DOM.
          checked={showDone}
          // При изменении вызывается действие из Zustand.
          onChange={toggleShowDone}
        />
        Показывать выполненные
      </label>

      <div>
        <span>Режим сортировки: </span>

        {/* onClick задаёт действие, которое выполнится при нажатии. */}
        <button onClick={() => setSort("manual")}>Как добавлены</button>
        <button onClick={() => setSort("title")}>По названию</button>

        {/* Фигурные скобки позволяют вывести значение JavaScript в JSX. */}
        <span> Сейчас: {sort}</span>
      </div>

      <div>
        {/* map преобразует каждый тег в отдельную кнопку. */}
        {availableTags.map((tag) => (
          <button
            // key помогает React отличать элементы списка друг от друга.
            key={tag}
            // Функция-обёртка передаёт выбранный тег в действие.
            onClick={() => toggleTag(tag)}
            // Set.has(tag) проверяет, включён ли тег.
            // aria-pressed сообщает это состояние вспомогательным технологиям.
            aria-pressed={tags.has(tag)}
          >
            {/* Если тег выбран, показываем галочку перед его названием. */}
            {tags.has(tag) ? "✓ " : ""}
            {tag}
          </button>
        ))}
      </div>

      {/* При нажатии запускается действие сортировки задач из стора. */}
      <button onClick={sortByTitle}>Отсортировать массив задач</button>
    </section>
  );
};

export default SettingsPanel;