import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface jobTagList {
  [key: string]: string;
}

async function main() {
  await prisma.message.deleteMany({});
  await prisma.chatroom.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.transactionDetail.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.applicationDocumentFile.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.jobDocumentFile.deleteMany({});
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
      resumeName:
        "88f437c42c7f5afba8fa123429481395ad074647f85936c08e564e2dc7b1194f",
      transcriptName:
        "jobFiles/5203e15c4ab04df8e6884ea4d8952215f5c6bc82a92f4bb8206c0ffe703e38c3",
      bankAccountNo: "0832705890",
      description: 
        "พร้อมบุก ผมเนี่ยโคตรจะพร้อมสุด\n\
        โคตรจะร้อนสุด ยังไม่พร้อมหยุด\n\
        ไฟในปากก็พร้อมจุด\n\
        ร้อนสุด ร้อนงาน ร้อนเงิน\n\
        ร้อนหนัก ร้อนเกิน ก็ดันเป็นคนที่มีหนี้\n\
        อยากจะนั่ง แต่ต้องพร้อมเดินอย่ามาฉุด\n\
        ผมจะพากย์เรือยาวจากวันจันทร์ถึงวันศุกร์\n\
        ไม่มีวันหยุด ไม่มีวันหลุด\n\
        ตั้งใจทำงานเจตนาบริสุทธิ์\n\
        ไม่สะดุด ไม่ใช่ 18 มงกุฎ เชื่อเหอะ\n\
        จ้างเลย โคตรจะว่างเลย โคตรจะคลั่งเลย\n\
        ถ้าพี่ไม่จ้างตอนนี้ ผมก็จะกลับไปขายให้หมดทั้งบ้านเลย\n\
        ให้มันว่างเลย ให้เป็นซากเลย ให้ทั้งหมดกลายป็นลานกว้างเลย\n\
        พี่ จ้างเลย จ้างเลย",
      user: {
        create: {
          salutation: "นาย",
          firstname: "ศุภณัฐ",
          lastname: "ตั้งสินมั่นคง",
          hashedPassword:
            "$2b$10$ne2h7B8VKefPwSeDDPRQ.O3WbeYkOMufwFRa44TCB1i.iOkXPGV4W",
          email: "6430388021@student.chula.ac.th",
        },
      },
    },
  });

  const s2 = await prisma.student.create({
    data: {
      resumeName:
        "b84cc78e6b3263366d6c85f435dfb48460df6b5fe27dad14ee60c215806e0f3e",
      transcriptName:
        "cffc7481c0abacc579ae6035dac9e63b199a6128d13da736dba9454bfaf59db3",
      bankAccountNo: "0955195010",
      description: 
        "ทุกวัน ทุกวัน เห็นเขารีบออกไป แต่งตัวทันสมัย ขับรถซิ่ง\n\
        อือฮื้อ อาฮ้า เทวดาฟ้าดิน กุ๊กกิ๊ก ดุ๊กดิ๊ก สะดิ้งมาเต็มคัน\n\
        ชาวบ้านยืนมอง แล้วอดใจไม่ไหว เอ่ยถามขึ้นทันใด ว่าไอ้หนุ่มเอ้ย\n\
        \n\
        มึงเป็นใคร?\n\
        กูเป็นนักศึกษา นักล่าปริญญา ใฝ่ฝันขึ้นไปเป็นใหญ่\n\
        \n\
        แล้วยังไง?\n\
        กูจะรวยน่ะสิว่ะ ความรู้กูแน่นหนา กูจะมาเป็นนายมึง",
      user: {
        create: {
          salutation: "นาย",
          firstname: "นักศึกษา",
          lastname: "นักล่าปริญญา",
          hashedPassword:
            "$2b$10$ne2h7B8VKefPwSeDDPRQ.O3WbeYkOMufwFRa44TCB1i.iOkXPGV4W",
          email: "student@student.chula.ac.th",
        },
      },
    },
  });

  const s3 = await prisma.student.create({
    data: {
      resumeName: "47a50ef3fcb16268eaea70cb38d73998a5e8a247fcede360704e10e5baa4da7d",
      transcriptName:
        "jobFiles/5203e15c4ab04df8e6884ea4d8952215f5c6bc82a92f4bb8206c0ffe703e38c3",
      bankAccountNo: "0876789125",
      description: 
        "พี่จ้างเหอะ ผมเนี่ยเล่นมาตั้งแต่เด็ก\n\
        อยู่ในห้องนั่งท่อง ลิ้นพันเสียงก้อง\n\
        เดี๋ยวก็ ซูเพล็กส์ เดี๋ยวก็ ดูเร็กซ์\n\
        ทำอย่างงั้นสลับคำ กูเผ็ด ภูเก็ต จบที่ คูเว็ด\n\
        พากย์เรือเนี่ยมันเป็นความหวัง\n\
        ผมทำจะทำตามฝัน ผมจะไม่ทำให้ผิดหวัง\n\
        โอ๊ย เอ้ย เอ้ย เป็นไร แป๊ปนึงนะครับพี่\n\
        พ่นไวไป ลิ้นติดไฟ ไฟมันลุก (โอ้โห)\n\
        พูดไวไป ลิ้นติดไฟ ไฟมันชุก (เช็ดเข้)\n\
        พล่ามไวไป ลิ้นนี่ชิ่งเหมือนกับสนุ๊ก\n\
        ปัง ปัง เตรียมถังดับเพลิงมา 1 ชุด\n\
        ไฟมันลุก ไฟมันคุก มันจะคุก คุกคาม\n\
        พ่นไวไป ลิ้นติดไฟ ไฟมันลุก\n\
        พูดไวไป ลิ้นติดไฟ ไฟมันชุกโชน\n\
        พล่ามไวไป ลิ้นนี่ชิ่งเหมือนกับสนุ๊กเลย",
      user: {
        create: {
          salutation: "บัก",
          firstname: "นอร์ธ",
          lastname: "ข้นอีสาน",
          hashedPassword:
            "$2b$10$ne2h7B8VKefPwSeDDPRQ.O3WbeYkOMufwFRa44TCB1i.iOkXPGV4W",
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
          hashedPassword:
            "$2b$10$ne2h7B8VKefPwSeDDPRQ.O3WbeYkOMufwFRa44TCB1i.iOkXPGV4W",
          email: "ping888@yahoo.com",
        },
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
          hashedPassword:
            "$2b$10$ne2h7B8VKefPwSeDDPRQ.O3WbeYkOMufwFRa44TCB1i.iOkXPGV4W",
          email: "TikTokTeenager@yahoo.com",
        },
      },
    },
  });

  const e3 = await prisma.employer.create({
    data: {
      position: "Billionaire",
      organization: "SoeiCorp.",
      publicEmail: "employer@employer.com",
      user: {
        create: {
          salutation: "เดอะ",
          firstname: "ลีซาน",
          lastname: "อัลไกอีบ",
          hashedPassword:
            "$2b$10$ne2h7B8VKefPwSeDDPRQ.O3WbeYkOMufwFRa44TCB1i.iOkXPGV4W",
          email: "employer@employer.com",
        },
      },
    },
  });

  const j1 = await prisma.job.create({
    data: {
      employerId: e1.userId,
      title: "เขียนเว็บให้ SoeiCorp.",
      status: "NOT_STARTED",
      description: "หาเงินจากทำงานออนไลน์ง่าย ๆ แค่เพียง 2-3 ชม.ต่อวัน",
      budget: 1000,
      estimateStartDate: new Date("2024-01-22"),
      estimateEndDate: new Date("2024-02-22"),
      jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
    },
  });

  const j2 = await prisma.job.create({
    data: {
      employerId: e1.userId,
      title: "Renovate Soei888 Web",
      status: "IN_PROGRESS",
      description: "รวยทางลัดกับธุรกิจสีเทา",
      budget: 500,
      numWorker: 10,
      estimateStartDate: new Date("2023-09-15"),
      estimateEndDate: new Date("2024-03-31"),
      jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
    },
  });

  const j3 = await prisma.job.create({
    data: {
      employerId: e1.userId,
      title: "เขียนเว็บให้ SoeiCorp.",
      status: "NOT_STARTED",
      description: "หาเงินจากทำงานออนไลน์ง่าย ๆ แค่เพียง 2-3 ชม.ต่อวัน",
      budget: 10000,
      numWorker: 2,
      estimateStartDate: new Date("2024-01-22"),
      estimateEndDate: new Date("2024-02-22"),
      jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
    },
  });

  const j4 = await prisma.job.create({
    data: {
      employerId: e1.userId,
      title: "เขียนบล็อกและ Tech-savvy Blogger",
      status: "COMPLETED",
      description:
        "Freelance writer ที่มี passion สำหรับเทคโนโลยีที่จะ ผลิต insightful \n \
และ well-researched blog articles. Topics รวมถึง the latest trends,\n \
บทวิจารณ์ผลิตภัณฑ์, และ ข้อมูลที่เกี่ยวข้องกับ industry.",
      budget: 10000,
      numWorker: 3,
      estimateStartDate: new Date("2024-02-01"),
      estimateEndDate: new Date("2024-04-30"),
      jobTagId: jobTagList["งานเขียน"],
    },
  });

  const j5 = await prisma.job.create({
    data: {
      employerId: e1.userId,
      title: "นักออกแบบกราฟิกและ Graphic Design Guru",
      status: "COMPLETED",
      description:
        "ต้องการ graphic designer ที่มีความสามารถสูงสำหรับ freelance projects, \n \
การสร้าง eye-catching visuals สำหรับ marketing materials, social media, \n \
และ การจัดแบรนด์. ต้องมี proficiency ใน Adobe Creative Suite และ a strong portfolio.",
      budget: 5000,
      numWorker: 1,
      estimateStartDate: new Date("2024-01-16"),
      estimateEndDate: new Date("2024-03-31"),
      jobTagId: jobTagList["กราฟิกดีไซน์"],
    },
  });

  const j6 = await prisma.job.create({
    data: {
      employerId: e1.userId,
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
    },
  });

  const j7 = await prisma.job.create({
    data: {
      employerId: e1.userId,
      title: "Social Media Content Manager / ผู้จัดการเนื้อหาโซเชียลมีเดีย",
      status: "COMPLETED",
      description:
        "Looking for a dynamic individual with ทักษะในการสร้าง \n \
engaging content สำหรับ social media platforms. Responsibilities include \n \
content creation, strategic planning, and performance analysis.",
      budget: 14000,
      numWorker: 2,
      estimateStartDate: new Date("2024-01-22"),
      estimateEndDate: new Date("2024-03-31"),
      jobTagId: jobTagList["สื่อออนไลน์"],
    },
  });

  const j8 = await prisma.job.create({
    data: {
      employerId: e1.userId,
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
    },
  });

  const j9 = await prisma.job.create({
    data: {
      employerId: e1.userId,
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
    },
  });

  const j10 = await prisma.job.create({
    data: {
      employerId: e2.userId,
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
  });

  const j11 = await prisma.job.create({
    data: {
      employerId: e2.userId,
      title: "ตัดต่อคลิปลง TikTok",
      status: "IN_PROGRESS",
      description: "โอ้เบบี้เกิร์ลยูเรียนมาแตร์เดอี",
      budget: 2000,
      numWorker: 3,
      estimateStartDate: new Date("2023-09-25"),
      estimateEndDate: new Date("2023-12-31"),
      jobTagId: jobTagList["สื่อออนไลน์"],
    },
  });

  const j12 = await prisma.job.create({
    data: {
      employerId: e2.userId,
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
  });

  const j13 = await prisma.job.create({
    data: {
      employerId: e2.userId,
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
  });

  const j14 = await prisma.job.create({
    data: {
      employerId: e2.userId,
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
  });

  const j15 = await prisma.job.create({
    data: {
      employerId: e2.userId,
      title: "Financial Analyst และนักวิเคราะห์ทางการเงิน",
      status: "COMPLETED",
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
  });

  const j16 = await prisma.job.create({
    data: {
      employerId: e2.userId,
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
  });

  const j17 = await prisma.job.create({
    data: {
      employerId: e2.userId,
      title: "นักวิจัยตลาดและ Market Researcher",
      status: "IN_PROGRESS",
      description:
        "Seeking a market researcher ที่สามารถ conduct market analysis, \n \
  gather insights, และ identify trends. Responsibilities รวมถึงการเขียนรายงานและการนำเสนอข้อมูลตลาด.",
      budget: 10000,
      numWorker: 3,
      estimateStartDate: new Date("2024-02-11"),
      estimateEndDate: new Date("2024-04-11"),
      jobTagId: jobTagList["ธุรกิจและการเงิน"],
    },
  });

  const j18 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "เซนเซอร์ติดม่านกันแดดอัจฉริยะ",
      status: "NOT_STARTED",
      description: "แสงอาทิตย์ส่องมามันแยงตา แต่สายตาเธอที่ส่องมามันแยงใจ",
      budget: 1500,
      estimateStartDate: new Date("2024-02-20"),
      estimateEndDate: new Date("2024-03-31"),
      jobTagId: jobTagList["งาน IOT"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "bc365d05811ff88fb22536dc7a402c65156425ecb15fd6874c0bf5941b6b5a68",
          },
          {
            fileName:
              "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
          },
        ],
      },
    },
  });

  const j19 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "เขียนเว็บ ChaoChao",
      status: "IN_PROGRESS",
      description: "ไม่รู้จะเช่าไหนดี มาเช่านี่มา",
      budget: 2000,
      startDate: new Date("2024-01-24"),
      estimateStartDate: new Date("2024-01-21"),
      estimateEndDate: new Date("2024-04-30"),
      jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
          },
          {
            fileName:
              "1a1acabecbabd48c9e3d0020729753a526c8bb4921d39d41781ff1e1d44c11ef",
          },
        ],
      },
    },
  });

  const j20 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "Web Developer for เฮียหมู",
      status: "NOT_STARTED",
      description: "เฮียหมูเจ้าเก่าเจ้าเดิม เพิ่มเติมคือกำลังจะมีหน้าเว็บแล้ว",
      budget: 3000,
      numWorker: 4,
      estimateStartDate: new Date("2023-11-01"),
      estimateEndDate: new Date("2024-02-01"),
      jobTagId: jobTagList["พัฒนาเว็ปไซต์"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
          },
          {
            fileName:
              "3f28b41dc9d034dadf6fb7784fcc5ec6b1cbc40ab0bc8aab7280e7726ab46609",
          },
        ],
      },
    },
  });

  const j21 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "รสดีเด็ด อิซากายะ Frontend Developer",
      status: "COMPLETED",
      description: "Application สำหรับจองคิวและโปรโมชั่น",
      budget: 2000,
      numWorker: 5,
      estimateStartDate: new Date("2024-03-01"),
      estimateEndDate: new Date("2024-05-31"),
      jobTagId: jobTagList["พัฒนาแอพฯมือถือ"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "1a1acabecbabd48c9e3d0020729753a526c8bb4921d39d41781ff1e1d44c11ef",
          },
        ],
      },
    },
  });

  const j22 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "Skip Backend Developer",
      status: "NOT_STARTED",
      description: "Application สำหรับสั่งออเดอร์และเรียกเติมน้ำชาเขียวรีฟิล",
      budget: 1000,
      numWorker: 3,
      estimateStartDate: new Date("2024-03-01"),
      estimateEndDate: new Date("2024-04-30"),
      jobTagId: jobTagList["พัฒนาแอพฯมือถือ"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "3f28b41dc9d034dadf6fb7784fcc5ec6b1cbc40ab0bc8aab7280e7726ab46609",
          },
        ],
      },
    },
  });

  const j23 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "เฮียหมู Data Analytics",
      status: "NOT_STARTED",
      description:
        "วิเคราะห์เมนูกับแกล้มยอดนิยมเทียบกับจำนวนเบียร์ที่ลูกค้าสั่งต่อโต๊ะ",
      budget: 4000,
      estimateStartDate: new Date("2024-03-01"),
      estimateEndDate: new Date("2024-03-31"),
      jobTagId: jobTagList["ไอทีโซลูชั่น"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
          },
          {
            fileName:
              "1a1acabecbabd48c9e3d0020729753a526c8bb4921d39d41781ff1e1d44c11ef",
          },
        ],
      },
    },
  });

  const j24 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "Implement Recommendation Model on Application",
      status: "NOT_STARTED",
      description:
        "Develop a ML model to recommend their favorite beers to users.",
      budget: 10000,
      estimateStartDate: new Date("2024-02-17"),
      estimateEndDate: new Date("2024-04-16"),
      jobTagId: jobTagList["ไอทีโซลูชั่น"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
          },
        ],
      },
    },
  });

  const j25 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "Bad Guy Full-stack developer",
      status: "COMPLETED",
      description: "Develop Larb selling application for E-sarn People",
      budget: 2000,
      numWorker: 2,
      estimateStartDate: new Date("2024-02-02"),
      estimateEndDate: new Date("2024-05-15"),
      jobTagId: jobTagList["พัฒนาแอพฯมือถือ"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "bc365d05811ff88fb22536dc7a402c65156425ecb15fd6874c0bf5941b6b5a68",
          },
          {
            fileName:
              "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
          },
        ],
      },
    },
  });

  const j26 = await prisma.job.create({
    data: {
      employerId: e3.userId,
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
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
          },
        ],
      },
    },
  });

  const j27 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "เจ้าหน้าที่ช่วยส่วนตัวและ Virtual Assistant Extraordinaire",
      status: "IN_PROGRESS",
      description:
        "Seeking บุคคลที่มี detail-oriented virtual assistant \n \
  ที่สามารถ handle administrative tasks, จัดการปฏิทิน, และ ช่วยเสริมสร้าง ใน various projects. \n \
  ทักษะการจัดระเบียบที่แข็งแกร่งและการสื่อสารที่เป็น",
      budget: 5000,
      numWorker: 5,
      estimateStartDate: new Date("2024-02-01"),
      estimateEndDate: new Date("2024-04-30"),
      jobTagId: jobTagList["อื่น ๆ"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "bc365d05811ff88fb22536dc7a402c65156425ecb15fd6874c0bf5941b6b5a68",
          },
          {
            fileName:
              "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
          },
        ],
      },
    },
  });

  const j28 = await prisma.job.create({
    data: {
      employerId: e3.userId,
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
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
          },
          {
            fileName:
              "8b21380cf45f3eb2b8fddb8ad1d9404f2c51bb9c0989efe69ac4906e92df009e",
          },
        ],
      },
    },
  });

  const j29 = await prisma.job.create({
    data: {
      employerId: e3.userId,
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
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "3f28b41dc9d034dadf6fb7784fcc5ec6b1cbc40ab0bc8aab7280e7726ab46609",
          },
          {
            fileName:
              "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
          },
        ],
      },
    },
  });

  const j30 = await prisma.job.create({
    data: {
      employerId: e3.userId,
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
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "3f28b41dc9d034dadf6fb7784fcc5ec6b1cbc40ab0bc8aab7280e7726ab46609",
          },
        ],
      },
    },
  });

  const j31 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "Pokemon Trainer",
      status: "NOT_STARTED",
      description: "Gotta catch 'em all!",
      budget: 15000,
      numWorker: 4,
      estimateStartDate: new Date("2024-04-11"),
      estimateEndDate: new Date("2024-07-31"),
      jobTagId: jobTagList["ไลฟ์สไตล์"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "3f28b41dc9d034dadf6fb7784fcc5ec6b1cbc40ab0bc8aab7280e7726ab46609",
          },
        ],
      },
    },
  });

  const j32 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "Legendary Badminton Player",
      status: "NOT_STARTED",
      description: "Strike them in the face (with badminton)",
      budget: 7000,
      numWorker: 2,
      estimateStartDate: new Date("2024-04-11"),
      estimateEndDate: new Date("2024-07-31"),
      jobTagId: jobTagList["แต่งหน้า"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "bde37d8cb3947552b65d82e5355a30090ec3c361722034d5b53615b5dbc3cb46",
          },
        ],
      },
    },
  });

  const j33 = await prisma.job.create({
    data: {
      employerId: e3.userId,
      title: "Legendary ROV Player",
      status: "NOT_STARTED",
      description: "Recruit for the team: Me & 4 stupids",
      budget: 2000,
      numWorker: 4,
      estimateStartDate: new Date("2024-05-12"),
      estimateEndDate: new Date("2024-06-31"),
      jobTagId: jobTagList["พัฒนาตัวเอง"],
      jobDocumentFiles: {
        create: [
          {
            fileName:
              "8b21380cf45f3eb2b8fddb8ad1d9404f2c51bb9c0989efe69ac4906e92df009e",
          },
        ],
      },
    },
  });

  const a1 = await prisma.application.create({
    data: {
      jobId: j1.id,
      userId: s1.userId,
      bid: 1200,
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "8b21380cf45f3eb2b8fddb8ad1d9404f2c51bb9c0989efe69ac4906e92df009e",
          },
          {
            fileName:
              "bde37d8cb3947552b65d82e5355a30090ec3c361722034d5b53615b5dbc3cb46",
          },
        ],
      },
    },
  });

  const a2 = await prisma.application.create({
    data: {
      jobId: j1.id,
      userId: s2.userId,
      bid: 800,
      status: "ACCEPTED",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "bc365d05811ff88fb22536dc7a402c65156425ecb15fd6874c0bf5941b6b5a68",
          },
        ],
      },
    },
  });

  const a3 = await prisma.application.create({
    data: {
      jobId: j2.id,
      userId: s1.userId,
      bid: 600,
      status: "DEPOSIT_PENDING",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "8b21380cf45f3eb2b8fddb8ad1d9404f2c51bb9c0989efe69ac4906e92df009e",
          },
        ],
      },
    },
  });

  const a4 = await prisma.application.create({
    data: {
      jobId: j2.id,
      userId: s3.userId,
      bid: 500,
      status: "IN_PROGRESS",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "bde37d8cb3947552b65d82e5355a30090ec3c361722034d5b53615b5dbc3cb46",
          },
        ],
      },
    },
  });

  const a5 = await prisma.application.create({
    data: {
      jobId: j3.id,
      userId: s2.userId,
      bid: 10000,
      status: "ACCEPTED",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
          },
          {
            fileName:
              "bde37d8cb3947552b65d82e5355a30090ec3c361722034d5b53615b5dbc3cb46",
          },
        ],
      },
    },
  });

  const a6 = await prisma.application.create({
    data: {
      jobId: j4.id,
      userId: s3.userId,
      bid: 10000,
      status: "DONE",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
          },
          {
            fileName:
              "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
          },
        ],
      },
    },
  });

  const a7 = await prisma.application.create({
    data: {
      jobId: j4.id,
      userId: s2.userId,
      bid: 15000,
      status: "WAGE_PAYMENT_PENDING",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
          },
          {
            fileName:
              "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
          },
        ],
      },
    },
  });

  const a8 = await prisma.application.create({
    data: {
      jobId: j4.id,
      userId: s1.userId,
      bid: 8000,
      status: "DONE",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
          },
        ],
      },
    },
  });

  const a9 = await prisma.application.create({
    data: {
      jobId: j5.id,
      userId: s1.userId,
      bid: 6000,
      status: "REJECTED",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
          },
          {
            fileName:
              "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
          },
        ],
      },
    },
  });

  const a10 = await prisma.application.create({
    data: {
      jobId: j5.id,
      userId: s2.userId,
      bid: 5000,
      status: "DONE",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
          },
        ],
      },
    },
  });

  const a11 = await prisma.application.create({
    data: {
      jobId: j5.id,
      userId: s3.userId,
      bid: 5000,
      status: "CANCELED",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "8b21380cf45f3eb2b8fddb8ad1d9404f2c51bb9c0989efe69ac4906e92df009e",
          },
        ],
      },
    },
  });

  const a12 = await prisma.application.create({
    data: {
      jobId: j6.id,
      userId: s3.userId,
      bid: 5000,
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "3f28b41dc9d034dadf6fb7784fcc5ec6b1cbc40ab0bc8aab7280e7726ab46609",
          },
        ],
      },
    },
  });

  const a13 = await prisma.application.create({
    data: {
      jobId: j7.id,
      userId: s1.userId,
      bid: 10000,
      status: "DONE",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "3f28b41dc9d034dadf6fb7784fcc5ec6b1cbc40ab0bc8aab7280e7726ab46609",
          },
          {
            fileName:
              "bc365d05811ff88fb22536dc7a402c65156425ecb15fd6874c0bf5941b6b5a68",
          },
        ],
      },
    },
  });

  const a14 = await prisma.application.create({
    data: {
      jobId: j7.id,
      userId: s3.userId,
      bid: 12000,
      status: "DONE",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
          },
          {
            fileName:
              "bde37d8cb3947552b65d82e5355a30090ec3c361722034d5b53615b5dbc3cb46",
          },
        ],
      },
    },
  });

  const a15 = await prisma.application.create({
    data: {
      jobId: j8.id,
      userId: s1.userId,
      bid: 18000,
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "bde37d8cb3947552b65d82e5355a30090ec3c361722034d5b53615b5dbc3cb46",
          },
        ],
      },
    },
  });

  const a16 = await prisma.application.create({
    data: {
      jobId: j8.id,
      userId: s2.userId,
      bid: 17000,
      status: "REJECTED",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "24467125aeb077e4cdf8705d08e6e0ed5f4e7c303cb1656f3b9afe46f7346644",
          },
          {
            fileName:
              "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
          },
        ],
      },
    },
  });

  const a17 = await prisma.application.create({
    data: {
      jobId: j9.id,
      userId: s2.userId,
      bid: 20000,
      status: "REJECTED",
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "24467125aeb077e4cdf8705d08e6e0ed5f4e7c303cb1656f3b9afe46f7346644",
          },
        ],
      },
    },
  });

  const a18 = await prisma.application.create({
    data: {
      jobId: j9.id,
      userId: s3.userId,
      bid: 22000,
      applicationDocumentFiles: {
        create: [
          {
            fileName:
              "8b21380cf45f3eb2b8fddb8ad1d9404f2c51bb9c0989efe69ac4906e92df009e",
          },
        ],
      },
    },
  });

  const a19 = await prisma.application.create({
    data: {
      jobId: j10.id,
      userId: s1.userId,
      bid: 3000,
      status: "DONE",
    },
  });

  const a20 = await prisma.application.create({
    data: {
      jobId: j10.id,
      userId: s3.userId,
      bid: 2000,
      status: "CANCELED",
    },
  });

  const a21 = await prisma.application.create({
    data: {
      jobId: j11.id,
      userId: s2.userId,
      bid: 3000,
      status: "DELIVERED",
    },
  });

  const a215 = await prisma.application.create({
    data: {
      jobId: j11.id,
      userId: s1.userId,
      bid: 3300,
      status: "DISCLAIMED",
    },
  });

  const a22 = await prisma.application.create({
    data: {
      jobId: j11.id,
      userId: s3.userId,
      bid: 2000,
    },
  });

  const a23 = await prisma.application.create({
    data: {
      jobId: j12.id,
      userId: s1.userId,
      bid: 3000,
    },
  });

  const a24 = await prisma.application.create({
    data: {
      jobId: j13.id,
      userId: s3.userId,
      bid: 2000,
      status: "DEPOSIT_PENDING",
    },
  });

  const a25 = await prisma.application.create({
    data: {
      jobId: j14.id,
      userId: s2.userId,
      bid: 5000,
      status: "DEPOSIT_PENDING",
    },
  });

  const a26 = await prisma.application.create({
    data: {
      jobId: j14.id,
      userId: s3.userId,
      bid: 5500,
      status: "CANCELED",
    },
  });

  const a27 = await prisma.application.create({
    data: {
      jobId: j15.id,
      userId: s1.userId,
      bid: 10000,
      status: "DONE",
    },
  });

  const a28 = await prisma.application.create({
    data: {
      jobId: j15.id,
      userId: s2.userId,
      bid: 12000,
      status: "WAGE_PAYMENT_PENDING",
    },
  });

  const a29 = await prisma.application.create({
    data: {
      jobId: j15.id,
      userId: s3.userId,
      bid: 9000,
      status: "DONE",
    },
  });

  const a30 = await prisma.application.create({
    data: {
      jobId: j16.id,
      userId: s1.userId,
      bid: 9000,
      status: "CANCELED",
    },
  });

  const a31 = await prisma.application.create({
    data: {
      jobId: j16.id,
      userId: s2.userId,
      bid: 11500,
      status: "DEPOSIT_PENDING",
    },
  });

  const a32 = await prisma.application.create({
    data: {
      jobId: j17.id,
      userId: s2.userId,
      bid: 10000,
      status: "DISCLAIMED",
    },
  });

  const a33 = await prisma.application.create({
    data: {
      jobId: j17.id,
      userId: s3.userId,
      bid: 12000,
      status: "WAGE_PAYMENT_PENDING",
    },
  });

  const a34 = await prisma.application.create({
    data: {
      jobId: j18.id,
      userId: s1.userId,
      bid: 1200,
    },
  });

  const a35 = await prisma.application.create({
    data: {
      jobId: j18.id,
      userId: s3.userId,
      bid: 2000,
    },
  });

  const a36 = await prisma.application.create({
    data: {
      jobId: j19.id,
      userId: s1.userId,
      bid: 1200,
      status: "WAGE_PAYMENT_PENDING",
    },
  });

  const a37 = await prisma.application.create({
    data: {
      jobId: j19.id,
      userId: s2.userId,
      bid: 2000,
      status: "IN_PROGRESS",
    },
  });

  const a38 = await prisma.application.create({
    data: {
      jobId: j20.id,
      userId: s2.userId,
      bid: 3300,
      status: "DEPOSIT_PENDING",
    },
  });

  const a39 = await prisma.application.create({
    data: {
      jobId: j20.id,
      userId: s3.userId,
      bid: 2000,
      status: "DEPOSIT_PENDING",
    },
  });

  const a40 = await prisma.application.create({
    data: {
      jobId: j21.id,
      userId: s1.userId,
      bid: 2200,
      status: "DONE",
    },
  });

  const a41 = await prisma.application.create({
    data: {
      jobId: j21.id,
      userId: s2.userId,
      bid: 2000,
      status: "DONE",
    },
  });

  const a42 = await prisma.application.create({
    data: {
      jobId: j22.id,
      userId: s3.userId,
      bid: 2000,
      status: "CANCELED",
    },
  });

  const a43 = await prisma.application.create({
    data: {
      jobId: j23.id,
      userId: s1.userId,
      bid: 4000,
    },
  });

  const a44 = await prisma.application.create({
    data: {
      jobId: j23.id,
      userId: s2.userId,
      bid: 5000,
      status: "CANCELED",
    },
  });

  const a45 = await prisma.application.create({
    data: {
      jobId: j23.id,
      userId: s3.userId,
      bid: 4400,
      status: "REJECTED",
    },
  });

  const a46 = await prisma.application.create({
    data: {
      jobId: j24.id,
      userId: s1.userId,
      bid: 10000,
    },
  });

  const a47 = await prisma.application.create({
    data: {
      jobId: j24.id,
      userId: s2.userId,
      bid: 11000,
      status: "DEPOSIT_PENDING",
    },
  });

  const a48 = await prisma.application.create({
    data: {
      jobId: j24.id,
      userId: s3.userId,
      bid: 9900,
      status: "CANCELED",
    },
  });

  const a49 = await prisma.application.create({
    data: {
      jobId: j25.id,
      userId: s1.userId,
      bid: 2000,
      status: "REJECTED",
    },
  });

  const a50 = await prisma.application.create({
    data: {
      jobId: j25.id,
      userId: s3.userId,
      bid: 3000,
      status: "DONE",
    },
  });

  const a51 = await prisma.application.create({
    data: {
      jobId: j25.id,
      userId: s2.userId,
      bid: 2000,
      status: "DONE",
    },
  });

  const a52 = await prisma.application.create({
    data: {
      jobId: j26.id,
      userId: s1.userId,
      bid: 10000,
    },
  });

  const a53 = await prisma.application.create({
    data: {
      jobId: j26.id,
      userId: s2.userId,
      bid: 12000,
      status: "REJECTED",
    },
  });

  const a54 = await prisma.application.create({
    data: {
      jobId: j27.id,
      userId: s1.userId,
      bid: 5000,
      status: "IN_PROGRESS",
    },
  });

  const a55 = await prisma.application.create({
    data: {
      jobId: j27.id,
      userId: s2.userId,
      bid: 6000,
      status: "DELIVERED",
    },
  });

  const a56 = await prisma.application.create({
    data: {
      jobId: j27.id,
      userId: s3.userId,
      bid: 5500,
      status: "WAGE_PAYMENT_PENDING",
    },
  });

  const r1 = await prisma.review.create({
    data: {
      jobId: j4.id,
      studentId: s1.userId,
      stars: 4,
      description: "งานดีมาก! นิสิตทำได้ดีจริง ๆ",
    },
  });

  const r2 = await prisma.review.create({
    data: {
      jobId: j4.id,
      studentId: s3.userId,
      stars: 5,
      description: "Fantastic Nisit, Exceeded Expectations!",
    },
  });

  const r3 = await prisma.review.create({
    data: {
      jobId: j5.id,
      studentId: s2.userId,
      stars: 5,
      description:
        "มีความสุขที่ได้ร่วมงานกับนิสิตที่มีความสามารถสูงในโปรเจกต์ล่าสุดนี้ ประสบการณ์นี้ไม่ได้แค่ดี ๆ แต่ยังเป็นที่ประทับใจจริง ๆ \n \
บุคคลนี้แสดงให้เห็นถึงความเข้าใจที่ยอดเยี่ยมในงานที่กำลังดำเนินอยู่ การทำงานที่นำมานี้ไม่เพียงแต่มีคุณภาพสูง \n \
แต่ยังสำเร็จลงมือทำล่วงหน้ากว่ากำหนดเสมอ ความรอบคอบในรายละเอียดและความสามารถในการแก้ไขปัญหาจริง ๆ ทำให้เขาเด่นชัดเจน",
    },
  });

  const r4 = await prisma.review.create({
    data: {
      jobId: j7.id,
      studentId: s1.userId,
      stars: 3,
      description:
        "การแสดงความคิดเป็นระเบียบและความสามารถในการแก้ไขปัญหาของเขาเป็นสิ่งที่ควรชมเชย การทำงานที่ส่งมอบละเมิดตามระเบียบเสมอ\n \
ความมุ่งมั่นและความสามารถในการจัดการงานที่น่าชื่นชม ทำให้เขาเป็นส่วนหนึ่งที่สำคัญในทีมของเรา",
    },
  });

  const r5 = await prisma.review.create({
    data: {
      jobId: j7.id,
      studentId: s3.userId,
      stars: 4,
      description:
        "การทำงานกับนิสิตคนนี้เป็นความสุขแท้ ๆ ความสามารถทางวิชาการของเขาแสดงอย่างชัดเจนในวิธีที่เขาใกล้ชิดกับโปรเจกต์\n \
สิ่งที่โดดเด่นที่สุดคือการสื่อสารที่ชัดเจนและรับผิดชอบในการทำงาน นี้สร้างสภาพแวดล้อมที่เป็นสมมติและความสามารถในการปรับตัวตามสถานการณ์ที่น่าประทับใจ",
    },
  });

  const r6 = await prisma.review.create({
    data: {
      jobId: j10.id,
      studentId: s1.userId,
      stars: 5,
      description:
        "การทำงานกับนิสิตในโปรเจกต์นี้เป็นที่ประทับใจมาก ไม่เพียงแต่ทักษะทางวิชาการที่น่าทึ่งแต่ยังสามารถสื่อสารและทำงานร่วมกับทีมได้อย่างไร้ปัญหา\n\
ความเข้าใจในภารกิจและการเสนอแนะที่มีประโยชน์ทำให้เขาเป็นส่วนที่สำคัญของทีมที่ดีขึ้น",
    },
  });

  const r7 = await prisma.review.create({
    data: {
      jobId: j15.id,
      studentId: s1.userId,
      stars: 4,
      description:
        "นิสิตคนนี้มีความสามารถในการจัดการงานและสามารถปฏิบัติงานตามที่ได้รับมอบหมายได้อย่างมีประสิทธิภาพ\n\
ความรวดเร็วในการตอบสนองและสามารถทำงานภารกิจที่ซับซ้อนอย่างมีประสิทธิภาพ การมีสมาธิในการปรับตัวตามสถานการณ์ได้ดีเยี่ยม",
    },
  });

  const r8 = await prisma.review.create({
    data: {
      jobId: j15.id,
      studentId: s3.userId,
      stars: 5,
      description:
        "ไม่สามารถพูดถึงความพึงพอใจต่อการทำงานกับนิสิตคนนี้ออกมาได้หมด การแสดงความคิดเป็นระเบียบ\n\
และความสามารถในการแก้ไขปัญหาของเขาเป็นสิ่งที่ควรชมเชย การทำงานที่ส่งมอบละเมิดตามระเบียบเสมอ\n\
ความมุ่งมั่นและความสามารถในการจัดการงานที่น่าชื่นชม ทำให้เขาเป็นส่วนหนึ่งที่สำคัญในทีมของเรา",
    },
  });

  const r9 = await prisma.review.create({
    data: {
      jobId: j21.id,
      studentId: s1.userId,
      stars: 4,
      description:
        "I am genuinely impressed with the collaborative spirit and problem-solving abilities of this nisit.\n\
Their academic prowess shines through in every aspect of the project. The ease with which they communicated \n\
and took responsibility for their work created an environment that was not only productive but also enjoyable.",
    },
  });

  const r10 = await prisma.review.create({
    data: {
      jobId: j21.id,
      studentId: s2.userId,
      stars: 5,
      description:
        "Working with this nisit has been a truly enlightening experience.\n\
Their academic proficiency is evident in the exceptional way they approached and executed tasks within the project.\n\
The standout quality was their impeccable attention to detail and problem-solving capabilities,\n\
distinguishing them as a standout contributor.",
    },
  });

  const r11 = await prisma.review.create({
    data: {
      jobId: j25.id,
      studentId: s2.userId,
      stars: 5,
      description:
        "Working with this nisit has been a pleasure from start to finish. Their efficient task management skills \n\
and ability to fulfill assignments were noteworthy. Their work ethic and adaptability to different phases of the project\n\
ensured a smooth and successful collaboration.",
    },
  });

  const r12 = await prisma.review.create({
    data: {
      jobId: j25.id,
      studentId: s3.userId,
      stars: 4,
      description:
        "This nisit brought a level of creativity and innovation that greatly enhanced the project. \n\
Their ability to think outside the box and present solutions was truly commendable. The final deliverables reflected a unique \n\
and fresh perspective, exceeding our expectations.",
    },
  });

  const t1 = await prisma.transaction.create({
    data: {
      jobId: j2.id,
      studentId: s3.userId,
      employerUserId: e1.userId,
      amount: 250,
      isDeposit: true,
      createdAt: new Date("2023-09-11T22:15:03"),
      receiptImageName:
        "8b21380cf45f3eb2b8fddb8ad1d9404f2c51bb9c0989efe69ac4906e92df009e",
    },
  });

  const t111 = await prisma.transaction.create({
    data: {
      jobId: j4.id,
      studentId: s1.userId,
      employerUserId: e1.userId,
      amount: 4000,
      status: "ACCEPTED",
      isDeposit: true,
      receiptImageName:
        "8b21380cf45f3eb2b8fddb8ad1d9404f2c51bb9c0989efe69ac4906e92df009e",
    },
  });

  const t112 = await prisma.transaction.create({
    data: {
      jobId: j4.id,
      studentId: s1.userId,
      employerUserId: e1.userId,
      amount: 4000,
      status: "ACCEPTED",
      isDeposit: false,
      receiptImageName:
        "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
    },
  });

  const t2 = await prisma.transaction.create({
    data: {
      jobId: j4.id,
      studentId: s2.userId,
      employerUserId: e1.userId,
      amount: 7500,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2022-02-08T17:40:00"),
      receiptImageName:
        "bde37d8cb3947552b65d82e5355a30090ec3c361722034d5b53615b5dbc3cb46",
    },
  });

  const t3 = await prisma.transaction.create({
    data: {
      jobId: j4.id,
      studentId: s3.userId,
      employerUserId: e1.userId,
      amount: 5000,
      status: "REJECTED",
      isDeposit: true,
      createdAt: new Date("2022-04-15T09:25:00"),
      receiptImageName:
        "bde37d8cb3947552b65d82e5355a30090ec3c361722034d5b53615b5dbc3cb46",
    },
  });

  const t4 = await prisma.transaction.create({
    data: {
      jobId: j4.id,
      studentId: s3.userId,
      employerUserId: e1.userId,
      amount: 5000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2022-06-20T14:10:00"),
      receiptImageName:
        "bc365d05811ff88fb22536dc7a402c65156425ecb15fd6874c0bf5941b6b5a68",
    },
  });

  const t5 = await prisma.transaction.create({
    data: {
      jobId: j4.id,
      studentId: s3.userId,
      employerUserId: e1.userId,
      amount: 5000,
      status: "ACCEPTED",
      isDeposit: false,
      receiptImageName:
        "8b21380cf45f3eb2b8fddb8ad1d9404f2c51bb9c0989efe69ac4906e92df009e",
    },
  });

  const t6 = await prisma.transaction.create({
    data: {
      jobId: j5.id,
      studentId: s2.userId,
      employerUserId: e1.userId,
      amount: 2500,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2022-09-02T11:55:00"),
      receiptImageName:
        "bc365d05811ff88fb22536dc7a402c65156425ecb15fd6874c0bf5941b6b5a68",
    },
  });

  const t7 = await prisma.transaction.create({
    data: {
      jobId: j5.id,
      studentId: s2.userId,
      employerUserId: e1.userId,
      amount: 2500,
      status: "ACCEPTED",
      isDeposit: false,
      createdAt: new Date("2022-10-28T08:30:00"),
      receiptImageName:
        "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
    },
  });

  const t8 = await prisma.transaction.create({
    data: {
      jobId: j7.id,
      studentId: s1.userId,
      employerUserId: e1.userId,
      amount: 5000,
      status: "REJECTED",
      isDeposit: true,
      createdAt: new Date("2023-01-12T16:20:00"),
      receiptImageName:
        "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
    },
  });

  const t9 = await prisma.transaction.create({
    data: {
      jobId: j7.id,
      studentId: s1.userId,
      employerUserId: e1.userId,
      amount: 5000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2023-03-08T10:45:00"),
      receiptImageName:
        "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
    },
  });

  const t10 = await prisma.transaction.create({
    data: {
      jobId: j7.id,
      studentId: s1.userId,
      employerUserId: e1.userId,
      amount: 5000,
      isDeposit: false,
      createdAt: new Date("2023-05-19T13:35:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t11 = await prisma.transaction.create({
    data: {
      jobId: j7.id,
      studentId: s3.userId,
      employerUserId: e1.userId,
      amount: 6000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2023-07-24T09:10:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t12 = await prisma.transaction.create({
    data: {
      jobId: j7.id,
      studentId: s3.userId,
      employerUserId: e1.userId,
      amount: 6000,
      status: "ACCEPTED",
      isDeposit: false,
      createdAt: new Date("2023-10-05T15:00:00"),
      receiptImageName:
        "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
    },
  });

  const t13 = await prisma.transaction.create({
    data: {
      jobId: j10.id,
      studentId: s1.userId,
      employerUserId: e2.userId,
      amount: 1500,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2023-11-29T12:20:00"),
      receiptImageName:
        "1a1acabecbabd48c9e3d0020729753a526c8bb4921d39d41781ff1e1d44c11ef",
    },
  });

  const t14 = await prisma.transaction.create({
    data: {
      jobId: j10.id,
      studentId: s1.userId,
      employerUserId: e2.userId,
      amount: 1500,
      status: "REJECTED",
      isDeposit: false,
      createdAt: new Date("2024-02-07T08:50:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t142 = await prisma.transaction.create({
    data: {
      jobId: j11.id,
      studentId: s1.userId,
      employerUserId: e2.userId,
      amount: 1500,
      status: "REJECTED",
      isDeposit: false,
      createdAt: new Date("2024-02-07T08:50:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t144 = await prisma.transaction.create({
    data: {
      jobId: j11.id,
      studentId: s1.userId,
      employerUserId: e2.userId,
      amount: 1500,
      status: "ACCEPTED",
      isDeposit: false,
      createdAt: new Date("2024-02-07T09:10:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t147 = await prisma.transaction.create({
    data: {
      jobId: j11.id,
      studentId: s2.userId,
      employerUserId: e2.userId,
      amount: 1650,
      status: "ACCEPTED",
      isDeposit: false,
      createdAt: new Date("2024-02-07T08:50:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t15 = await prisma.transaction.create({
    data: {
      jobId: j15.id,
      studentId: s1.userId,
      employerUserId: e2.userId,
      amount: 5000,
      status: "REJECTED",
      isDeposit: true,
      createdAt: new Date("2022-02-10T14:15:00"),
      receiptImageName:
        "24467125aeb077e4cdf8705d08e6e0ed5f4e7c303cb1656f3b9afe46f7346644",
    },
  });

  const t16 = await prisma.transaction.create({
    data: {
      jobId: j15.id,
      studentId: s1.userId,
      employerUserId: e2.userId,
      amount: 5000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2022-04-20T08:40:00"),
      receiptImageName:
        "1a1acabecbabd48c9e3d0020729753a526c8bb4921d39d41781ff1e1d44c11ef",
    },
  });

  const t17 = await prisma.transaction.create({
    data: {
      jobId: j15.id,
      studentId: s1.userId,
      employerUserId: e2.userId,
      amount: 5000,
      isDeposit: false,
      createdAt: new Date("2022-06-22T11:30:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t18 = await prisma.transaction.create({
    data: {
      jobId: j15.id,
      studentId: s2.userId,
      employerUserId: e2.userId,
      amount: 6000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2022-09-06T16:05:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t19 = await prisma.transaction.create({
    data: {
      jobId: j15.id,
      studentId: s3.userId,
      employerUserId: e2.userId,
      amount: 4500,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2022-10-31T13:50:00"),
      receiptImageName:
        "24467125aeb077e4cdf8705d08e6e0ed5f4e7c303cb1656f3b9afe46f7346644",
    },
  });

  const t20 = await prisma.transaction.create({
    data: {
      jobId: j15.id,
      studentId: s3.userId,
      employerUserId: e2.userId,
      amount: 4500,
      status: "ACCEPTED",
      isDeposit: false,
      createdAt: new Date("2023-01-15T09:30:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t21 = await prisma.transaction.create({
    data: {
      jobId: j17.id,
      studentId: s2.userId,
      employerUserId: e2.userId,
      amount: 5000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2023-03-12T12:25:00"),
      receiptImageName:
        "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
    },
  });

  const t22 = await prisma.transaction.create({
    data: {
      jobId: j17.id,
      studentId: s3.userId,
      employerUserId: e2.userId,
      amount: 6000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2023-05-24T15:15:00"),
      receiptImageName:
        "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
    },
  });

  const t23 = await prisma.transaction.create({
    data: {
      jobId: j19.id,
      studentId: s1.userId,
      employerUserId: e3.userId,
      amount: 600,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2023-05-28T16:10:54"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t24 = await prisma.transaction.create({
    data: {
      jobId: j19.id,
      studentId: s2.userId,
      employerUserId: e3.userId,
      amount: 1000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2022-07-12T16:00:33"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t25 = await prisma.transaction.create({
    data: {
      jobId: j21.id,
      studentId: s1.userId,
      employerUserId: e3.userId,
      amount: 1100,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2023-07-01T08:00:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t26 = await prisma.transaction.create({
    data: {
      jobId: j21.id,
      studentId: s1.userId,
      employerUserId: e3.userId,
      amount: 1100,
      status: "ACCEPTED",
      isDeposit: false,
      createdAt: new Date("2022-11-25T10:15:00"),
      receiptImageName:
        "584f0adcaf71a1608a930c343f3da839011324bef170b9722309b7fcadea48d9",
    },
  });

  const t265 = await prisma.transaction.create({
    data: {
      jobId: j21.id,
      studentId: s2.userId,
      employerUserId: e3.userId,
      amount: 1000,
      status: "REJECTED",
      isDeposit: true,
      createdAt: new Date("2022-05-10T12:20:00"),
      receiptImageName:
        "1a1acabecbabd48c9e3d0020729753a526c8bb4921d39d41781ff1e1d44c11ef",
    },
  });

  const t27 = await prisma.transaction.create({
    data: {
      jobId: j21.id,
      studentId: s2.userId,
      employerUserId: e3.userId,
      amount: 1000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2022-05-10T13:30:00"),
      receiptImageName:
        "1a1acabecbabd48c9e3d0020729753a526c8bb4921d39d41781ff1e1d44c11ef",
    },
  });

  const t28 = await prisma.transaction.create({
    data: {
      jobId: j21.id,
      studentId: s2.userId,
      employerUserId: e3.userId,
      amount: 1000,
      status: "ACCEPTED",
      isDeposit: false,
      createdAt: new Date("2023-03-18T16:45:00"),
      receiptImageName:
        "bc365d05811ff88fb22536dc7a402c65156425ecb15fd6874c0bf5941b6b5a68",
    },
  });

  const t29 = await prisma.transaction.create({
    data: {
      jobId: j24.id,
      studentId: s2.userId,
      employerUserId: e3.userId,
      amount: 6000,
      status: "REJECTED",
      isDeposit: true,
      createdAt: new Date("2022-01-28T09:20:00"),
      receiptImageName:
        "1a1acabecbabd48c9e3d0020729753a526c8bb4921d39d41781ff1e1d44c11ef",
    },
  });

  const t30 = await prisma.transaction.create({
    data: {
      jobId: j24.id,
      studentId: s2.userId,
      employerUserId: e3.userId,
      amount: 6000,
      isDeposit: true,
      createdAt: new Date("2023-08-10T11:00:00"),
      receiptImageName:
        "1a1acabecbabd48c9e3d0020729753a526c8bb4921d39d41781ff1e1d44c11ef",
    },
  });

  const t31 = await prisma.transaction.create({
    data: {
      jobId: j25.id,
      studentId: s3.userId,
      employerUserId: e3.userId,
      amount: 1500,
      status: "REJECTED",
      isDeposit: true,
      createdAt: new Date("2022-10-15T14:25:00"),
      receiptImageName:
        "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
    },
  });

  const t32 = await prisma.transaction.create({
    data: {
      jobId: j25.id,
      studentId: s3.userId,
      employerUserId: e3.userId,
      amount: 1500,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2023-02-20T17:40:00"),
      receiptImageName:
        "24467125aeb077e4cdf8705d08e6e0ed5f4e7c303cb1656f3b9afe46f7346644",
    },
  });

  const t33 = await prisma.transaction.create({
    data: {
      jobId: j25.id,
      studentId: s3.userId,
      employerUserId: e3.userId,
      amount: 1500,
      status: "ACCEPTED",
      isDeposit: false,
      createdAt: new Date("2022-06-05T12:05:00"),
      receiptImageName:
        "1a1acabecbabd48c9e3d0020729753a526c8bb4921d39d41781ff1e1d44c11ef",
    },
  });

  const t34 = await prisma.transaction.create({
    data: {
      jobId: j25.id,
      studentId: s2.userId,
      employerUserId: e3.userId,
      amount: 1000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2023-01-01T08:30:00"),
      receiptImageName:
        "bde37d8cb3947552b65d82e5355a30090ec3c361722034d5b53615b5dbc3cb46",
    },
  });

  const t35 = await prisma.transaction.create({
    data: {
      jobId: j25.id,
      studentId: s2.userId,
      employerUserId: e3.userId,
      amount: 1000,
      status: "ACCEPTED",
      isDeposit: false,
      createdAt: new Date("2022-04-12T10:55:00"),
      receiptImageName:
        "3f28b41dc9d034dadf6fb7784fcc5ec6b1cbc40ab0bc8aab7280e7726ab46609",
    },
  });

  const t36 = await prisma.transaction.create({
    data: {
      jobId: j27.id,
      studentId: s1.userId,
      employerUserId: e3.userId,
      amount: 2500,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2023-05-28T13:15:00"),
      receiptImageName:
        "3f28b41dc9d034dadf6fb7784fcc5ec6b1cbc40ab0bc8aab7280e7726ab46609",
    },
  });

  const t37 = await prisma.transaction.create({
    data: {
      jobId: j27.id,
      studentId: s2.userId,
      employerUserId: e3.userId,
      amount: 3000,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2022-09-02T16:30:00"),
      receiptImageName:
        "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
    },
  });

  const t38 = await prisma.transaction.create({
    data: {
      jobId: j27.id,
      studentId: s2.userId,
      employerUserId: e3.userId,
      amount: 3000,
      isDeposit: false,
      createdAt: new Date("2023-11-11T09:10:00"),
      receiptImageName:
        "3f28b41dc9d034dadf6fb7784fcc5ec6b1cbc40ab0bc8aab7280e7726ab46609",
    },
  });

  const t39 = await prisma.transaction.create({
    data: {
      jobId: j27.id,
      studentId: s3.userId,
      employerUserId: e3.userId,
      amount: 2250,
      status: "ACCEPTED",
      isDeposit: true,
      createdAt: new Date("2022-03-22T11:45:00"),
      receiptImageName:
        "962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733",
    },
  });

  const t40 = await prisma.transaction.create({
    data: {
      jobId: j27.id,
      studentId: s3.userId,
      employerUserId: e3.userId,
      amount: 2250,
      status: "REJECTED",
      isDeposit: false,
      createdAt: new Date("2023-06-15T14:20:00"),
      receiptImageName:
        "6ddffa1bb20aeeaf9dfd76580ac4bdb7e6c4d0bfc318e7c1f82224603d6a6296",
    },
  });

  const t41 = await prisma.transaction.create({
    data: {
      jobId: j27.id,
      studentId: s3.userId,
      employerUserId: e3.userId,
      amount: 2250,
      isDeposit: false,
      createdAt: new Date("2022-12-30T17:35:00"),
      receiptImageName:
        "bc365d05811ff88fb22536dc7a402c65156425ecb15fd6874c0bf5941b6b5a68",
    },
  });

  const c7 = await prisma.chatroom.create({
    data: {
      applicationUserId: s2.userId,
      applicationJobId: j19.id,
      employerId: e3.userId,
      messages: {
        create: [
          {
            userId: s2.userId,
            createdAt: new Date("2024-03-21T17:35:00"),
            isImage: false,
            content: 'ต้นๆ',
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-03-21T17:35:30"),
            isImage: false,
            content: 'รถเป็นอะไรอะ'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-03-21T17:35:37"),
            isImage: false,
            content: 'รถเสียอะ'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-03-21T17:35:42"),
            isImage: false,
            content: 'สตาร์ทไม่ติดเลย'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-03-21T17:36:12"),
            isImage: false,
            content: 'ทำไมไม่ใช้น้ำมันไดเกียวล่ะ'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-03-21T17:36:33"),
            isImage: true,
            content: '7b6695a8e17a5484405fac47b55815a6ed93d19d38287e26e90250b87180ed1a'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-03-21T17:36:44"),
            isImage: false,
            content: 'เพราะใช้แล้วเครื่องฟิต'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-03-21T17:36:45"),
            isImage: false,
            content: 'สตาร์ทติดง่าย'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-03-22T09:27:45"),
            isImage: true,
            content: '601598e2fdc083775e23c3418afed4cdfda984c4f846d89c02517ebc1a4f3811'
          },
        ],
      },
    },
  });

  const c8 = await prisma.chatroom.create({
    data: {
      applicationUserId: s2.userId,
      applicationJobId: j20.id,
      employerId: e3.userId,
      messages: {
        create: [
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-21T10:11:15"),
            isImage: true,
            content: 'jobFiles/5203e15c4ab04df8e6884ea4d8952215f5c6bc82a92f4bb8206c0ffe703e38c3'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-21T10:11:20"),
            isImage: false,
            content: 'พี่แอ๊ด'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-21T10:11:22"),
            isImage: false,
            content: 'พี่จะไปไหนเนี่ย'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-22T12:09:30"),
            isImage: false,
            content: 'อ๋อ'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-22T12:09:33"),
            isImage: false,
            content: 'ว่าจะไปเรียนแต่งหน้า'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-22T12:09:37"),
            isImage: true,
            content: '4ecc1119c9f7c96c3b67e39c9bebe48a600264365d6450b54940726b72f498f6'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-22T12:09:48"),
            isImage: false,
            content: 'นั่งสมาธิ ดำน้ำ ปลูกปะการัง'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-22T12:09:55"),
            isImage: true,
            content: 'e1ef14079efc5e1bd1e7cfe1c4a732e3438a1b8443e47d994f7b9f9f436b79aa'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-23T21:22:55"),
            isImage: false,
            content: 'ทำอาหาร นวดสปา ปลูกป่า ดำนา'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-23T21:23:12"),
            isImage: true,
            content: 'c4d2dfe58e28379271c8ea6a9874b7124252153113474861fb8560ec10970964'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-23T22:44:12"),
            isImage: false,
            content: 'ดูดิสนีย์ออนไอซ์ แรลลี่ ตีกอล์ฟ'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-23T22:44:44"),
            isImage: true,
            content: '47a50ef3fcb16268eaea70cb38d73998a5e8a247fcede360704e10e5baa4da7d'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-24T08:30:33"),
            isImage: false,
            content: 'ล่องเรือ ส่องสัตว์'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-24T08:30:37"),
            isImage: true,
            content: 'cffc7481c0abacc579ae6035dac9e63b199a6128d13da736dba9454bfaf59db3'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-24T13:27:36"),
            isImage: false,
            content: 'ชอปปิ้ง ดูงิ้ว ดูละครเวที ดูคอนเสิร์ต'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-24T13:27:39"),
            isImage: true,
            content: 'b4e0f46efc58551a0cb7843b1b088f66e802c569d6f1e7bf9e63d69a35807659'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-24T14:45:44"),
            isImage: false,
            content: 'เยอะเนอะ'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-24T15:03:17"),
            isImage: false,
            content: 'เยอะ'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-24T15:03:21"),
            isImage: false,
            content: 'ไปก่อนนะ'
          },
        ],
      },
    },
  });

  const c10 = await prisma.chatroom.create({
    data: {
      applicationUserId: s2.userId,
      applicationJobId: j24.id,
      employerId: e3.userId,
      messages: {
        create: [
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-17T15:07:27"),
            isImage: false,
            content: 'น้อง'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-17T15:07:31"),
            isImage: false,
            content: 'มีปืนขายมั้ย'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-19T11:11:11"),
            isImage: false,
            content: 'มี'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-19T11:11:12"),
            isImage: false,
            content: 'จะเอาแบบไหน'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-19T11:11:17"),
            isImage: false,
            content: 'แบบดีหรือแบบธรรมดา'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-19T11:11:21"),
            isImage: true,
            content: '645ec85b3ff4c4834e30b61ff00d8aae8d075e5ffdbbc5b844c2ced893c79074'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-19T12:12:21"),
            isImage: false,
            content: 'เอาแบบดีมาเลย'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-19T12:34:56"),
            isImage: false,
            content: 'แบบสั้นหรือแบบยาว'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-19T12:34:59"),
            isImage: true,
            content: '12236e042b06ddf51def15dd8a2c56cfc568e8f3f316c43d6904026e2c917704'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-19T17:36:21"),
            isImage: false,
            content: 'สั้นก็ได้'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-20T09:09:09"),
            isImage: false,
            content: 'ดำเงาหรือดำด้าน'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-20T09:09:15"),
            isImage: true,
            content: '88f437c42c7f5afba8fa123429481395ad074647f85936c08e564e2dc7b1194f'
          },
          {
            userId: e3.userId,
            createdAt: new Date("2024-02-20T14:09:42"),
            isImage: false,
            content: 'ดำด้าน'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-20T16:05:43"),
            isImage: false,
            content: 'รอแป๊ป'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-20T16:05:45"),
            isImage: false,
            content: '...'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-20T17:03:30"),
            isImage: false,
            content: 'หมด'
          },
          {
            userId: s2.userId,
            createdAt: new Date("2024-02-20T17:03:33"),
            isImage: true,
            content: 'b84cc78e6b3263366d6c85f435dfb48460df6b5fe27dad14ee60c215806e0f3e'
          },
        ],
      },
    },
  });

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
