import Input from "./Input";
import PasswordInput from "./PasswordInput";
import Link from "next/link";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import { useState } from "react";
import { registerWithCredentials } from "@/actions/register";
import { useRouter } from "next/navigation";

type Props = {
  handleToggleForm: () => void;
  isToggleForm: boolean;
};

type Form = {
  email: string;
  password: string;
  cPassword: string;
  fname: string;
  lname: string;
};

const defaultForm = {
  email: "",
  password: "",
  cPassword: "",
  fname: "",
  lname: "",
};

export default function RegisterViaEmail({
  handleToggleForm,
  isToggleForm,
}: Props) {
  const [data, setForm] = useState<Form>(structuredClone(defaultForm));

  const [checkBoxError, setCheckBoxError] = useState({
    checkOne: false,
    checkTwo: false,
  });

  const [errors, setErrors] = useState<Form>(structuredClone(defaultForm));

  const validateFirstPage = () => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    // const password_pattern = /^.{8,}$/
    const errors: Form = structuredClone(defaultForm);
    if (data.email === "") {
      errors.email = "กรอกที่อยู่อีเมลของคุณ";
    } else if (!email_pattern.test(data.email)) {
      errors.email = "อีเมลไม่ถูกต้อง";
    }

    if (data.password === "") {
      errors.password = "กรอกรหัสผ่านของคุณ";
    } else if (data.password.length < 8) {
      errors.password = "รหัสผ่านต้องมี 8 ตัวอักษร หรือมากกว่า";
    }

    if (data.cPassword === "") {
      errors.cPassword = "กรอกรหัสผ่านของคุณ";
    } else if (data.cPassword != data.password) {
      errors.cPassword = "รหัสผ่านไม่ตรงกัน";
    }

    setCheckBoxError({
      checkOne: false,
      checkTwo: false,
    });
    // console.log(errors)
    return errors;
  };

  const validateSecondPage = () => {
    const errors: Form = structuredClone(defaultForm);
    let success = true;

    if (data.fname === "") {
      errors.fname = "กรอกชื่อของคุณ";
      success = false;
    }

    if (data.lname === "") {
      errors.lname = "กรอกนามสกุลของคุณ";
      success = false;
    }
    return { errors, success };
  };

  const handleValidationFirstPage = () => {
    const validationErrors = validateFirstPage();
    setErrors(validationErrors);

    setTimeout(() => {
      if (
        !validationErrors.email &&
        !validationErrors.password &&
        !validationErrors.cPassword
      ) {
        handleToggleForm();
      }
    }, 0);
  };

  const handleValidationSecondPage = async () => {
    const { errors, success } = validateSecondPage();
    setTimeout(async () => {
      if (!success) {
        setErrors(errors);
        return;
      }

      const res = await registerWithCredentials(data);
      router.push("/login");
      // console.log(errors)
    }, 0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...data,
      [event.target.name]: event.target.value,
    });
    // console.log(data)
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxError({
      ...checkBoxError,
      [event.target.name]: event.target.checked,
    });
  };

  const router = useRouter();

  return (
    <form className="w-full" action={handleValidationSecondPage} noValidate>
      {!isToggleForm ? (
        <div className="pt-[5px]">
          {/* Email Input Component */}
          <Input
            name="email"
            label="อีเมล"
            inputType="email"
            warning={errors.email}
            handleChange={handleChange}
            value={data.email}
          />

          {/* Password Input Component */}
          <PasswordInput
            fromLoginPage={false}
            handleChange={handleChange}
            value={data.password}
            warning={errors.password}
          />

          {/*Confirm Password Input Component */}
          <ConfirmPasswordInput
            handleChange={handleChange}
            value={data.cPassword}
            warning={errors.cPassword}
          />

          <div
            id="nextPage"
            className="w-full bg-[#334155] hover:bg-slate-600 text-center cursor-pointer rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md"
            onClick={handleValidationFirstPage}
          >
            ถัดไป
          </div>

          <p className="w-full text-center text-sm mt-[10px]">
            มีบัญชีอยู่แล้ว ?{" "}
            <Link
              href={"/login"}
              className="text-[#326FE2] hover:underline hover:underline-offset-2"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      ) : (
        <div className={"pt-[10px] flex flex-col"}>
          <Input
            name="fname"
            label="ชื่อ"
            inputType="text"
            warning={errors.fname}
            handleChange={handleChange}
            value={data.fname}
          />
          <Input
            name="lname"
            label="นามสกุล"
            inputType="text"
            warning={errors.lname}
            handleChange={handleChange}
            value={data.lname}
          />

          <div className="mt-[30px] w-full relative">
            {/* Link ไป ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge และ นโยบายคุ้มครองความเป็นส่วนตัว*/}
            <input
              type="checkbox"
              name="checkOne"
              id="checkOne"
              className="absolute left-0 top-0 border
                                    border-[#848484]
                                    accent-[#334155]
                                    cursor-pointer
                                    rounded-sm
                                    "
              onChange={(e) => {
                handleCheckBoxChange(e);
              }}
              required
            />
            <label
              htmlFor="checkOne"
              className="block text-[9.5px] pl-[20px] cursor-pointer"
            >
              ฉันได้อ่านและยอมรับ
              <Link
                href={"/"}
                className="text-[#326FE2] hover:underline hover:underline-offset"
              >
                ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge
              </Link>
            </label>
          </div>
          <div className="mt-[10px] w-full relative">
            <input
              type="checkbox"
              name="checkTwo"
              id="checkTwo"
              className="absolute cursor-pointer left-0 top-0 border
                                    border-[#848484]
                                    accent-[#334155]
                                    rounded-sm
                                    "
              onChange={(e) => {
                handleCheckBoxChange(e);
              }}
              required
            />
            <label
              htmlFor="checkTwo"
              className="block text-[9.5px] pl-[20px] cursor-pointer"
            >
              ฉันได้อ่านและยอมรับ
              <Link
                href={"/"}
                className="text-[#326FE2] hover:underline hover:underline-offset"
              >
                นโยบายคุ้มครองความเป็นส่วนตัว
              </Link>
            </label>
          </div>

          {checkBoxError.checkOne && checkBoxError.checkTwo ? (
            <button
              id="submit"
              type="submit"
              className="w-full bg-[#334155] hover:bg-slate-600 rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md"
            >
              สร้างบัญชี
            </button>
          ) : (
            <div className="w-full bg-[#CBD5E1] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md text-center cursor-pointer">
              สร้างบัญชี
            </div>
          )}

          <div id="previousPage" className="mt-[15px] flex justify-center">
            <p
              onClick={handleToggleForm}
              className="hover:underline hover:underline-offset text-[#334155] hover:text-slate-600 text-md cursor-pointer"
            >
              ย้อนกลับ
            </p>
          </div>
        </div>
      )}
    </form>
  );
}
