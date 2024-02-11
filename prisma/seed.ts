import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    prisma.job.deleteMany({}),
    prisma.employer.deleteMany({}),
    prisma.student.deleteMany({}),
    prisma.user.deleteMany({}),
  ]);

  const u1 = await prisma.user.upsert({
    where: { email: "6430388021@student.chula.ac.th" },
    update: {},
    create: {
      salutation: "นาย",
      firstname: "ศุภณัฐ",
      lastname: "ตั้งสินมั่นคง",
      Student: {
        create: {
          resumeUrl:
            "https://i.pinimg.com/736x/87/91/53/87915397fcb2d0b04899cd90420f4acc.jpg",
          transcriptUrl:
            "https://www.greatschoolspartnership.org/wp-content/uploads/2022/02/GSP_Exemplar_Transcript_pg1_watermark.png",
          bankAccountNo: "0832705890",
          avgStar: 4.99,
        },
      },
    },
  });

  const u2 = await prisma.user.upsert({
    where: { email: "6432115421@student.chula.ac.th" },
    update: {},
    create: {
      salutation: "นาย",
      firstname: "พิตตินันท์",
      lastname: "หาญสิงห์กุญช์",
      Student: {
        create: {
          resumeUrl:
            "https://s3-us-west-2.amazonaws.com/hiration/ghost/2021/02/resume-meme-10.jpg",
          transcriptUrl:
            "https://admissionsandutme.com/wp-content/uploads/2020/12/sample-of-transcript-2.jpg",
          bankAccountNo: "0955195010",
          avgStar: 3.33,
        },
      },
    },
  });

  const u3 = await prisma.user.upsert({
    where: { email: "6437820221@student.chula.ac.th" },
    update: {},
    create: {
      salutation: "บัก",
      firstname: "นอร์ธ",
      lastname: "ข้นอีสาน",
      Student: {
        create: {
          resumeUrl: "https://cdn-images.zety.com/pages/resume_meme_2.png",
          transcriptUrl:
            "https://worldwidetranscripts.com/wp-content/uploads/2021/04/Transcripts-Sample-1-622x1024.jpg",
          bankAccountNo: "0876789125",
          avgStar: 4.69,
        },
      },
    },
  });

  const u4 = await prisma.user.upsert({
    where: { email: "6435644121@student.chula.ac.th" },
    update: {},
    create: {
      salutation: "เสี่ย",
      firstname: "ปิง",
      lastname: "บรูไน",
      Employer: {
        create: {
          position: "Billionaire",
          organization: "SoeiCorp.",
          publicEmail: "ping888@yahoo.com",
        },
      },
      Job: {
        create: [
          {
            title: "เขียนเว็บให้ SoeiCorp.",
            status: "NOT_STARTED",
            description: "หาเงินจากทำงานออนไลน์ง่าย ๆ แค่เพียง 2-3 ชม.ต่อวัน",
            // jobTags: {
            //   create: ['web developer', 'front-end']
            // },
            budget: 1000,
            numWorker: 5,
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-15"),
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-02-22"),
          },
          {
            title: "Renovate Soei888 Web",
            status: "IN_PROGRESS",
            description: "รวยทางลัดกับธุรกิจสีเทา",
            // jobTags: {
            //   create: ['web developer', 'front-end', '888']
            // },
            budget: 500,
            numWorker: 10,
            startDate: new Date("2023-08-08"),
            endDate: new Date("2023-08-31"),
            estimateStartDate: new Date("2023-09-15"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: "เขียนเว็บให้ SoeiCorp.",
            status: "NOT_STARTED",
            description: "หาเงินจากทำงานออนไลน์ง่าย ๆ แค่เพียง 2-3 ชม.ต่อวัน",
            // jobTags: {
            //   create: ['web developer', 'front-end']
            // },
            budget: 10000,
            numWorker: 2,
            startDate: new Date("2024-01-05"),
            endDate: new Date("2024-01-20"),
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-02-22"),
          },
          {
            title: "เขียนบล็อกและ Tech-savvy Blogger",
            status: "NOT_STARTED",
            description:
              "Freelance writer ที่มี passion สำหรับเทคโนโลยีที่จะ ผลิต insightful \n \
และ well-researched blog articles. Topics รวมถึง the latest trends,\n \
บทวิจารณ์ผลิตภัณฑ์, และ ข้อมูลที่เกี่ยวข้องกับ industry.",
            // jobTags: {
            //   create: ['blog', 'writer']
            // },
            budget: 10000,
            numWorker: 3,
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-31"),
            estimateStartDate: new Date("2024-02-01"),
            estimateEndDate: new Date("2024-04-30"),
          },
          {
            title: "นักออกแบบกราฟิกและ Graphic Design Guru",
            status: "NOT_STARTED",
            description:
              "ต้องการ graphic designer ที่มีความสามารถสูงสำหรับ freelance projects, \n \
การสร้าง eye-catching visuals สำหรับ marketing materials, social media, \n \
และ การจัดแบรนด์. ต้องมี proficiency ใน Adobe Creative Suite และ a strong portfolio.",
            // jobTags: {
            //   create: ['graphic designer']
            // },
            budget: 5000,
            numWorker: 1,
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-11"),
            estimateStartDate: new Date("2024-01-16"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: "ผู้ป้อนข้อมูลและ Data Entry Dynamo",
            status: "NOT_STARTED",
            description:
              "Detail-oriented individual ที่จำเป็นสำหรับงานป้อนข้อมูล, \n \
รวมถึง data organization, การตรวจสอบ, และการวิเคราะห์ข้อมูล. \n \
Proficiency ใน Excel หรือ Google Sheets เป็น essential, \n \
และ a knack สำหรับความถูกต้อง.",
            budget: 10000,
            numWorker: 3,
            // jobTags: {
            //   create: ['data']
            // },
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-08"),
            estimateStartDate: new Date("2024-01-11"),
            estimateEndDate: new Date("2024-02-29"),
          },
          {
            title:
              "Social Media Content Manager / ผู้จัดการเนื้อหาโซเชียลมีเดีย",
            status: "NOT_STARTED",
            description:
              "Looking for a dynamic individual with ทักษะในการสร้าง \n \
engaging content สำหรับ social media platforms. \n \
Responsibilities include content creation, \n \
strategic planning, and performance analysis.",
            budget: 14000,
            numWorker: 2,
            // jobTags: {
            //   create: ['content mangager', 'social media']
            // },
            startDate: new Date("2024-01-15"),
            endDate: new Date("2024-01-21"),
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: "Data Analyst และผู้วิเคราะห์ข้อมูล",
            status: "NOT_STARTED",
            description:
              "Seeking a detail-oriented data analyst ที่สามารถ analyze data sets, \n \
generate insights, และ provide data-driven recommendations. \n \
จำเป็นต้องมี proficiency in data visualization tools.",
            budget: 20000,
            numWorker: 3,
            // jobTags: {
            //   create: ['data analyst']
            // },
            startDate: new Date("2024-01-10"),
            endDate: new Date("2024-01-15"),
            estimateStartDate: new Date("2024-01-16"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: "Data Analyst และผู้วิเคราะห์ข้อมูล",
            status: "NOT_STARTED",
            description:
              "Seeking a detail-oriented data analyst ที่สามารถ analyze data sets, \n \
generate insights, และ provide data-driven recommendations. \n \
จำเป็นต้องมี proficiency in data visualization tools.",
            budget: 20000,
            numWorker: 3,
            // jobTags: {
            //   create: ['data analyst']
            // },
            startDate: new Date("2024-01-11"),
            endDate: new Date("2024-01-15"),
            estimateStartDate: new Date("2024-01-16"),
            estimateEndDate: new Date("2024-03-31"),
          },
          // Add more job objects as needed
        ],
      },
    },
  });

  const u5 = await prisma.user.upsert({
    where: { email: "6437811521@student.chula.ac.th" },
    update: {},
    create: {
      salutation: "ยัง",
      firstname: "เฟย",
      lastname: "มาเท่อ",
      Employer: {
        create: {
          position: "Rapper",
          organization: "Gold Element Temple",
          publicEmail: "TikTokTeenager@yahoo.com",
        },
      },
      Job: {
        create: [
          {
            title: "ทำโมเดล AI Auto Tune",
            status: "COMPLETED",
            description: "เคยยืนรอเธอบนบีทีเอส",
            // jobTags: {
            //   create: ['data scientist', 'ai']
            // },
            budget: 3000,
            numWorker: 5,
            startDate: new Date("2022-07-14"),
            endDate: new Date("2022-07-31"),
            estimateStartDate: new Date("2022-08-01"),
            estimateEndDate: new Date("2022-10-31"),
          },
          {
            title: "ตัดต่อคลิปลง TikTok",
            status: "NOT_STARTED",
            description: "โอ้เบบี้เกิร์ลยูเรียนมาแตร์เดอี",
            // jobTags: {
            //   create: ['content creator', 'tiktok']
            // },
            budget: 200,
            numWorker: 30,
            startDate: new Date("2023-09-09"),
            endDate: new Date("2023-09-19"),
            estimateStartDate: new Date("2023-09-25"),
            estimateEndDate: new Date("2023-12-31"),
          },
          {
            title: "UX/UI Designer และผู้สร้างประสบการณ์ผู้ใช้",
            status: "NOT_STARTED",
            description:
              "Looking for a creative mind ที่มีความสามารถในการออกแบบ \n \
user-friendly interfaces และ optimize the user experience. \n \
Proficiency ใน design tools เป็น",
            budget: 2000,
            numWorker: 5,
            // jobTags: {
            //   create: ['ux/ui', 'front-end']
            // },
            startDate: new Date("2024-01-11"),
            endDate: new Date("2024-01-15"),
            estimateStartDate: new Date("2024-01-16"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: "Content Translator และผู้แปลเนื้อหา",
            status: "NOT_STARTED",
            description:
              "กำลังมองหา bilingual content translator ที่สามารถ translate content \n \
ในทั้งภาษาไทยและ English. Responsibilities รวมถึง \n \
การรักษาความถูกต้องทางภาษา และ adaptation ของเนื้อหา.",
            budget: 3000,
            numWorker: 5,
            // jobTags: {
            //   create: ['translator']
            // },
            startDate: new Date("2024-01-11"),
            endDate: new Date("2024-01-15"),
            estimateStartDate: new Date("2024-01-16"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: "ผู้เชี่ยวชาญด้านการดำเนินงาน E-commerce",
            status: "NOT_STARTED",
            description:
              "Seeking an expert in e-commerce operations ที่สามารถ \n \
manage order fulfillment, inventory และ coordinate \n \
with logistics partners. มีความรู้เกี่ยวกับการจัดการพื้นฐานของระบบ E-commerce.",
            budget: 5000,
            numWorker: 5,
            // jobTags: {
            //   create: ['e-commerce', 'business']
            // },
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-02-10"),
            estimateStartDate: new Date("2024-02-11"),
            estimateEndDate: new Date("2024-04-11"),
          },
          {
            title: "Financial Analyst และนักวิเคราะห์ทางการเงิน",
            status: "NOT_STARTED",
            description:
              "Looking for a financial analyst ที่สามารถ analyze financial data, \n \
prepare reports, และ provide insights for decision-making. \n \
ความเข้าใจในเรื่องของการเงินและการวิเคราะห์ทางการเงิน.",
            budget: 10000,
            numWorker: 3,
            // jobTags: {
            //   create: ['finance', 'business analyst']
            // },
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-02-10"),
            estimateStartDate: new Date("2024-02-11"),
            estimateEndDate: new Date("2024-04-11"),
          },
          {
            title: "นักวิจัยตลาดและ Market Researcher",
            status: "NOT_STARTED",
            description:
              "Seeking a market researcher ที่สามารถ conduct market analysis, \n \
gather insights, และ identify trends. \n \
Responsibilities รวมถึงการเขียนรายงานและการนำเสนอข้อมูลตลาด.",
            budget: 10000,
            numWorker: 3,
            // jobTags: {
            //   create: ['business analyst']
            // },
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-02-10"),
            estimateStartDate: new Date("2024-02-11"),
            estimateEndDate: new Date("2024-04-11"),
          },
          {
            title: "นักวิจัยตลาดและ Market Researcher",
            status: "NOT_STARTED",
            description:
              "Seeking a market researcher ที่สามารถ conduct market analysis, \n \
gather insights, และ identify trends. \n \
Responsibilities รวมถึงการเขียนรายงานและการนำเสนอข้อมูลตลาด.",
            budget: 8000,
            numWorker: 3,
            // jobTags: {
            //   create: ['business analyst']
            // },
            startDate: new Date("2024-02-02"),
            endDate: new Date("2024-02-10"),
            estimateStartDate: new Date("2024-02-11"),
            estimateEndDate: new Date("2024-04-11"),
          },
          // Add more job objects as needed
        ],
      },
    },
  });

  const u6 = await prisma.user.upsert({
    where: { email: "6432345221@student.chula.ac.th" },
    update: {},
    create: {
      salutation: "ศาสตราจารย์",
      firstname: "ทิพ",
      middlename: "สาม",
      lastname: "บิด",
      Employer: {
        create: {
          position: "Biker",
          organization: "BidKub",
          publicEmail: "TipBidder@gmail.com",
        },
      },
      Job: {
        create: [
          {
            title: "เซนเซอร์ติดม่านกันแดดอัจฉริยะ",
            status: "NOT_STARTED",
            description:
              "แสงอาทิตย์ส่องมามันแยงตา แต่สายตาเธอที่ส่องมามันแยงใจ",
            // jobTags: {
            //   create: ['iot']
            // },
            budget: 1500,
            numWorker: 3,
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-02-16"),
            estimateStartDate: new Date("2024-02-20"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: "เขียนเว็บ ChaoChao",
            status: "IN_PROGRESS",
            description: "ไม่รู้จะเช่าไหนดี มาเช่านี่มา",
            // jobTags: {
            //   create: ['web developer', 'front-end', 'ChaoChao']
            // },
            budget: 200,
            startDate: new Date("2024-01-08"),
            endDate: new Date("2024-01-20"),
            estimateStartDate: new Date("2024-01-21"),
            estimateEndDate: new Date("2024-04-30"),
          },
          {
            title: "Web Developer for เฮียหมู",
            status: "NOT_STARTED",
            description:
              "เฮียหมูเจ้าเก่าเจ้าเดิม เพิ่มเติมคือกำลังจะมีหน้าเว็บแล้ว",
            // jobTags: {
            //   create: ['web developer', 'front-end']
            // },
            budget: 3000,
            numWorker: 4,
            startDate: new Date("2023-10-01"),
            endDate: new Date("2023-10-31"),
            estimateStartDate: new Date("2023-11-01"),
            estimateEndDate: new Date("2024-02-01"),
          },
          {
            title: "รสดีเด็ด อิซากายะ Frontend Developer",
            status: "NOT_STARTED",
            description: "Web-based application สำหรับจองคิวและโปรโมชั่น",
            // jobTags: {
            //   create: ['front-end']
            // },
            budget: 2000,
            numWorker: 5,
            startDate: new Date("2024-01-27"),
            endDate: new Date("2024-02-29"),
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-05-31"),
          },
          {
            title: "Skip Backend Developer",
            status: "NOT_STARTED",
            description:
              "Web-based application สำหรับสั่งออเดอร์และเรียกเติมน้ำชาเขียวรีฟิล",
            budget: 1000,
            numWorker: 3,
            // jobTags: {
            //   create: ['back-end']
            // },
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-02-29"),
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-04-30"),
          },
          {
            title: "เฮียหมู Data Analytics",
            status: "NOT_STARTED",
            description:
              "วิเคราะห์เมนูกับแกล้มยอดนิยมเทียบกับจำนวนเบียร์ที่ลูกค้าสั่งต่อโต๊ะ",
            // jobTags: {
            //   create: ['data analytics']
            // },
            budget: 4000,
            startDate: new Date("2024-02-05"),
            endDate: new Date("2024-02-15"),
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: "Implement Recommendation Model on Application",
            status: "NOT_STARTED",
            description:
              "Develop a ML model to recommend their favorite beers to users.",
            budget: 10000,
            numWorker: 2,
            // jobTags: {
            //   create: ['ai', 'data science']
            // },
            startDate: new Date("2024-01-27"),
            endDate: new Date("2024-02-10"),
            estimateStartDate: new Date("2024-02-17"),
            estimateEndDate: new Date("2024-04-16"),
          },
          {
            title: "Bad Guy Full-stack developer",
            status: "NOT_STARTED",
            description: "Develop Larb selling application for E-sarn People",
            budget: 200,
            // jobTags: {
            //   create: ['front-end', 'back-end', 'full-stack']
            // },
            startDate: new Date("2024-01-11"),
            endDate: new Date("2024-01-25"),
            estimateStartDate: new Date("2024-02-02"),
            estimateEndDate: new Date("2024-05-15"),
          },
          {
            title: "นักสร้างเนื้อหาและ Content Curator",
            status: "NOT_STARTED",
            description:
              "Looking for a freelance creative mind with ทักษะในการสร้าง \n \
engaging และ เนื้อหาสร้างสรรค์สำหรับ social media platforms. \n \
ต้องมี a flair for storytelling และ a keen eye for visuals \n \
เพื่อที่จะ captivate audiences.",
            budget: 10000,
            numWorker: 5,
            // jobTags: {
            //   create: ['content creator']
            // },
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-31"),
            estimateStartDate: new Date("2024-02-01"),
            estimateEndDate: new Date("2024-04-30"),
          },
          {
            title: "เจ้าหน้าที่ช่วยส่วนตัวและ Virtual Assistant Extraordinaire",
            status: "NOT_STARTED",
            description:
              "Seeking บุคคลที่มี detail-oriented virtual assistant \n \
ที่สามารถ handle administrative tasks, จัดการปฏิทิน, \n \
และ ช่วยเสริมสร้าง ใน various projects. \n \
ทักษะการจัดระเบียบที่แข็งแกร่งและการสื่อสารที่เป็น must.",
            budget: 5000,
            numWorker: 2,
            // jobTags: {
            //   create: ['assistant']
            // },
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-31"),
            estimateStartDate: new Date("2024-02-01"),
            estimateEndDate: new Date("2024-04-30"),
          },
          {
            title: "Creative Video Producer และโปรดิวเซอร์วิดีโอ",
            status: "NOT_STARTED",
            description:
              "Looking for a creative video producer ที่มีความสามารถในการสร้างและ \n \
produce compelling video content. Proficiency ใน \n \
video editing tools เป็น",
            budget: 7000,
            numWorker: 3,
            // jobTags: {
            //   create: ['content creator', 'producer']
            // },
            startDate: new Date("2024-01-14"),
            endDate: new Date("2024-01-21"),
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-03-11"),
          },
          {
            title: "HR Coordinator และผู้ประสานงานทรัพยากรบุคคล",
            status: "NOT_STARTED",
            description:
              "Seeking an HR coordinator ที่สามารถ assist with \n \
recruitment, employee onboarding, และ HR processes. \n \
ความเข้าใจในกฎหมายแรงงานและนโยบาย HR.",
            budget: 8000,
            numWorker: 2,
            // jobTags: {
            //   create: ['hr']
            // },
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-31"),
            estimateStartDate: new Date("2024-02-01"),
            estimateEndDate: new Date("2024-04-30"),
          },
          {
            title: "Tech Support Specialist และผู้ช่วยเหลือทางเทคนอล็อค",
            status: "NOT_STARTED",
            description:
              "Looking for a tech support specialist ที่สามารถ provide technical \n \
assistance to end-users, troubleshoot issues, และ ให้คำแนะนำในการแก้ไขปัญหาทางเทคนิค. \n \
Strong communication skills และ customer service mindset จำเป็น.",
            budget: 10000,
            numWorker: 4,
            // jobTags: {
            //   create: ['tech support']
            // },
            startDate: new Date("2024-01-21"),
            endDate: new Date("2024-01-31"),
            estimateStartDate: new Date("2024-02-01"),
            estimateEndDate: new Date("2024-03-11"),
          },

          // Add more job objects as needed
        ],
      },
    },
  });

  console.log({ u1, u2, u3, u4, u5, u6 });
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
