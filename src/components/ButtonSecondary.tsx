import clsx from "clsx/lite";
import { getResetClassName } from "css-homogenizer/reset-scoped";
import { forwardRef } from "react";

import type { Merge } from "../utils/types";

export type ButtonSecondaryProps = Merge<
  React.ComponentPropsWithRef<"button">,
  {
    size?: "md";
  }
>;

export const ButtonSecondary = forwardRef(function ButtonSecondary(
  { size = "md", className, ...props }: ButtonSecondaryProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        getResetClassName("button"),
        className,
        "inline-flex items-center justify-between border border-gray-300 hover:border-gray-700 dark:border-gray-700 dark:hover:border-gray-300",
        size === "md" && "h-10 gap-x-2 rounded-lg px-4 text-base/none",
      )}
      {...props}
    />
  );
});
