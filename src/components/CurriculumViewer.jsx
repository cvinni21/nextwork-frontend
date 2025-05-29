'use client'

import { useEffect, useState } from "react"
import { fetchCurriculum } from "@/services/curriculumService"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "./ui/button"
import { toast } from "sonner"

export default function CurriculumViewer() {
    const { accessToken } = useAuth()
    const [curriculumUrl, setCurriculumUrl] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadCurriculum = async () => {
            try {
                const url = await fetchCurriculum(accessToken)
                setCurriculumUrl(url)
            } catch (error) {
                toast.error("Erro ao carregar currículo")
            } finally {
                setLoading(false)
            }
        }

        loadCurriculum()    
    }, [accessToken])

    if (loading) return <p>Carregando currículo...</p>

    return (
        <div className="text-center space-y-4">
            {curriculumUrl ? (
                <>
                    <p>Currículo enviado:</p>
                    <a href={curriculumUrl} target="_blank" rel="noopener">
                        <Button variant='outline'>Ver Currículo (PDF)</Button>
                    </a>
                </>
            ) : (
                <p className="text-muted-foreground">Nenhum Currículo enviado.</p>
            )}
        </div>
    )
}