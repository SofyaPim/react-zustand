import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  count: 0,
  step: 1,

  tasks: [
    { id: "task-1", title: "Подготовить макет", done: false },
    { id: "task-2", title: "Проверить форму", done: true },
  ],
  filter: "all",

  settings: {
    showDone: true,
    sort: "manual",
  },

  tags: new Set(["frontend", "urgent"]),
  assignees: new Map([["task-1", "Анна"]]),
  archived: [],
};

export const useAppStore = create(
  devtools(
    (set, get) => ({
      ...initialState,

      // Действия счётчика; resetCounter не конфликтует с reset всего стора.
      increment: () =>
        set(
          (state) => ({ count: state.count + state.step }),
          undefined,
          "counter/increment",
        ),
      resetCounter: () => set({ count: 0 }, undefined, "counter/reset"),
      setStep: (step) => set({ step }, undefined, "counter/setStep"),

      addTask: (title) =>
        set(
          (state) => ({
            tasks: [
              ...state.tasks,
              { id: crypto.randomUUID(), title: title.trim(), done: false },
            ],
          }),
          undefined,
          "tasks/add",
        ),

      // get() позволяет проверить актуальный стор до добавления задачи.
      addUniqueTask: (title) => {
        const normalizedTitle = title.trim();
        if (!normalizedTitle) return false;

        const alreadyExists = get().tasks.some(
          (task) => task.title.toLowerCase() === normalizedTitle.toLowerCase(),
        );

        if (alreadyExists) return false;

        get().addTask(normalizedTitle);
        return true;
      },

      toggleTask: (id) =>
        set(
          (state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? { ...task, done: !task.done } : task,
            ),
          }),
          undefined,
          "tasks/toggle",
        ),

      removeTask: (id) =>
        set(
          (state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }),
          undefined,
          "tasks/remove",
        ),

      clearDone: () =>
        set(
          (state) => ({ tasks: state.tasks.filter((task) => !task.done) }),
          undefined,
          "tasks/clearDone",
        ),

      setFilter: (nextFilter) =>
        set(
          (state) =>
            state.filter === nextFilter ? state : { filter: nextFilter },
          undefined,
          "filter/set",
        ),

      toggleShowDone: () =>
        set(
          (state) => ({
            // Обновляем вложенный объект иммутабельно и сохраняем sort.
            settings: {
              ...state.settings,
              showDone: !state.settings.showDone,
            },
          }),
          undefined,
          "settings/toggleShowDone",
        ),

      setSort: (sort) =>
        set(
          (state) => ({
            settings: { ...state.settings, sort },
          }),
          undefined,
          "settings/setSort",
        ),

      toggleTag: (tag) =>
        set(
          (state) => {
            const tags = new Set(state.tags);

            if (tags.has(tag)) tags.delete(tag);
            else tags.add(tag);

            return { tags };
          },
          undefined,
          "tags/toggle",
        ),

      assignTask: (taskId, name) =>
        set(
          (state) => {
            const assignees = new Map(state.assignees);

            if (name) assignees.set(taskId, name);
            else assignees.delete(taskId);

            return { assignees };
          },
          undefined,
          "tasks/assign",
        ),

      sortByTitle: () =>
        set(
          (state) => ({
            // toSorted создаёт новый массив, не меняя state.tasks.
            tasks: state.tasks.toSorted((a, b) =>
              a.title.localeCompare(b.title),
            ),
          }),
          undefined,
          "tasks/sortByTitle",
        ),

      archiveDone: () => {
        // Это два отдельных обновления стора.
        set(
          (state) => ({
            archived: [
              ...state.archived,
              ...state.tasks.filter((task) => task.done),
            ],
          }),
          undefined,
          "tasks/archiveDone/add",
        );

        set(
          (state) => ({
            tasks: state.tasks.filter((task) => !task.done),
          }),
          undefined,
          "tasks/archiveDone/remove",
        );
      },

      // set с replace=false сохраняет действия, уже находящиеся в сторе.
      reset: () => set(initialState, false, "app/reset"),

      // Только для опыта: этот вызов заменит весь стор данными initialState.
      // После него действия, включая resetWithReplace, исчезнут.
      resetWithReplace: () =>
        set(initialState, true, "app/resetWithReplace"),
    }),
    { name: "todo-store" },
  ),
);
