'use client'

import { Button } from "./ui/button";
import { LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function ProfileSidebar({ activeSection, onSelectSection }) {
    const router = useRouter();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const items = [
        { key: "info", label: "Meu Perfil" },
        { key: "password", label: "Segurança e Privacidade" },
        { key: "curriculum", label: "Visualizar Currículo" },
    ];

    return (
        <div className="w-64 h-full bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col justify-between">
            <div className="space-y-1">
                {items.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => onSelectSection(item.key)}
                        className={clsx(
                            "w-full text-left px-3 py-2 rounded-md text-sm cursor-pointer transition-colors",
                            'focus:outline-none focus:ring-0',
                            'hover:bg-gray-100 dark:hover:bg-gray-700',
                            activeSection === item.key && "bg-gray-200 dark:bg-gray-700 font-medium shadow-sm"
                        )}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {activeSection !== "info" && user && (
                    <div className="border-t pt-4">

                    </div>
                )}

                <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={handleLogout}
                >
                    <LogOut size={18} className="mr-2" />
                    Sair
                </Button>
            </div>
        </div>
    );
}
