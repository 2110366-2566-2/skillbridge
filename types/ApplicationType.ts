import { z } from "zod";
const ApplicationSchema = z.object({
  file: z.instanceof(File).nullish(),
  bid: z.coerce.number().gte(0),
  jobId: z.string(),
});

export default ApplicationSchema;
