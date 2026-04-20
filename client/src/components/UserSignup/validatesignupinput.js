import { z } from "zod";

const UserSchema = z.object({
  FullName: z.string().min(1, "Name is required"),
  Username: z.string().min(1, "Username is required"),
  Email: z.string().email("Invalid email"),
  Password: z.string().min(8, "Password must be 8+ chars"),
  PhoneNumber: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
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