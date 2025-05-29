import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center px-4">
            <Ghost className="w-20 h-20 text-blue-900 dark:text-white mb-6" />
            <h1 className="text-4xl font-bold text-blue-900 dark:text-white mb-2">
                Página não encontrada
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
                A página que você está tentando acessar não existe ou foi removida.
            </p>
            <Link href='/dashboard'>
                <Button className='bg-blue-900 text-white hover:bg-blue-800'>
                    Voltar para o início
                </Button>
            </Link>
        </div>
    )
}