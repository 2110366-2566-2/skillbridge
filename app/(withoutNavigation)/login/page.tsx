import Logo from "@/components/authentication/Logo"
import Login from "@/components/authentication/Login"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

type Props = {}

export default async function LoginPage(props: Props) {
  const session = await getServerSession()
  if (session) {
    redirect("/landing")
  }

  return (
    <main className="w-full flex flex-col items-center bg-[#F8FAFC] h-full justify-center">
      <div className="flex flex-col items-center w-[381px] h-[813px] md:bg-white md:shadow-xl">
        {/* Logo Component */}
        <Logo />

        {/* Login Component */}
        <Login />
      </div>
    </main>
  )
}
