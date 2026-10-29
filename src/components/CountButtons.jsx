import { useAppStore } from "../store";

const CountButtons = () => {
  const increment = useAppStore((state) => state.increment);
  const reset = useAppStore((state) => state.reset);

  return (
    <div>
      <button onClick={increment}>Нажать</button>
      <button onClick={reset}>Сбросить</button>
    </div>
  );
};

export default CountButtons;