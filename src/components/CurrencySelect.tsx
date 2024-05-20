import {
  Select,
  SelectArrow,
  SelectItem,
  SelectLabel,
  SelectPopover,
  SelectProvider,
  useSelectContext,
} from "@ariakit/react";
import { clsx } from "clsx/lite";
import { getResetClassName } from "css-homogenizer/reset-scoped";

import { currencyName } from "../utils/currency";
import { CountryFlag } from "./CountryFlag";

type SelectContextConsumerProps = React.ConsumerProps<
  ReturnType<typeof useSelectContext>
>;

function SelectContextConsumer({ children }: SelectContextConsumerProps) {
  const store = useSelectContext();
  return children(store);
}

export interface CurrencySelectProps<T extends string = string> {
  label?: React.ReactNode;
  name?: string;
  items: readonly T[];
  value?: NoInfer<T>;
  defaultValue?: NoInfer<T>;
  className?: string;
  onChange?: (value: T) => void;
}

export function CurrencySelect<const T extends string>({
  label,
  name,
  items,
  value: controlledValue,
  defaultValue = controlledValue === undefined ? items[0] : undefined,
  className,
  onChange,
}: CurrencySelectProps<T>) {
  return (
    <SelectProvider
      defaultValue={defaultValue}
      value={controlledValue}
      setValue={onChange}
    >
      {label ? (
        <SelectLabel
          render={(props) => <label {...props} />}
          className="block pb-2"
        >
          {label}
        </SelectLabel>
      ) : null}
      <Select
        name={name}
        className={clsx(
          getResetClassName("button"),
          className,
          "inline-flex h-10 items-center justify-between gap-x-2 rounded-lg border border-gray-300 px-3 text-start hover:border-gray-700 dark:border-gray-700 dark:hover:border-gray-300",
        )}
      >
        <SelectContextConsumer>
          {(store) => {
            const value = store?.useState().value;
            return typeof value === "string" ? (
              <CurrencySelectItemContent currency={value} compact />
            ) : null;
          }}
        </SelectContextConsumer>
        <SelectArrow />
      </Select>
      <SelectPopover
        portal
        gutter={4}
        sameWidth
        className="z-50 flex max-h-[min(24rem,var(--popover-available-height))] min-w-[min(18rem,var(--popover-available-width))] flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-opacity duration-200 data-[leave]:opacity-0 dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="scroll-py-1 overflow-auto p-1">
          {items.map((item) => (
            <SelectItem
              key={item}
              value={item}
              className="rounded p-2 data-[active-item]:bg-blue-600 data-[active-item]:text-white dark:data-[active-item]:bg-blue-200 dark:data-[active-item]:text-blue-950"
            >
              <CurrencySelectItemContent currency={item} />
            </SelectItem>
          ))}
        </div>
      </SelectPopover>
    </SelectProvider>
  );
}

interface CurrencySelectItemContentProps {
  currency: string;
  compact?: boolean;
}

function CurrencySelectItemContent({
  currency,
  compact,
}: CurrencySelectItemContentProps) {
  const name = !compact ? currencyName(currency) : null;
  return (
    <span className="flex items-center gap-x-2 text-base/none">
      <CountryFlag code={currency} intrinsicSize={24} />
      {currency} {name != null ? `(${name})` : null}
    </span>
  );
}
