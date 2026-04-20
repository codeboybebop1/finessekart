import { z } from "zod";

const ListingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.coerce.number().min(1, "Invalid Price"),
  width: z.coerce.number().min(1, "Invalid Width"),
  height: z.coerce.number().min(1, "Invalid Height"),
  date: z.date(),
  urls: z.array(z.string()).min(1, "Upload at least 1 image"),
  selectedtags: z.array(z.string()).min(1, "Select at least 1 tag"),
});

function ValidateListing(data) {
  const result = ListingSchema.safeParse(data);

  if (!result.success) {
    return result.error.errors[0].message;
  }

  return true;
}

export default ValidateListing;