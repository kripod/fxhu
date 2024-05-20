import { CurrencySelect, type CurrencySelectProps } from "./CurrencySelect";
import { Field, type FieldProps } from "./Field";

export interface CurrencySelectFieldProps
  extends FieldProps,
    CurrencySelectProps {}

export function CurrencySelectField({
  label,
  ...props
}: CurrencySelectFieldProps) {
  return (
    <Field label={label}>
      <CurrencySelect {...props}></CurrencySelect>
    </Field>
  );
}
