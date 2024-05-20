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
import { useField } from "./Field";

type SelectContextConsumerProps = React.ConsumerProps<
  ReturnType<typeof useSelectContext>
>;

function SelectContextConsumer({ children }: SelectContextConsumerProps) {
  const store = useSelectContext();
  return children(store);
}

export interface CurrencySelectProps<T extends string = string> {
  name?: string;
  items: readonly T[];
  value?: NoInfer<T>;
  defaultValue?: NoInfer<T>;
  className?: string;
  onChange?: (value: T) => void;
}

export function CurrencySelect<const T extends string>({
  name,
  items,
  value: controlledValue,
  defaultValue = controlledValue === undefined ? items[0] : undefined,
  className,
  onChange,
}: CurrencySelectProps<T>) {
  const { label } = useField();

  return (
    <SelectProvider
      defaultValue={defaultValue}
      value={controlledValue}
      setValue={onChange}
    >
      {label ? (
        <SelectLabel render={(props) => <label {...props} />}>
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
        className="z-50 flex max-h-[--popover-available-height] w-80 min-w-[--popover-anchor-width] max-w-[--popover-available-width] flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-opacity duration-200 data-[leave]:opacity-0 dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="scroll-py-1 overflow-auto p-1">
          <div className="max-h-64">
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
