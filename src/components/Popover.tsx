import { clsx } from "clsx/lite";

export interface PopoverProps extends React.ComponentPropsWithRef<"div"> {}

export function Popover({ className, ...props }: PopoverProps) {
  return (
    <div
      className={clsx(
        className,
        "z-50 max-h-(--popover-available-height) w-80 max-w-(--popover-available-width) min-w-(--popover-anchor-width) rounded-xl border border-gray-300 bg-white text-base/none shadow-lg transition-opacity duration-200 ease-out data-[leave]:opacity-0 dark:border-gray-700 dark:bg-gray-900",
      )}
      {...props}
    />
  );
}
