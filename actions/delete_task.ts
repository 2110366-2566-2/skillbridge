"use server";

import prisma from "@/db/prisma";

const deleteJob = async (formData: FormData) => {
  const job_id = formData.get("id");
};
