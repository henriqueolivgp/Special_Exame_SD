import { Power, ShieldMinus } from "lucide-react";
// import { Sidebar } from "../components/home/sidebar";
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useAuth } from "../hooks/AuthHook";
import { Sidebar } from "../components/home/sidebar";
import { AsideBar } from "../components/home/aside-bar";

export default function Home() {
    return (
        <>
            <div className="content">
                <AsideBar />
                <Sidebar />
            </div>

        </>
    );
}

