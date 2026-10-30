import React from "react";
import { useAppStore } from "./store.js";

import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import FilterButtons from "./components/FilterButtons.jsx";
import SettingsPanel from "./components/SettingsPanel.jsx";

// Компонент 1: Отображение счетчика
const CounterDisplay = () => {
  const count = useAppStore((state) => state.count);
  return (
    <div style={{ fontSize: "24px", marginBottom: "10px" }}>
      Текущее значение: <strong>{count}</strong>
    </div>
  );
};

// Компонент 2: Управление (+ и Сброс)
const CounterControls = () => {
  const increment = useAppStore((state) => state.increment);
  const reset = useAppStore((state) => state.resetCounter);
  const setCount = useAppStore((state) => state.setCount); // Достаем новое действие

  return (
    <div style={{ marginBottom: "15px" }}>
      <h3>Управление счётчиком</h3>
      <button onClick={increment} style={{ marginRight: "10px", padding: "5px 10px" }}>
        Прибавить
      </button>
      <button onClick={reset} style={{ marginRight: "10px", padding: "5px 10px" }}>
        Сбросить (С багом!)
      </button>
      {/* Новая кнопка из задания */}
      <button onClick={() => setCount(10)} style={{ padding: "5px 10px" }}>
        Установить 10
      </button>
    </div>
  );
};

// Компонент 3: Выбор шага
const StepSelector = () => {
  const currentStep = useAppStore((state) => state.step);
  const setStep = useAppStore((state) => state.setStep);
  const steps = [1, 5, 10];

  return (
    <div>
      <span>Выбрать шаг: </span>
      {steps.map((val) => (
        <button
          key={val}
          onClick={() => setStep(val)}
          style={{
            marginLeft: "5px",
            padding: "3px 8px",
            fontWeight: currentStep === val ? "bold" : "normal",
            backgroundColor: currentStep === val ? "#ddd" : "#fff",
            border: currentStep === val ? "2px solid #000" : "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {val}
        </button>
      ))}
    </div>
  );
};

// Главный компонент — рендерит три подкомпонента без передачи пропсов
export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Счётчик на Zustand</h2>
      <CounterDisplay />
      <CounterControls />
      <StepSelector />
      <hr />

      {/* 2. Наши новые независимые компоненты */}
      <SettingsPanel />
      <AddTaskForm />
      <TaskList />
      <TaskStats />
      <FilterButtons />
    </div>
  );
}
