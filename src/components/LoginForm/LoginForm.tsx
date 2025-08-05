import {useForm} from "react-hook-form";
import {Input} from "../Input/Input";
import {zodResolver} from "@hookform/resolvers/zod";
import {type LoginFormValues, loginSchema,} from "../../schemas/loginForm.schema";
import {toast} from "../../stores/toast";

import styles from "./LoginForm.module.scss";

type APIResponse = {
    ok: boolean
}

export const LoginForm = () => {
    const {
        handleSubmit,
        control,
        formState: {errors},
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

    const onSubmit = async (values: LoginFormValues) => {
        toast({
            message: "Logging in...",
        });

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(values)
            })

            const {ok} = await response.json() as APIResponse;

            if (!response.ok) {
                throw new Error("Login failed.");
            }


            if (!ok) {
                throw new Error("Login failed.");
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
                onSubmit={(event) => void handleSubmit(onSubmit)(event)}
                className={styles.form}
            >
                <h1 className={styles.title}>Sign in</h1>
                <Input
                    label="email"
                    name="email"
                    id="email"
                    control={control}
                    placeholder="example@domain.com"
                    type="email"
                    error={errors.email?.message}
                />
                <Input
                    name="password"
                    label="password"
                    id="password"
                    control={control}
                    placeholder="example@domain.com"
                    type="password"
                    error={errors.password?.message}
                />
                <button type="submit" className={styles.submit}>
                    Submit
                </button>
                <div
                    id="login-form-errors"
                    role="status"
                    aria-live="polite"
                    aria-atomic="false"
                >
                    {Object.keys(errors).length > 0 &&
                        <p>You have outstanding errors on the form.</p>}
                </div>
            </form>
        </div>
    );
};
