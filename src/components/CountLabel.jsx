import { useAppStore } from "../store";

const CountLabel = () => {
  const count = useAppStore((state) => state.count);

  return <span>Нажали {count} раз</span>;
};

export default CountLabel;