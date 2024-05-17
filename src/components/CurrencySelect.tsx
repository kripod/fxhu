import {
  Select,
  SelectArrow,
  SelectItem,
  SelectItemCheck,
  SelectLabel,
  SelectPopover,
  SelectProvider,
} from "@ariakit/react";
import { clsx } from "clsx/lite";
import { getResetClassName } from "css-homogenizer/reset-scoped";

import { CountryFlag } from "./CountryFlag";

export interface CurrencySelectProps<T extends string> {
  label?: React.ReactNode;
  items: readonly T[];
  value: T;
  className?: string;
  onChange?: (value: T) => void;
}

export function CurrencySelect<T extends string>({
  label,
  items,
  value,
  className,
  onChange,
}: CurrencySelectProps<T>) {
  return (
    <SelectProvider value={value} setValue={onChange}>
      <SelectLabel>{label}</SelectLabel>
      <Select
        className={clsx(
          getResetClassName("button"),
          className,
          "inline-flex h-8 items-center gap-x-2 bg-gray-200 px-2 text-base dark:bg-gray-700",
        )}
      >
        <CurrencySelectItemContent currency={value} />
        <SelectArrow />
      </Select>
      <SelectPopover modal gutter={8} sameWidth>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            <CurrencySelectItemContent currency={item} />
            <SelectItemCheck />
          </SelectItem>
        ))}
      </SelectPopover>
    </SelectProvider>
  );
}

interface CurrencySelectItemContentProps {
  currency: string;
}

function CurrencySelectItemContent({
  currency,
}: CurrencySelectItemContentProps) {
  return (
    <span className="inline-flex items-center gap-x-2">
      <CountryFlag code={currency} intrinsicSize={24} />
      {currency}
    </span>
  );
}
