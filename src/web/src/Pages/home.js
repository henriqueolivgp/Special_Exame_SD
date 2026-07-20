import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/home/sidebar";

export default function Home() {
    return (
        <div className="min-h-screen bg-chalk dark:bg-ink">
            <Sidebar />
            <div className="flex flex-col p-4 pt-16 sm:pt-6 sm:ml-64">
                <Outlet />
            </div>
        </div>
    );
}
