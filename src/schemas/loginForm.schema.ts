import z from "zod";

export const loginSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(8, "Password must have at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
			"Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number"
		),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
