import { z } from 'zod';

export const loginSchema = z.object({
	username: z
		.string()
		.min(1)
		.regex(/^[a-zA-Z0-9_]+$/),
	password: z.string().min(8)
});

export type TypeLoginAccountSchema = z.infer<typeof loginSchema>;
