import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer  from "../components/Footer"

export default function MainLayout() {
  return (
    <div className="w-full !h-screen flex flex-col">
        <Navbar />
        <main className="h-full">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}
