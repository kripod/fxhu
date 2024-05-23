import clsx from "clsx/lite";
import { getResetClassName } from "css-homogenizer/reset-scoped";
import { forwardRef } from "react";

import type { Merge } from "../utils/types";

export type InputProps = Merge<
  React.ComponentPropsWithRef<"input">,
  {
    size?: "sm";
  }
>;

export const Input = forwardRef(function Input(
  { size = "sm", className, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      className={clsx(
        getResetClassName("input"),
        className,
        "border border-gray-300 hover:border-gray-700 dark:border-gray-700 dark:hover:border-gray-300",
        size === "sm" && "h-8 rounded-md px-2.5",
      )}
      {...props}
    />
  );
});
