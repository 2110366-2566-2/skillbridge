import { ZodError, z } from "zod";
import { JobStatus } from "@prisma/client";

const JobSchema = z.object({
  title: z.string(),
  description: z.string(),
  estimateStartDate: z.coerce.date(),
  estimateEndDate: z.coerce.date(),
  budget: z.coerce.number().int().gte(0),
  jobTagId: z.string(),
  numWorker: z.coerce.number().int().gte(1),
  "files[]": z.instanceof(File).optional(),
  status: z.nativeEnum(JobStatus).default("NOT_STARTED"),
});

export default JobSchema;
