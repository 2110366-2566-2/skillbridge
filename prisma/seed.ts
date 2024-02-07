import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  await prisma.job.deleteMany({})
  await prisma.employer.deleteMany({})
  await prisma.student.deleteMany({})
  await prisma.user.deleteMany({})

  const u1 = await prisma.user.upsert({
    where: { email: '6430388021@student.chula.ac.th' },
    update: {},
    create: {
      salutation: 'นาย',
      firstname: 'ศุภณัฐ',
      lastname: 'ตั้งสินมั่นคง',
      Student: {
        create: {
          resumeUrl: 'https://i.pinimg.com/736x/87/91/53/87915397fcb2d0b04899cd90420f4acc.jpg',
          transcriptUrl: 'https://www.greatschoolspartnership.org/wp-content/uploads/2022/02/GSP_Exemplar_Transcript_pg1_watermark.png',
          bankAccountName: 'Promptpay',
          bankAccountNo: '0832705890',
          avgStar: 4.99
        }
      }
    }
  })

  const u2 = await prisma.user.upsert({
    where: { email: '6432115421@student.chula.ac.th' },
    update: {},
    create: {
      salutation: 'นาย',
      firstname: 'พิตตินันท์',
      lastname: 'หาญสิงห์กุญช์',
      Student: {
        create: {
          resumeUrl: 'https://s3-us-west-2.amazonaws.com/hiration/ghost/2021/02/resume-meme-10.jpg',
          transcriptUrl: 'https://admissionsandutme.com/wp-content/uploads/2020/12/sample-of-transcript-2.jpg',
          bankAccountName: 'KBank',
          bankAccountNo: '0955195010',
          avgStar: 3.33
        }
      }
    }
  })

  const u3 = await prisma.user.upsert({
    where: { email: '6437820221@student.chula.ac.th' },
    update: {},
    create: {
      salutation: 'บัก',
      firstname: 'นอร์ธ',
      lastname: 'ข้นอีสาน',
      Student: {
        create: {
          resumeUrl: 'https://cdn-images.zety.com/pages/resume_meme_2.png',
          transcriptUrl: 'https://worldwidetranscripts.com/wp-content/uploads/2021/04/Transcripts-Sample-1-622x1024.jpg',
          bankAccountName: 'SCB',
          bankAccountNo: '0876789125',
          avgStar: 4.69
        }
      }
    }
  })

  const u4 = await prisma.user.upsert({
    where: { email: '6435644121@student.chula.ac.th' },
    update: {},
    create: {
      salutation: 'เสี่ย',
      firstname: 'ปิง',
      lastname: 'บรูไน',
      Employee: {
        create: {
          position: 'Billionaire',
          organization: 'SoeiCorp.',
          publicEmail: 'ping888@yahoo.com',
        }
      },
      Job: {
        create: [
          {
            title: 'เขียนเว็บให้ SoeiCorp.',
            status: 'NOT_STARTED',
            description: 'หาเงินจากทำงานออนไลน์ง่าย ๆ แค่เพียง 2-3 ชม.ต่อวัน',
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-15"),
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-02-22"),
          },
          {
            title: 'Renovate Soei888 Web',
            status: 'IN_PROGRESS',
            description: 'รวยทางลัดกับธุรกิจสีเทา',
            startDate: new Date("2023-08-08"),
            endDate: new Date("2023-08-31"),
            estimateStartDate: new Date("2023-09-15"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: 'เขียนเว็บให้ SoeiCorp.',
            status: 'NOT_STARTED',
            description: 'หาเงินจากทำงานออนไลน์ง่าย ๆ แค่เพียง 2-3 ชม.ต่อวัน',
            startDate: new Date("2024-01-05"),
            endDate: new Date("2024-01-20"),
            estimateStartDate: new Date("2024-01-22"),
            estimateEndDate: new Date("2024-02-22"),
          },
          // Add more job objects as needed
        ]
      }
    }
  })

  const u5 = await prisma.user.upsert({
    where: { email: '6437811521@student.chula.ac.th' },
    update: {},
    create: {
      salutation: 'ยัง',
      firstname: 'เฟย',
      lastname: 'มาเท่อ',
      Employee: {
        create: {
          position: 'Rapper',
          organization: 'Gold Element Temple',
          publicEmail: 'TikTokTeenager@yahoo.com',
        }
      },
      Job: {
        create: [
          {
            title: 'ทำโมเดล AI Auto Tune',
            status: 'COMPLETED',
            description: 'เคยยืนรอเธอบนบีทีเอส',
            startDate: new Date("2022-07-14"),
            endDate: new Date("2022-07-31"),
            estimateStartDate: new Date("2022-08-01"),
            estimateEndDate: new Date("2022-10-31"),
          },
          {
            title: 'ตัดต่อคลิปลง TikTok',
            status: 'NOT_STARTED',
            description: 'โอ้เบบี้เกิร์ลยูเรียนมาแตร์เดอี',
            startDate: new Date("2023-09-09"),
            endDate: new Date("2023-09-19"),
            estimateStartDate: new Date("2023-09-25"),
            estimateEndDate: new Date("2023-12-31"),
          },
          // Add more job objects as needed
        ]
      }
    }
  })

  const u6 = await prisma.user.upsert({
    where: { email: '6432345221@student.chula.ac.th' },
    update: {},
    create: {
      salutation: 'ศาสตราจารย์',
      firstname: 'ทิพ',
      middlename: 'สาม',
      lastname: 'บิด',
      Employee: {
        create: {
          position: 'Biker',
          organization: 'BidKub',
          publicEmail: 'TipBidder@gmail.com',
        }
      },
      Job: {
        create: [
          {
            title: 'เซนเซอร์ติดม่านกันแดดอัจฉริยะ',
            status: 'NOT_STARTED',
            description: 'แสงอาทิตย์ส่องมามันแยงตา แต่สายตาเธอที่ส่องมามันแยงใจ',
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-02-16"),
            estimateStartDate: new Date("2024-02-20"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: 'เขียนเว็บ ChaoChao',
            status: 'IN_PROGRESS',
            description: 'ไม่รู้จะเช่าไหนดี มาเช่านี่มา',
            startDate: new Date("2024-01-08"),
            endDate: new Date("2024-01-20"),
            estimateStartDate: new Date("2024-01-21"),
            estimateEndDate: new Date("2024-04-30"),
          },
          {
            title: 'Web Developer for เฮียหมู',
            status: 'NOT_STARTED',
            description: 'เฮียหมูเจ้าเก่าเจ้าเดิม เพิ่มเติมคือกำลังจะมีหน้าเว็บแล้ว',
            startDate: new Date("2023-10-01"),
            endDate: new Date("2023-10-31"),
            estimateStartDate: new Date("2023-11-01"),
            estimateEndDate: new Date("2024-02-01"),
          },
          {
            title: 'รสดีเด็ด อิซากายะ Frontend Developer',
            status: 'NOT_STARTED',
            description: 'Web-based application สำหรับจองคิวและโปรโมชั่น',
            startDate: new Date("2024-01-27"),
            endDate: new Date("2024-02-29"),
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-05-31"),
          },
          {
            title: 'Skip Backend Developer',
            status: 'NOT_STARTED',
            description: 'Web-based application สำหรับสั่งออเดอร์และเรียกเติมน้ำชาเขียวรีฟิล',
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-02-29"),
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-04-30"),
          },
          {
            title: 'เฮียหมู Data Analytics',
            status: 'NOT_STARTED',
            description: 'วิเคราะห์เมนูกับแกล้มยอดนิยมเทียบกับจำนวนเบียร์ที่ลูกค้าสั่งต่อโต๊ะ',
            startDate: new Date("2024-02-05"),
            endDate: new Date("2024-02-15"),
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: 'เฮียหมู Data Analytics',
            status: 'NOT_STARTED',
            description: 'วิเคราะห์เมนูกับแกล้มยอดนิยมเทียบกับจำนวนเบียร์ที่ลูกค้าสั่งต่อโต๊ะ',
            startDate: new Date("2024-02-05"),
            endDate: new Date("2024-02-15"),
            estimateStartDate: new Date("2024-03-01"),
            estimateEndDate: new Date("2024-03-31"),
          },
          {
            title: 'Implement Recommendation Model on Application',
            status: 'NOT_STARTED',
            description: 'Develop a ML model to recommend their favorite beers to users.',
            startDate: new Date("2024-01-27"),
            endDate: new Date("2024-02-10"),
            estimateStartDate: new Date("2024-02-17"),
            estimateEndDate: new Date("2024-04-16"),
          },
          {
            title: 'Bad Guy Full-stack developer',
            status: 'NOT_STARTED',
            description: 'Develop Larb selling application for E-sarn People',
            startDate: new Date("2024-01-11"),
            endDate: new Date("2024-01-25"),
            estimateStartDate: new Date("2024-02-02"),
            estimateEndDate: new Date("2024-05-15"),
          },
          // Add more job objects as needed
        ]
      }
    }
  })

  console.log({ u1, u2, u3, u4, u5, u6 })
}

// await prisma.user.create({
//     data: {
//         name: 'Alice',
//         email: 'alice@prisma.io',
//         posts: {
//             create: { title: 'Hello World' },
//         },
//         profile: {
//             create: { bio: 'I like turtles' },
//         },
//     },
// })

// const allUsers = await prisma.user.findMany({
//     include: {
//         posts: true,
//         profile: true,
//     },
// })
// console.dir(allUsers, { depth: null })

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })