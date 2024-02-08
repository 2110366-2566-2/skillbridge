import CommentCard from "./commentCard/CommentCard"
import CardSlider from "../cardSlider/CardSlider"

const topComments = [
  {
    name: "บุ๊ค อยากนอน",
    position: "Co-Founder",
    company: "บริษัทน้องบิวสั่งข้าว จำกัด (มหาชน)",
    category: "พัฒนาเว็ปไซต์",
    message: "ใช้ SkillBridge ช่วยประหยัดเวลาได้มากค่ะ เพราะมีเพื่อนนิสิตที่มีความสามารถหลากหลาย มีผลงานการันตี และรีวิวดีด้วย ทำให้มั่นใจได้ว่าจะได้เว็ปไซต์ที่ตรงกับความต้องการเราจริงๆ",
  },
  {
    name: "บุ๊ค อยากนอน",
    position: "Co-Founder",
    company: "บริษัทน้องบิวสั่งข้าว จำกัด (มหาชน)",
    category: "พัฒนาเว็ปไซต์",
    message: "ใช้ SkillBridge ช่วยประหยัดเวลาได้มากค่ะ เพราะมีเพื่อนนิสิตที่มีความสามารถหลากหลาย มีผลงานการันตี และรีวิวดีด้วย ทำให้มั่นใจได้ว่าจะได้เว็ปไซต์ที่ตรงกับความต้องการเราจริงๆ",
  },
  {
    name: "บุ๊ค อยากนอน",
    position: "Co-Founder",
    company: "บริษัทน้องบิวสั่งข้าว จำกัด (มหาชน)",
    category: "พัฒนาเว็ปไซต์",
    message: "ใช้ SkillBridge ช่วยประหยัดเวลาได้มากค่ะ เพราะมีเพื่อนนิสิตที่มีความสามารถหลากหลาย มีผลงานการันตี และรีวิวดีด้วย ทำให้มั่นใจได้ว่าจะได้เว็ปไซต์ที่ตรงกับความต้องการเราจริงๆ",
  },
  {
    name: "ธาตุ ทอง",
    position: "ผู้อำนวยการ",
    company: "โรงเรียนวัดธาตุทอง",
    category: "นักร้อง / นักดนตรี",
    message: "เคยยืนรอเธอบน BTS ฉันไม่ได้คิดเรื่อง sex แค่เดินเข้าโรงเรียนด้วยกัน และถ้าให้เปรียบเธอเป็นดั่งเพชร เธอคงเป็น VVS ตำหนิเธอ very very small, very very small",
  },
  {
    name: "ปรีชา ปัดภัย",
    position: "นักร้อง",
    company: "ค่ายเพลง เซิ้ง MUSiC",
    category: "นักร้อง / นักดนตรี",
    message: "แล้วมันเกิดอีหยังกับความฮักเฮา น้องจึงได้คบเขาถิ่มอ้ายน้ำตาพัง ไสว่าฮักสิบ่เพม่าง ฮักบ่จางปานซางฮ้างแท้น้อ มาขุดใจอ้ายไว้แล้วกะไปกับเขา หลงลืมน้ำบ่อเก่า เจ้าเลือดเย็นทั้งใจคัก แรก ๆ กะตั้งใจฮัก ได้จั๊กพักกะตั้งใจลืมกัน ฟ้ากะใสดินยังบ่สั่น คือเปลี่ยนใจง่ายแท้",
  },
]

export default function CommentCards() {
  return (
    <>
      <div className="w-screen overflow-x-scroll flex gap-3 pb-5 px-5 md:hidden">
        {topComments.map(comment => (
          <CommentCard key={comment.message} name={comment.name} position={comment.position} company={comment.company} category={comment.category} message={comment.message} />
        ))}
      </div>
      <div className="hidden md:flex w-full justify-center">
        <CardSlider>
          {topComments.map(comment => (
            <CommentCard key={comment.message} name={comment.name} position={comment.position} company={comment.company} category={comment.category} message={comment.message} />
          ))}
        </CardSlider>
      </div>
    </>
    
  )
}
