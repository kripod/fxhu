import { useState } from "react";

import { CurrencySelect, type CurrencySelectProps } from "./CurrencySelect";

export interface CurrencySelectUncontrolledProps<T extends string>
  extends Omit<CurrencySelectProps<T>, "value"> {
  items: readonly [T, ...T[]];
  defaultValue?: T;
}

export function CurrencySelectUncontrolled<T extends string>({
  items,
  defaultValue = items[0],
  onChange,
  ...props
}: CurrencySelectUncontrolledProps<T>) {
  const [value, setValue] = useState(defaultValue);
  return (
    <CurrencySelect
      items={items}
      value={value}
      onChange={(value) => {
        setValue(value);
        onChange?.(value);
      }}
      {...props}
    />
  );
}
