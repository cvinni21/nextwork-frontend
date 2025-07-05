'use client'

import { useEffect, useState } from "react"
import { fetchCurriculum, deleteCurriculum } from "@/services/curriculumService"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import api from "@/lib/axiosInstance"

export default function CurriculumViewer() {
    const { accessToken } = useAuth();
    const router = useRouter()

    const [uploadedCurriculum, setUploadedCurriculum] = useState(null);
    const [hasGeneratedCurriculum, setHasGeneratedCurriculum] = useState(false);
    const [loading, setLoading] = useState(true)
    
    const loadUploadedCurriculum = async () => {
        try {
            const url = await fetchCurriculum();
            setUploadedCurriculum(url);
        } catch {
            setUploadedCurriculum(null);
        }
    };

    const checkGeneratedCurriculum = async () => {
        try {
            const res = await api.get('users/me/curriculum/')
            if (res.data) setHasGeneratedCurriculum(true);
        } catch {
            setHasGeneratedCurriculum(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            await loadUploadedCurriculum();
            await checkGeneratedCurriculum();
            setLoading(false);
        };
        if (accessToken) load();
    }, [accessToken]);

    const handleDeleteUploaded = async () => {
        if (!confirm('Tem certeza que deseja excluir o currículo enviado?')) return;
        try {
            await deleteCurriculum();
            setUploadedCurriculum(null);
            toast.success('Currículo enviado excluído.');
        } catch {
            toast.error('Erro ao excluir currículo.');
        }
    };

    if (loading) return <p>Carregando currículos...</p>;

    return (
        <div className='space-y-10'>
            
            {/* CURRICULO UPLOAD */}
            <div className="text-center space-y-4 border p-4 rounded">
                <h2 className="text-xl font-semibold">📁 Currículo Enviado</h2>
                {uploadedCurriculum ? (
                    <div className="flex justify-center gap-4">
                        <a href={uploadedCurriculum} target='_blank' rel='noopener noreferrer'>
                            <Button variant='outline'>Visualizar PDF</Button>
                        </a>
                        <Button variant='destructive' onClick={handleDeleteUploaded}>
                            Excluir
                        </Button>
                    </div>
                ) : (
                    <p className="text-muted-foreground">Nenhum currículo enviado.</p>
                )}
            </div>

            {/* CURRICULO GERADO */}
            <div className="text-center space-y-4 border p-4 rounded">
                <h2 className="text-xl font-semibold">🛠️ Currículo Criado na Plataforma</h2>
                {hasGeneratedCurriculum ? (
                    <div className="flex justify-center gap-4"> 
                        <Button className='dark:text-white' onClick={() => window.open("http://127.0.0.1:8000/api/users/me/curriculum/pdf/", "_blank")}>
                            Ver PDF Gerado
                        </Button>
                        <Button className='dark:text-white' onClick={() => router.push("/curriculo/criar?edit=true")}>
                            Editar Currículo
                        </Button>
                    </div>
                ): (
                    <Button className='dark:text-white' onClick={() => router.push('/curriculo/criar')}>
                        Criar Curriculo
                    </Button>
                )}
            </div>
        </div>
    )
}