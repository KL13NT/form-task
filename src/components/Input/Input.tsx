import { cva } from "cva";
import { type Control, Controller } from "react-hook-form";
import type { InputHTMLAttributes } from "react";

import type { LoginFormValues } from "~/schemas/loginForm.schema";

import styles from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: keyof LoginFormValues;
  id: string;
  control: Control<LoginFormValues>;
  error?: string;
}

const inputClasses = cva([styles.input], {
  variants: {
    state: {
      idle: [],
      error: [styles.error],
    },
  },
  defaultVariants: {
    state: "idle",
  },
});

export const Input = ({
  control,
  className,
  id,
  label,
  name,
  error,
  required,
  ...props
}: InputProps) => {
  return (
    <div
      className={inputClasses({
        state: error ? "error" : "idle",
        className,
      })}
    >
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            {...props}
            {...field}
            id={id}
            aria-describedby={`${id}-error`}
            className={styles.field}
          />
        )}
      />
      <div id={`${id}-error`} className={styles.error}>
        {error}
      </div>
    </div>
  );
};
