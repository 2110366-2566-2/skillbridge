import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface jobTagList {
  [key: string]: string;
}

async function main() {
  await prisma.job.deleteMany({});
  await prisma.jobTag.deleteMany({});
  await prisma.employer.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.user.deleteMany({});

  const jobTagEnum: string[] = [
    "กราฟิกดีไซน์",
    "สถาปัตย์",
    "ตกแต่งภายใน",
    "ศิลปะและภาพวาด",
    "ออกแบบ UX UI",
    "พัฒนาแอพฯมือถือ",
    "พัฒนาเว็ปไซต์",
    "ไอทีโซลูชั่น",
    "งาน IOT",
    "อินฟลูเอนเซอร์",
    "สื่อออนไลน์",
    "แอดมินออนไลน์",
    "ไลฟ์สไตล์",
    "พัฒนาตัวเอง",
    "ธุรกิจและการเงิน",
    "รูปภาพและวีดีโอ",
    "แต่งหน้า",
    "สไตลิสต์",
    "นักแสดง",
    "นักพากย์เสียง",
    "นักร้อง / นักดนตรี",
    "ซาวด์เอ็นจิเนียร์",
    "งานเขียน",
    "ภาษา",
    "อื่น ๆ",
  ];

  const jobTagList: jobTagList = {};

  for (let jobTagName of jobTagEnum) {
    const jobTag = await prisma.jobTag.create({
      data: { title: jobTagName },
    });
    jobTagList[jobTagName] = jobTag.id;
  }

  const s1 = await prisma.student.create({
    data: {
      resumeUrl:
        "https://i.pinimg.com/736x/87/91/53/87915397fcb2d0b04899cd90420f4acc.jpg",
      transcriptUrl:
        "https://www.greatschoolspartnership.org/wp-content/uploads/2022/02/GSP_Exemplar_Transcript_pg1_watermark.png",
      bankAccountNo: "0832705890",
      avgStar: 4.99,
      user: {
        create: {
          salutation: "นาย",
          firstname: "ศุภณัฐ",
          lastname: "ตั้งสินมั่นคง",
          hashedPassword: "thisishashespassword",
          email: "6430388021@student.chula.ac.th",
        },
      },
    },
  });

  const s2 = await prisma.student.create({
    data: {
      resumeUrl:
        "https://s3-us-west-2.amazonaws.com/hiration/ghost/2021/02/resume-meme-10.jpg",
      transcriptUrl:
        "https://admissionsandutme.com/wp-content/uploads/2020/12/sample-of-transcript-2.jpg",
      bankAccountNo: "0955195010",
      avgStar: 3.33,
      user: {
        create: {
          salutation: "นาย",
          firstname: "พิตตินันท์",
          lastname: "หาญสิงห์กุญช์",
          hashedPassword: "thisishashespassword",
          email: "6432115421@student.chula.ac.th",
        },
      },
    },
  });

  const s3 = await prisma.student.create({
    data: {
      resumeUrl: "https://cdn-images.zety.com/pages/resume_meme_2.png",
      transcriptUrl:
        "https://worldwidetranscripts.com/wp-content/uploads/2021/04/Transcripts-Sample-1-622x1024.jpg",
      bankAccountNo: "0876789125",
      avgStar: 4.69,
      user: {
        create: {
          salutation: "บัก",
          firstname: "นอร์ธ",
          lastname: "ข้นอีสาน",
          hashedPassword: "thisishashespassword",
          email: "6437820221@student.chula.ac.th",
        },
      },
    },
  });

  const e1 = await prisma.employer.create({
    data: {
      position: "Billionaire",
      organization: "SoeiCorp.",
      publicEmail: "ping888@yahoo.com",
      user: {
        create: {
          salutation: "เสี่ย",
          firstname: "ปิง",
          lastname: "บรูไน",
          hashedPassword: "thisishashespassword",
          email: "6435644121@student.chula.ac.th",
        },
      },
      jobs: {
        create: [
          {
            title: "เขียนเว็บให้ SoeiCorp.",
            status: "NOT_STARTED",
            description: "หาเงินจากทำงานออนไลน์ง่าย ๆ แค่เพียง 2-3 ชม.ต่อวัน",
            budget: 1000,
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-15"),
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-02-22"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "Renovate Soei888 Web",
            status: "IN_PROGRESS",
            description: "รวยทางลัดกับธุรกิจสีเทา",
            budget: 500,
            numWorker: 10,
            startDate: new Date("2023-08-08"),
            endDate: new Date("2023-08-31"),
            estimateStartDate: new Date("2023-09-15"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "เขียนเว็บให้ SoeiCorp.",
            status: "NOT_STARTED",
            description: "หาเงินจากทำงานออนไลน์ง่าย ๆ แค่เพียง 2-3 ชม.ต่อวัน",
            budget: 10000,
            numWorker: 2,
            startDate: new Date("2024-01-05"),
            endDate: new Date("2024-01-20"),
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-02-22"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          // Add more job objects as needed
        ],
      },
    },
  });

  const e2 = await prisma.employer.create({
    data: {
      position: "Rapper",
      organization: "Gold Element Temple",
      publicEmail: "TikTokTeenager@yahoo.com",
      user: {
        create: {
          salutation: "ยัง",
          firstname: "เฟย",
          lastname: "มาเท่อ",
          hashedPassword: "thisishashedpassword",
          email: "6437811521@student.chula.ac.th",
        },
      },
      jobs: {
        create: [
          {
            title: "ทำโมเดล AI Auto Tune",
            status: "COMPLETED",
            description: "เคยยืนรอเธอบนบีทีเอส",
            budget: 300,
            numWorker: 5,
            startDate: new Date("2022-07-14"),
            endDate: new Date("2022-07-31"),
            estimateStartDate: new Date("2022-08-01"),
            estimateEndDate: new Date("2022-10-31"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "ตัดต่อคลิปลง TikTok",
            status: "NOT_STARTED",
            description: "โอ้เบบี้เกิร์ลยูเรียนมาแตร์เดอี",
            budget: 20,
            numWorker: 30,
            startDate: new Date("2023-09-09"),
            endDate: new Date("2023-09-19"),
            estimateStartDate: new Date("2023-09-25"),
            estimateEndDate: new Date("2023-12-31"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
        ],
      },
    },
  });

  const e3 = await prisma.employer.create({
    data: {
      position: "Biker",
      organization: "BidKub",
      publicEmail: "TipBidder@gmail.com",
      user: {
        create: {
          salutation: "ศาสตราจารย์",
          firstname: "ทิพ",
          middlename: "สาม",
          lastname: "บิด",
          hashedPassword: "thisishashedpassword",
          email: "6432345221@student.chula.ac.th",
        },
      },
      jobs: {
        create: [
          {
            title: "เซนเซอร์ติดม่านกันแดดอัจฉริยะ",
            status: "NOT_STARTED",
            description:
              "แสงอาทิตย์ส่องมามันแยงตา แต่สายตาเธอที่ส่องมามันแยงใจ",
            budget: 1500,
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-02-16"),
            estimateStartDate: new Date("2024-02-20"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "เขียนเว็บ ChaoChao",
            status: "IN_PROGRESS",
            description: "ไม่รู้จะเช่าไหนดี มาเช่านี่มา",
            budget: 200,
            startDate: new Date("2024-01-08"),
            endDate: new Date("2024-01-20"),
            estimateStartDate: new Date("2024-01-21"),
            estimateEndDate: new Date("2024-04-30"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "Web Developer for เฮียหมู",
            status: "NOT_STARTED",
            description:
              "เฮียหมูเจ้าเก่าเจ้าเดิม เพิ่มเติมคือกำลังจะมีหน้าเว็บแล้ว",
            budget: 3000,
            numWorker: 4,
            startDate: new Date("2023-10-01"),
            endDate: new Date("2023-10-31"),
            estimateStartDate: new Date("2023-11-01"),
            estimateEndDate: new Date("2024-02-01"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "รสดีเด็ด อิซากายะ Frontend Developer",
            status: "NOT_STARTED",
            description: "Web-based application สำหรับจองคิวและโปรโมชั่น",
            budget: 2000,
            numWorker: 5,
            startDate: new Date("2024-01-27"),
            endDate: new Date("2024-02-29"),
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-05-31"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "Skip Backend Developer",
            status: "NOT_STARTED",
            description:
              "Web-based application สำหรับสั่งออเดอร์และเรียกเติมน้ำชาเขียวรีฟิล",
            budget: 1000,
            numWorker: 3,
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-02-29"),
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-04-30"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "เฮียหมู Data Analytics",
            status: "NOT_STARTED",
            description:
              "วิเคราะห์เมนูกับแกล้มยอดนิยมเทียบกับจำนวนเบียร์ที่ลูกค้าสั่งต่อโต๊ะ",
            budget: 4000,
            startDate: new Date("2024-02-05"),
            endDate: new Date("2024-02-15"),
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "Implement Recommendation Model on Application",
            status: "NOT_STARTED",
            description:
              "Develop a ML model to recommend their favorite beers to users.",
            budget: 10000,
            numWorker: 2,
            startDate: new Date("2024-01-27"),
            endDate: new Date("2024-02-10"),
            estimateStartDate: new Date("2024-02-17"),
            estimateEndDate: new Date("2024-04-16"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "Bad Guy Full-stack developer",
            status: "NOT_STARTED",
            description: "Develop Larb selling application for E-sarn People",
            budget: 20,
            startDate: new Date("2024-01-11"),
            endDate: new Date("2024-01-25"),
            estimateStartDate: new Date("2024-02-02"),
            estimateEndDate: new Date("2024-05-15"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
        ],
      },
    },
  });

  console.log({ s1, s2, s3, e1, e2, e3 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
