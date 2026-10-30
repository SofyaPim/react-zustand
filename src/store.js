import { create } from "zustand";
import { devtools } from "zustand/middleware"; // 1. Импортируем middleware

// 2. Оборачиваем всю функцию в devtools(...)
export const useAppStore = create(devtools(
  (set) => ({
    count: 0,
    step: 1,

    // Третий аргумент — имя экшена для панели отладки
    increment: () => set(
      (state) => ({ count: state.count + state.step }),
      undefined,
      "counter/increment"
    ),

    // НАМЕРЕННАЯ ОШИБКА: ставим 1 вместо 0, как просит задание
    reset: () => set(
      { count: 0 }, 
      undefined, 
      "counter/reset"
    ),

    setStep: (nextStep) => set(
      { step: nextStep },
      undefined,
      "counter/setStep"
    ),

    // Новое действие: принимает значение и записывает его имя + само значение
    setCount: (value) => set(
      { count: value },
      undefined,
      { type: "counter/setCount", value } // Передаем объект, чтобы видеть значение в панели!
    ),
  }),
  { name: "counter" } // 3. Задаем имя нашего стора в панели
));
