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
  useSelectContext,
} from "@ariakit/react";
import { clsx } from "clsx/lite";
import { getResetClassName } from "css-homogenizer/reset-scoped";
import { startTransition, useMemo, useState } from "react";

import { countryFromCurrency } from "../utils/currency";
import { currencyNames, regionNames } from "../utils/intl";
import { fuzzySearch } from "../utils/string";
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
            "inline-flex h-10 items-center justify-between gap-x-2 rounded-lg border border-gray-300 px-3 text-start text-base/none hover:border-gray-700 dark:border-gray-700 dark:hover:border-gray-300",
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
          className="z-50 flex max-h-[--popover-available-height] w-80 min-w-[--popover-anchor-width] max-w-[--popover-available-width] flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-base/none shadow-lg transition-opacity duration-200 data-[leave]:opacity-0 dark:border-gray-700 dark:bg-gray-900"
        >
          <Combobox
            autoSelect
            placeholder={searchPlaceholder}
            className="m-1 h-8 rounded border border-gray-300 px-2 hover:border-gray-700 dark:border-gray-700 dark:hover:border-gray-300"
          />
          <ComboboxList
            className={clsx(
              "max-h-96 scroll-py-1 overflow-auto",
              !matchesEmpty && "p-1",
            )}
          >
            {(matches ?? items).map((item) => (
              <SelectItem
                key={item}
                render={(props) => <ComboboxItem {...props} />}
                value={item}
                className="rounded p-2 data-[active-item]:bg-blue-600 data-[active-item]:text-white dark:data-[active-item]:bg-blue-200 dark:data-[active-item]:text-blue-950"
              >
                <CurrencySelectItemContent currency={item} />
              </SelectItem>
            ))}
          </ComboboxList>
          {matchesEmpty ? (
            <div className="m-1 p-2">No results found</div>
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
