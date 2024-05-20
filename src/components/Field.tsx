import { createContext, useContext, useMemo } from "react";

interface FieldContextValue {
  label: React.ReactNode;
}

const FieldContext = createContext<FieldContextValue>({
  label: undefined,
});

export function useField() {
  return useContext(FieldContext);
}

export interface FieldProps extends FieldContextValue {
  children?: React.ReactNode;
}

export function Field({ label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <FieldContext.Provider value={useMemo(() => ({ label }), [label])}>
        {children}
      </FieldContext.Provider>
    </div>
  );
}
