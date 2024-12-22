import { clsx } from "clsx/lite";
import { getResetClassName } from "css-homogenizer/reset-scoped";

export interface InputProps
  extends Omit<React.ComponentPropsWithRef<"input">, "size"> {
  size?: "sm";
}

export function Input({ size = "sm", className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        getResetClassName("input"),
        className,
        "border border-gray-300 hover:border-gray-700 dark:border-gray-700 dark:hover:border-gray-300",
        size === "sm" && "h-8 rounded-md px-2.5",
      )}
      {...props}
    />
  );
}
