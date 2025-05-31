import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_ANALYTICS_ID: z.string(),
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string().min(16),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("Invalid environment variables:", env.error.format());
  throw new Error("Invalid environment variables");
}

export const envVars = env.data;