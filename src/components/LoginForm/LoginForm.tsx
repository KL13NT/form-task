import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "~/components/Input/Input";
import {
  type LoginFormValues,
  loginSchema,
  passwordRules,
} from "~/schemas/loginForm.schema";
import { toast } from "~/stores/toast";

import styles from "./LoginForm.module.scss";

type APIResponse = {
  ok: boolean;
};

export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    shouldFocusError: false,
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const watchedPassword = watch("password");

  const unmetPasswordRules = passwordRules.filter(
    (rule) => !rule.test(watchedPassword)
  );

  const onSubmit = async (values: LoginFormValues) => {
    if (isSubmitting) return;

    toast({
      message: "Logging in...",
    });

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const { ok } = (await response.json()) as APIResponse;

      if (!ok) {
        return toast({
          message: "Login failed",
        });
      }

      toast({
        message: "Login successful",
      });
    } catch (error) {
      toast({
        message: (error as Error).message,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={
          !isSubmitting ? handleSubmit(onSubmit) : (e) => e.preventDefault()
        }
        className={styles.form}
        noValidate
      >
        <h1 className={styles.title}>Sign in</h1>
        <Input
          name="email"
          label="Email"
          id="email"
          control={control}
          placeholder="example@domain.com"
          type="email"
          error={errors.email?.message}
          required
        />
        <Input
          name="password"
          label="Password"
          id="password"
          control={control}
          placeholder="example@domain.com"
          type="password"
          error={errors.password?.message}
          required
        />

        <div
          id="password-requirements"
          role="group"
          aria-labelledby="password-requirements-label"
        >
          <p id="password-requirements-label">
            {unmetPasswordRules.length > 0
              ? "Password requirements not met:"
              : "All password requirements met"}
          </p>
          <ul>
            {unmetPasswordRules.map((rule) => {
              return <li key={rule.id}>{rule.label}.</li>;
            })}
          </ul>
        </div>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
        <div
          id="login-form-errors"
          role="status"
          aria-live="polite"
          aria-atomic="false"
          aria-label="Form status"
        >
          {isValid && isDirty ? (
            <p>Form is ready to submit.</p>
          ) : Object.keys(errors).length > 0 ? (
            <p>You have outstanding errors on the form.</p>
          ) : (
            isSubmitting && <p>Submitting.</p>
          )}
        </div>
      </form>
    </div>
  );
};
