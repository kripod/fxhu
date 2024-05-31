import {
  Combobox,
  ComboboxItem,
  ComboboxList,
  ComboboxProvider,
  Select,
  SelectArrow,
  SelectItem,
  SelectLabel,
  SelectPopover,
  SelectProvider,
  useSelectStore,
} from "@ariakit/react";
import { clsx } from "clsx/lite";
import { startTransition, useMemo, useState } from "react";

import { countryFromCurrency } from "../utils/currency";
import { currencyNames, regionNames } from "../utils/intl";
import { fuzzySearch } from "../utils/string";
import { ButtonSecondary } from "./ButtonSecondary";
import { CountryFlag } from "./CountryFlag";
import { useField } from "./Field";
import { Input } from "./Input";
import { Popover } from "./Popover";

export interface CurrencySelectProps<T extends string = string> {
  name?: string;
  items: readonly T[];
  value?: NoInfer<T>;
  defaultValue?: NoInfer<T>;
  searchPlaceholder?: string;
  searchMatcher?: (item: T) => readonly string[];
  className?: string;
  onChange?: (value: T) => void;
}

function defaultSearchMatcher(item: string) {
  return [
    item,
    currencyNames.of(item) ?? "",
    regionNames.of(countryFromCurrency(item)) ?? "",
  ];
}

export function CurrencySelect<const T extends string>({
  name,
  items,
  value: controlledValue,
  defaultValue = controlledValue === undefined ? items[0] : undefined,
  searchPlaceholder = "Search by name or country…",
  searchMatcher = defaultSearchMatcher,
  className,
  onChange,
}: CurrencySelectProps<T>) {
  const { label } = useField();

  const store = useSelectStore({
    value: controlledValue,
    defaultValue,
    setValue: onChange,
  });
  const value = store.useState("value");

  const [searchValue, setSearchValue] = useState("");
  const matches = useMemo(() => {
    const indexes = fuzzySearch(
      items.map((item) => searchMatcher(item).join("\n")),
      searchValue,
    );
    return indexes != null ? indexes.map((index) => items[index]!) : null;
  }, [items, searchMatcher, searchValue]);
  const matchesEmpty = matches?.length === 0;

  return (
    <ComboboxProvider
      includesBaseElement={false}
      resetValueOnHide
      setValue={(value) => {
        startTransition(() => {
          setSearchValue(value);
        });
      }}
    >
      <SelectProvider store={store}>
        {label ? <SelectLabel>{label}</SelectLabel> : null}
        <Select
          render={(props) => <ButtonSecondary {...props} />}
          name={name}
          className="text-start"
        >
          {typeof value === "string" ? (
            <CurrencySelectItemContent currency={value} compact />
          ) : null}
          <SelectArrow />
        </Select>
        <SelectPopover
          render={(props) => <Popover {...props} />}
          modal
          gutter={4}
          className="flex flex-col"
        >
          <Combobox
            render={(props) => <Input size="sm" {...props} />}
            autoSelect
            placeholder={searchPlaceholder}
            className="m-1.5 flex-none"
          />
          <div className="flex max-h-96 flex-col overflow-hidden">
            <ComboboxList
              tabIndex={-1}
              className={clsx(
                "scroll-py-1.5 overflow-auto",
                !matchesEmpty && "p-1.5",
              )}
            >
              {(matches ?? items).map((item) => (
                <SelectItem
                  key={item}
                  render={(props) => <ComboboxItem {...props} />}
                  value={item}
                  className="rounded-md px-2.5 py-2 data-[active-item]:bg-blue-600 data-[active-item]:text-white dark:data-[active-item]:bg-blue-200 dark:data-[active-item]:text-blue-950"
                >
                  <CurrencySelectItemContent currency={item} />
                </SelectItem>
              ))}
            </ComboboxList>
          </div>
          {matchesEmpty ? (
            <div className="m-1.5 px-2.5 py-2">No results found</div>
          ) : null}
        </SelectPopover>
      </SelectProvider>
    </ComboboxProvider>
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
  const name = !compact ? currencyNames.of(currency) : null;
  return (
    <span className="flex items-center gap-x-2">
      <CountryFlag code={currency} intrinsicSize={24} />
      {currency} {name != null ? `(${name})` : null}
    </span>
  );
}
