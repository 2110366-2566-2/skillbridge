import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface jobTagList {
  [key: string]: string;
}

async function main() {

  await prisma.review.deleteMany({})
  await prisma.application.deleteMany({})
  await prisma.job.deleteMany({})
  await prisma.jobTag.deleteMany({})
  await prisma.employer.deleteMany({})
  await prisma.student.deleteMany({})
  await prisma.user.deleteMany({})

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

  const u1 = await prisma.user.upsert({
    where: { email: "6430388021@student.chula.ac.th" },
    update: {},
    create: {
      salutation: "นาย",
      firstname: "ศุภณัฐ",
      lastname: "ตั้งสินมั่นคง",
      hashedPassword: "thisishashespassword",
      email: "6430388021@student.chula.ac.th",
      student: {
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
      hashedPassword: "thisishashespassword",
      email: "6432115421@student.chula.ac.th",
      student: {
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
      hashedPassword: "thisishashespassword",
      email: "6437820221@student.chula.ac.th",
      student: {
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
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-02-22"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
            applications: {
              create: [
                {
                  userId: s1.userId,
                  bid: 1200,
                  documentUrl: 'https://programmerhumor.io/wp-content/uploads/2022/07/programmerhumor-io-frontend-memes-programming-memes-c0e265eaf665a17.png',
                }, 
                {
                  userId: s2.userId,
                  bid: 800,
                  documentUrl: 'https://global.discourse-cdn.com/standard14/uploads/daml/optimized/2X/0/07c87a4e2885ff7d9674efb218e08a5d354612f6_2_500x500.jpeg'
                }
              ]
            }
          },

          {
            title: "Renovate Soei888 Web",
            status: "IN_PROGRESS",
            description: "รวยทางลัดกับธุรกิจสีเทา",
            budget: 500,
            numWorker: 10,
            startDate: new Date("2023-09-21"),
            estimateStartDate: new Date("2023-09-15"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
            applications: {
              create: [
                {
                  userId: s1.userId,
                  bid: 600,
                  documentUrl: 'https://programmerhumor.io/wp-content/uploads/2022/07/programmerhumor-io-frontend-memes-programming-memes-c0e265eaf665a17.png',
                  status: 'ACCEPTED'
                }, 
                {
                  userId: s3.userId,
                  bid: 500,
                  documentUrl: 'https://miro.medium.com/v2/resize:fit:679/0*SkoybD8Dp8CLnAtH',
                  status: 'ACCEPTED'
                }
              ]
            }
          },

          {
            title: "เขียนเว็บให้ SoeiCorp.",
            status: "NOT_STARTED",
            description: "หาเงินจากทำงานออนไลน์ง่าย ๆ แค่เพียง 2-3 ชม.ต่อวัน",
            budget: 10000,
            numWorker: 2,
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-02-22"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
            applications: {
              create: [
                {
                  userId: s2.userId,
                  bid: 10000,
                  documentUrl: 'https://programmerhumor.io/wp-content/uploads/2022/07/programmerhumor-io-frontend-memes-programming-memes-c0e265eaf665a17.png',
                },
              ]
            }
          },

          {
            title: 'เขียนบล็อกและ Tech-savvy Blogger',
            status: 'COMPLETED',
            description: 'Freelance writer ที่มี passion สำหรับเทคโนโลยีที่จะ ผลิต insightful \n \
และ well-researched blog articles. Topics รวมถึง the latest trends,\n \
บทวิจารณ์ผลิตภัณฑ์, และ ข้อมูลที่เกี่ยวข้องกับ industry.",
            budget: 10000,
            numWorker: 3,
            estimateStartDate: new Date("2024-02-01"),
            estimateEndDate: new Date("2024-04-30"),
            jobTagId: jobTagList["งานเขียน"],
            applications: {
              create: [
                {
                  userId: s3.userId,
                  bid: 10000,
                  documentUrl: 'https://miro.medium.com/v2/resize:fit:679/0*SkoybD8Dp8CLnAtH',
                  status: 'ACCEPTED'
                }, 
                {
                  userId: s2.userId,
                  bid: 15000,
                  documentUrl: 'https://programmerhumor.io/wp-content/uploads/2022/07/programmerhumor-io-frontend-memes-programming-memes-c0e265eaf665a17.png',
                  status: 'REJECTED'
                }, 
                {
                  userId: s1.userId,
                  bid: 8000,
                  documentUrl: 'https://global.discourse-cdn.com/standard14/uploads/daml/optimized/2X/0/07c87a4e2885ff7d9674efb218e08a5d354612f6_2_500x500.jpeg',
                  status: 'ACCEPTED'
                }
              ]
            },
            reviews: {
              create: [
                {
                  studentId: s1.userId,
                  stars: 4,
                  description: 'งานดีมาก! นิสิตทำได้ดีจริง ๆ'
                },
                {
                  studentId: s3.userId,
                  stars: 5,
                  description: 'Fantastic Nisit, Exceeded Expectations!'
                }
              ]
            }
          },

          {
            title: 'นักออกแบบกราฟิกและ Graphic Design Guru',
            status: 'COMPLETED',
            description: 'ต้องการ graphic designer ที่มีความสามารถสูงสำหรับ freelance projects, \n \
การสร้าง eye-catching visuals สำหรับ marketing materials, social media, \n \
และ การจัดแบรนด์. ต้องมี proficiency ใน Adobe Creative Suite และ a strong portfolio.",
            budget: 5000,
            numWorker: 1,
            estimateStartDate: new Date("2024-01-16"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["กราฟิกดีไซน์"],
            applications: {
              create: [
                {
                  userId: s1.userId,
                  bid: 6000,
                  documentUrl: 'https://global.discourse-cdn.com/standard14/uploads/daml/optimized/2X/0/07c87a4e2885ff7d9674efb218e08a5d354612f6_2_500x500.jpeg',
                  status: 'REJECTED'
                },
                {
                  userId: s2.userId,
                  bid: 5000,
                  documentUrl: 'https://programmerhumor.io/wp-content/uploads/2022/07/programmerhumor-io-frontend-memes-programming-memes-c0e265eaf665a17.png',
                  status: 'ACCEPTED'
                },
                {
                  userId: s3.userId,
                  bid: 5000,
                  documentUrl: 'https://miro.medium.com/v2/resize:fit:679/0*SkoybD8Dp8CLnAtH',
                  status: 'REJECTED'
                }, 
              ]
            },
            reviews: {
              create: [
                {
                  studentId: s2.userId,
                  stars: 5,
                  description: 'มีความสุขที่ได้ร่วมงานกับนิสิตที่มีความสามารถสูงในโปรเจกต์ล่าสุดนี้ ประสบการณ์นี้ไม่ได้แค่ดี ๆ แต่ยังเป็นที่ประทับใจจริง ๆ \n \
บุคคลนี้แสดงให้เห็นถึงความเข้าใจที่ยอดเยี่ยมในงานที่กำลังดำเนินอยู่ การทำงานที่นำมานี้ไม่เพียงแต่มีคุณภาพสูง \n \
แต่ยังสำเร็จลงมือทำล่วงหน้ากว่ากำหนดเสมอ ความรอบคอบในรายละเอียดและความสามารถในการแก้ไขปัญหาจริง ๆ ทำให้เขาเด่นชัดเจน'
                }
              ]
            }
          },

          {
            title: "ผู้ป้อนข้อมูลและ Data Entry Dynamo",
            status: "NOT_STARTED",
            description:
              "Detail-oriented individual ที่จำเป็นสำหรับงานป้อนข้อมูล, \n \
รวมถึง data organization, การตรวจสอบ, และการวิเคราะห์ข้อมูล. \n \
Proficiency ใน Excel หรือ Google Sheets เป็น essential, \n \
และ a knack สำหรับความถูกต้อง.",
            budget: 4000,
            numWorker: 1,
            estimateStartDate: new Date("2024-01-11"),
            estimateEndDate: new Date("2024-02-29"),
            jobTagId: jobTagList["ไอทีโซลูชั่น"],
            applications: {
              create: [
                {
                  userId: s3.userId,
                  bid: 5000,
                  documentUrl: 'https://miro.medium.com/v2/resize:fit:679/0*SkoybD8Dp8CLnAtH',
                }, 
              ]
            },
          },

          {
            title:
              "Social Media Content Manager / ผู้จัดการเนื้อหาโซเชียลมีเดีย",
            status: "NOT_STARTED",
            description:
              "Looking for a dynamic individual with ทักษะในการสร้าง \n \
engaging content สำหรับ social media platforms. Responsibilities include \n \
content creation, strategic planning, and performance analysis.",
            budget: 14000,
            numWorker: 2,
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["สื่อออนไลน์"],
            applications: {
              create: [
                {
                  userId: s1.userId,
                  bid: 10000,
                  documentUrl: 'https://global.discourse-cdn.com/standard14/uploads/daml/optimized/2X/0/07c87a4e2885ff7d9674efb218e08a5d354612f6_2_500x500.jpeg',
                  status: 'ACCEPTED'
                },
                {
                  userId: s3.userId,
                  bid: 12000,
                  documentUrl: 'https://miro.medium.com/v2/resize:fit:679/0*SkoybD8Dp8CLnAtH',
                  status: 'ACCEPTED'
                }, 
              ]
            },
            reviews: {
              create: [
                {
                  studentId: s1.userId,
                  stars: 3,
                  description: 'การแสดงความคิดเป็นระเบียบและความสามารถในการแก้ไขปัญหาของเขาเป็นสิ่งที่ควรชมเชย การทำงานที่ส่งมอบละเมิดตามระเบียบเสมอ\n \
ความมุ่งมั่นและความสามารถในการจัดการงานที่น่าชื่นชม ทำให้เขาเป็นส่วนหนึ่งที่สำคัญในทีมของเรา'
                },
                {
                  studentId: s3.userId,
                  stars: 4,
                  description: 'การทำงานกับนิสิตคนนี้เป็นความสุขแท้ ๆ ความสามารถทางวิชาการของเขาแสดงอย่างชัดเจนในวิธีที่เขาใกล้ชิดกับโปรเจกต์\n \
สิ่งที่โดดเด่นที่สุดคือการสื่อสารที่ชัดเจนและรับผิดชอบในการทำงาน นี้สร้างสภาพแวดล้อมที่เป็นสมมติและความสามารถในการปรับตัวตามสถานการณ์ที่น่าประทับใจ'
                }
              ]
            }
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
            estimateStartDate: new Date("2024-01-16"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["ไอทีโซลูชั่น"],
            applications: {
              create: [
                {
                  userId: s1.userId,
                  bid: 18000,
                  documentUrl: 'https://global.discourse-cdn.com/standard14/uploads/daml/optimized/2X/0/07c87a4e2885ff7d9674efb218e08a5d354612f6_2_500x500.jpeg',
                },
                {
                  userId: s2.userId,
                  bid: 17000,
                  documentUrl: 'https://programmerhumor.io/wp-content/uploads/2022/07/programmerhumor-io-frontend-memes-programming-memes-c0e265eaf665a17.png',
                },
              ]
            },
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
            estimateStartDate: new Date("2024-01-16"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["ไอทีโซลูชั่น"],
            applications: {
              create: [
                {
                  userId: s2.userId,
                  bid: 20000,
                  documentUrl: 'https://programmerhumor.io/wp-content/uploads/2022/07/programmerhumor-io-frontend-memes-programming-memes-c0e265eaf665a17.png',
                },
                {
                  userId: s3.userId,
                  bid: 22000,
                  documentUrl: 'https://miro.medium.com/v2/resize:fit:679/0*SkoybD8Dp8CLnAtH',
                }, 
              ]
            },
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
            budget: 3000,
            numWorker: 5,
            startDate: new Date("2022-08-01"),
            endDate: new Date("2022-11-07"),
            estimateStartDate: new Date("2022-08-01"),
            estimateEndDate: new Date("2022-10-31"),
            jobTagId: jobTagList["ไอทีโซลูชั่น"],
          },
          {
            title: "ตัดต่อคลิปลง TikTok",
            status: "NOT_STARTED",
            description: "โอ้เบบี้เกิร์ลยูเรียนมาแตร์เดอี",
            budget: 2000,
            numWorker: 3,
            estimateStartDate: new Date("2023-09-25"),
            estimateEndDate: new Date("2023-12-31"),
            jobTagId: jobTagList["สื่อออนไลน์"],
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
            estimateStartDate: new Date("2024-01-16"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["ออกแบบ UX UI"],
          },
          {
            title: "Content Translator และผู้แปลเนื้อหา",
            status: "NOT_STARTED",
            description:
              "กำลังมองหา bilingual content translator ที่สามารถ translate content \n \
ในทั้งภาษาไทยและ English. Responsibilities รวมถึงการรักษาความถูกต้องทางภาษา และ adaptation ของเนื้อหา.",
            budget: 3000,
            numWorker: 5,
            estimateStartDate: new Date("2024-01-16"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["ภาษา"],
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
            estimateStartDate: new Date("2024-02-11"),
            estimateEndDate: new Date("2024-04-11"),
            jobTagId: jobTagList["ธุรกิจและการเงิน"],
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
            estimateStartDate: new Date("2024-02-11"),
            estimateEndDate: new Date("2024-04-11"),
            jobTagId: jobTagList["ธุรกิจและการเงิน"],
          },
          {
            title: "นักวิจัยตลาดและ Market Researcher",
            status: "NOT_STARTED",
            description:
              "Seeking a market researcher ที่สามารถ conduct market analysis, \n \
gather insights, และ identify trends. Responsibilities รวมถึงการเขียนรายงานและการนำเสนอข้อมูลตลาด.",
            budget: 10000,
            numWorker: 3,
            estimateStartDate: new Date("2024-02-11"),
            estimateEndDate: new Date("2024-04-11"),
            jobTagId: jobTagList["ธุรกิจและการเงิน"],
          },
          {
            title: "นักวิจัยตลาดและ Market Researcher",
            status: "NOT_STARTED",
            description:
              "Seeking a market researcher ที่สามารถ conduct market analysis, \n \
gather insights, และ identify trends. Responsibilities รวมถึงการเขียนรายงานและการนำเสนอข้อมูลตลาด.",
            budget: 10000,
            numWorker: 3,
            estimateStartDate: new Date("2024-02-11"),
            estimateEndDate: new Date("2024-04-11"),
            jobTagId: jobTagList["ธุรกิจและการเงิน"],
          },
          // Add more job objects as needed
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
            estimateStartDate: new Date("2024-02-20"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["งาน IOT"],
          },
          {
            title: "เขียนเว็บ ChaoChao",
            status: "IN_PROGRESS",
            description: "ไม่รู้จะเช่าไหนดี มาเช่านี่มา",
            budget: 200,
            startDate: new Date("2024-01-24"),
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
            estimateStartDate: new Date("2023-11-01"),
            estimateEndDate: new Date("2024-02-01"),
            jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
          },
          {
            title: "รสดีเด็ด อิซากายะ Frontend Developer",
            status: "NOT_STARTED",
            description: "Application สำหรับจองคิวและโปรโมชั่น",
            budget: 2000,
            numWorker: 5,
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-05-31"),
            jobTagId: jobTagList["พัฒนาแอพฯมือถือ"],
          },
          {
            title: "Skip Backend Developer",
            status: "NOT_STARTED",
            description:
              "Application สำหรับสั่งออเดอร์และเรียกเติมน้ำชาเขียวรีฟิล",
            budget: 1000,
            numWorker: 3,
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-04-30"),
            jobTagId: jobTagList["พัฒนาแอพฯมือถือ"],
          },
          {
            title: "เฮียหมู Data Analytics",
            status: "NOT_STARTED",
            description:
              "วิเคราะห์เมนูกับแกล้มยอดนิยมเทียบกับจำนวนเบียร์ที่ลูกค้าสั่งต่อโต๊ะ",
            budget: 4000,
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-03-31"),
            jobTagId: jobTagList["ไอทีโซลูชั่น"],
          },
          {
            title: "Implement Recommendation Model on Application",
            status: "NOT_STARTED",
            description:
              "Develop a ML model to recommend their favorite beers to users.",
            budget: 10000,
            numWorker: 2,
            estimateStartDate: new Date("2024-02-17"),
            estimateEndDate: new Date("2024-04-16"),
            jobTagId: jobTagList["ไอทีโซลูชั่น"],
          },
          {
            title: "Bad Guy Full-stack developer",
            status: "NOT_STARTED",
            description: "Develop Larb selling application for E-sarn People",
            budget: 2000,
            estimateStartDate: new Date("2024-02-02"),
            estimateEndDate: new Date("2024-05-15"),
            jobTagId: jobTagList["พัฒนาแอพฯมือถือ"],
          },
          {
            title: "นักสร้างเนื้อหาและ Content Curator",
            status: "NOT_STARTED",
            description:
              "Looking for a freelance creative mind with ทักษะในการสร้าง \n \
engaging และ เนื้อหาสร้างสรรค์สำหรับ social media platforms. \n \
ต้องมี a flair for storytelling และ a keen eye for visuals เพื่อที่จะ captivate audiences.",
            budget: 10000,
            numWorker: 5,
            estimateStartDate: new Date("2024-02-01"),
            estimateEndDate: new Date("2024-04-30"),
            jobTagId: jobTagList["สื่อออนไลน์"],
          },
          {
            title: "เจ้าหน้าที่ช่วยส่วนตัวและ Virtual Assistant Extraordinaire",
            status: "NOT_STARTED",
            description:
              "Seeking บุคคลที่มี detail-oriented virtual assistant \n \
ที่สามารถ handle administrative tasks, จัดการปฏิทิน, และ ช่วยเสริมสร้าง ใน various projects. \n \
ทักษะการจัดระเบียบที่แข็งแกร่งและการสื่อสารที่เป็น",
            budget: 5000,
            numWorker: 2,
            estimateStartDate: new Date("2024-02-01"),
            estimateEndDate: new Date("2024-04-30"),
            jobTagId: jobTagList["อื่น ๆ"],
          },
          {
            title: "Creative Video Producer และโปรดิวเซอร์วิดีโอ",
            status: "NOT_STARTED",
            description:
              "Looking for a creative video producer ที่มีความสามารถในการสร้างและ \n \
produce compelling video content. Proficiency ใน video editing tools เป็น",
            budget: 7000,
            numWorker: 3,
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-03-11"),
            jobTagId: jobTagList["รูปภาพและวีดีโอ"],
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
            estimateStartDate: new Date("2024-02-01"),
            estimateEndDate: new Date("2024-04-30"),
            jobTagId: jobTagList["อื่น ๆ"],
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
            estimateStartDate: new Date("2024-02-01"),
            estimateEndDate: new Date("2024-03-11"),
            jobTagId: jobTagList["ไอทีโซลูชั่น"],
          },
          // Add more job objects as needed
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
