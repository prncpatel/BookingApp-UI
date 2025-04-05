import { Outlet } from "react-router-dom"

export const Layout = () => {
    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-gradient" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
            </div>
        
            <main className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Outlet />
            </main>
        </div>
    )
}    