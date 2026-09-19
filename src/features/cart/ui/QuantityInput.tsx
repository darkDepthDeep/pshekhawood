import { useState, useRef } from "react";

interface QuantityInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  ariaLabel: string;
  id?: string;
}

/**
 * Input количества с поддержкой ручного ввода.
 * Синхронизируется с внешним value БЕЗ useEffect.
 */
export function QuantityInput({
  value,
  min = 1,
  max = 9999,
  onChange,
  ariaLabel,
  id,
}: QuantityInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Храним предыдущее внешнее значение для обнаружения изменений извне
  const [prevValue, setPrevValue] = useState(value);
  const [displayValue, setDisplayValue] = useState(String(value));

  // Синхронизация ПРИ РЕНДЕРЕ, а не в эффекте
  // Если value изменилось извне (кнопки ±) → обновляем displayValue
  if (value !== prevValue) {
    setPrevValue(value);
    setDisplayValue(String(value));
  }

  const clamp = (val: number) => Math.min(max, Math.max(min, val));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === "") {
      setDisplayValue("");
      return;
    }

    if (!/^\d+$/.test(raw)) return;

    setDisplayValue(raw);

    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed)) {
      onChange(clamp(parsed));
    }
  };

  const handleBlur = () => {
    const parsed = parseInt(displayValue, 10);
    if (isNaN(parsed) || parsed < min) {
      setDisplayValue(String(min));
      onChange(min);
    } else {
      const clamped = clamp(parsed);
      setDisplayValue(String(clamped));
      if (clamped !== parsed) {
        onChange(clamped);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setDisplayValue(String(value));
      inputRef.current?.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      min={min}
      max={max}
      className="w-12 h-8 text-center text-sm font-medium tabular-nums rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [appearance:textfield]"
      aria-label={ariaLabel}
    />
  );
}
