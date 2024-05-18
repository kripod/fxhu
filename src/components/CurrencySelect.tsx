import {
  Select,
  SelectArrow,
  SelectItem,
  SelectItemCheck,
  SelectLabel,
  SelectPopover,
  SelectProvider,
  useSelectContext,
} from "@ariakit/react";
import { clsx } from "clsx/lite";
import { getResetClassName } from "css-homogenizer/reset-scoped";

import { CountryFlag } from "./CountryFlag";

type SelectContextConsumerProps = React.ConsumerProps<
  ReturnType<typeof useSelectContext>
>;

function SelectContextConsumer({ children }: SelectContextConsumerProps) {
  const store = useSelectContext();
  return children(store);
}

export interface CurrencySelectProps<T extends string> {
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
      <SelectLabel>{label}</SelectLabel>
      <Select
        name={name}
        className={clsx(
          getResetClassName("button"),
          className,
          "inline-flex h-8 items-center gap-x-2 bg-gray-200 px-2 text-base dark:bg-gray-700",
        )}
      >
        <SelectContextConsumer>
          {(store) => {
            const value = store?.useState().value;
            return typeof value === "string" ? (
              <CurrencySelectItemContent currency={value} />
            ) : null;
          }}
        </SelectContextConsumer>
        <SelectArrow />
      </Select>
      <SelectPopover modal gutter={8} sameWidth unmountOnHide>
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
