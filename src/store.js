import { create } from "zustand";
import { devtools } from "zustand/middleware"; // 1. Импортируем middleware

// 2. Оборачиваем всю функцию в devtools(...)
export const useAppStore = create(
  devtools(
    (set) => ({
      count: 0,
      step: 1,

      // Третий аргумент — имя экшена для панели отладки
      increment: () => set((state) => ({ count: state.count + state.step }), undefined, "counter/increment"),

      // НАМЕРЕННАЯ ОШИБКА: ставим 1 вместо 0, как просит задание
      reset: () => set({ count: 0 }, undefined, "counter/reset"),

      setStep: (nextStep) => set({ step: nextStep }, undefined, "counter/setStep"),

      // Новое действие: принимает значение и записывает его имя + само значение
      setCount: (value) =>
        set(
          { count: value },
          undefined,
          { type: "counter/setCount", value }, // Передаем объект, чтобы видеть значение в панели!
        ),

      // === НОВОЕ: Список задач ===
      tasks: [],
      // Состояние текущего фильтра: 'all' | 'active' | 'done'
      filter: "all",

      // Добавление задачи
      // СЛОМАННЫЙaddTask: мутируем старый массив вместо создания нового
      //  addTask: (title) => set(
      //    (state) => {
      //      // Напрямую добавляем элемент в существующий массив (мутация!)
      //      state.tasks.push({ id: crypto.randomUUID(), title, done: false });
      //      // Возвращаем тот же самый объект состояния
      //      return state;
      //    },
      //    undefined,
      //    "tasks/add"
      //  ),

      addTask: (title) =>
        set(
          (state) => ({
            tasks: [...state.tasks, { id: crypto.randomUUID(), title, done: false }],
          }),
          undefined,
          "tasks/add",
        ),

      // Переключение чекбокса
      toggleTask: (id) =>
        set(
          (state) => ({
            tasks: state.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
          }),
          undefined,
          "tasks/toggle",
        ),

      // Удаление одной задачи
      removeTask: (id) =>
        set(
          (state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
          }),
          undefined,
          "tasks/remove",
        ),

      // Очистка всех выполненных задач
      clearDone: () =>
        set(
          (state) => ({
            tasks: state.tasks.filter((task) => !task.done),
          }),
          undefined,
          "tasks/clearDone",
        ),
         // Экшен для изменения фильтра
    setFilter: (nextFilter) => set(
      { filter: nextFilter },
      undefined,
      "filter/set"
    ),
    }),
    { name: "counter" },
    { name: "todo-store" }
  ),
);
