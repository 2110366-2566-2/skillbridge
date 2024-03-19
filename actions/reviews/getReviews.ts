import { prisma } from "../../lib/prisma";

const getReviews = async () => {
  const results = await prisma.review.findMany({
    include: {
      job: {
        include: {
          employer: {
            include: {
              user: true, // Populate user from userId in employer
            },
          },
          jobTag: true,
        },
      },
    },
  });

  const res: any = [];
  results.map((result) => {
    res.push({
      id: result.id,
      name:
        result.job.employer.user.salutation +
        result.job.employer.user.firstname +
        " " +
        result.job.employer.user.lastname,
      position: result.job.employer.position,
      organization: result.job.employer.organization,
      jobTag: result.job.jobTag.title,
      description: result.description.replace(/\n/g, ""),
    });
  });
  return res;
};

export default getReviews;

// const main = async () => {
//   const result = await getReviews();
//   console.log(result);
// };

// main();
