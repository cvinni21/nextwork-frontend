'use client';

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="
        fixed bottom-6 right-6
        w-12 h-12
        rounded-full
        bg-white dark:bg-gray-800
        shadow-lg
        flex items-center justify-center
        cursor-pointer
        z-50
        "
        aria-label="Alternar tema claro/escuro"
        >
            <Button 
                variant='ghost'
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className='w-full h-full rounded-full p-0 flex items-center justify-center'
                aria-pressed={theme === 'dark'}
            >
                {theme === 'dark' ? (
                    <SunIcon className="w-6 h-6 text-yellow-400" />
                ) : (
                    <MoonIcon className="w-6 h-6 text-gray-700" />
                )}

            </Button>
        </div>
    );
}