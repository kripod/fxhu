import { clsx } from "clsx/lite";
import { getResetClassName } from "css-homogenizer/reset-scoped";

export interface ButtonSecondaryProps
  extends React.ComponentPropsWithRef<"button"> {
  size?: "md";
}

export function ButtonSecondary({
  size = "md",
  className,
  ...props
}: ButtonSecondaryProps) {
  return (
    <button
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
}
