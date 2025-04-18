import { z } from 'zod';

export const registerSchema = z
	.object({
		username: z
			.string()
			.min(1)
			.regex(/^[a-zA-Z0-9_]+$/),
		firstName: z
			.string()
			.min(1)
			.regex(
				/^[A-Z][a-z]*(?:['-][A-Za-z]+)*(?:\s[A-Z][a-z]*(?:['-][A-Za-z]+)*)?$/
			),
		lastName: z
			.string()
			.min(1)
			.regex(
				/^[A-Z][a-z]*(?:['-][A-Za-z]+)*(?:\s[A-Z][a-z]*(?:['-][A-Za-z]+)*)?$/
			),
		email: z.string().email().min(3),
		password: z.string().min(8),
		repeatPassword: z.string().min(8)
	})
	.refine(data => data.password === data.repeatPassword, {
		path: ['repeatPassword']
	});

export type TypeRegisterAccountSchema = z.infer<typeof registerSchema>;
