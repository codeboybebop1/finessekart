import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be 8+ chars"),
});

function validate(data) {
  const result = UserSchema.safeParse(data);

  if (!result.success) {
    // Safely get the first error message
    const firstError = result.error?.issues?.[0]?.message || "Validation failed";
    return firstError;
  }
  return true;
}

export { validate };