'use client'

import React, { useEffect, useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { deleteCurriculum, fetchCurriculum } from "@/services/curriculumService"
import { uploadCurriculumWithAuth } from "@/services/Curriculum"
import { Label } from "./ui/label"
import { useAuth } from "@/contexts/AuthContext"
import { CrossCircledIcon } from "@radix-ui/react-icons"
import { isTokenExpired } from "@/utils/tokenUtils"
import { refreshAccessToken } from "@/services/Auth"
import { useRouter } from "next/navigation"

export default function UploadCurriculum() {
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [curriculumUrl, setCurriculumUrl] = useState(null)

    const { accessToken, refreshToken, setAccessToken, userId } = useAuth()
    const router = useRouter()

    console.log(accessToken, userId, file) // tirar isso depois de testar o código

    const loadCurriculum = async (tokenToUse) => {
        try {
            const url = await fetchCurriculum(userId, tokenToUse)
            setCurriculumUrl(url);
        } catch (error) {
            if (error.response?.status === 404) {
                setCurriculumUrl(null)
            } else {
                toast.error('Erro ao carregar o currículo.')
                console.error(error)
            }
        }
    }

    useEffect(() => {
        const validateAndLoad = async () => {
            if (!userId || !accessToken) return

            try {
                let validToken = accessToken
                if (isTokenExpired(accessToken) && refreshToken) {
                    validToken = await refreshAccessToken(refreshToken)
                    setAccessToken(validToken)
                }

                await loadCurriculum(validToken)
            } catch (err) {
                console.error('Erro ao carregar currículo:', err)
            }
        }

        validateAndLoad()
    }, [userId, accessToken, refreshToken, setAccessToken])

    const handleFileChange = (e) => {
        const selected = e.target.files[0]
        if (selected && selected.type === 'application/pdf') {
            setFile(selected)
        } else {
            toast.error('Por favor, selecione um arquivo PDF.')
            setFile(null)
        }
    }

    const handleRemoveFile = () => {
        setFile(null)
    }

    const handleUpload = async () => {
        if (!file) {
            toast.error("Selecione um arquivo para enviar.")
            return
        }

        setUploading(true)

        try {
            await uploadCurriculumWithAuth(userId, accessToken, refreshToken, file, setAccessToken)
            
            toast.success("Curriculo enviado com sucesso!")
            await loadCurriculum(accessToken)
            setFile(null)

            setAccessToken(accessToken);
            router.push('/profile');
        } catch (error) {
            toast.error("Falha no envio de curriculo.")
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async () => {
        try {
            await deleteCurriculum(userId, accessToken);
            setCurriculumUrl(null);
            toast.success('Curriculo removido com sucesso!');
        } catch (error) {
            toast.error('Erro ao remover o currículo.');
            console.error(error);
        }
    }

    const handleSkip = () => {
        router.push('/profile')
    }

    return (
        <div className="max-w-md mx-auto p-4 w-full rounded text-center">
            {!file && !curriculumUrl && (
                <Label className='block cursor-pointer border border-gray-200 dark:border-gray-700 rounded p-4 mb-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                    <span className="text-center text-sm underline text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                        Escolher arquivo
                    </span>
                    <Input
                        type='file'
                        accept='application/pdf'
                        onChange={handleFileChange}
                        className='hidden'
                    />
                </Label>
            )}

            {file && !curriculumUrl && (
                <div className='mb-4 flex border border-gray-200 dark:border-gray-700 items-center hover:bg-gray-100 dark:hover:bg-gray-800 justify-center gap-3 rounded px-4 py-2'>
                    <a
                        href={URL.createObjectURL(file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline break-words"
                    >
                        {file.name}
                    </a>
                    <Button
                        size='sm'
                        onClick={handleRemoveFile}
                        className='text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 bg-transparent hover:bg-transparent ml-2 p-1'
                    >
                        <X className="w-5 h-5 cursor-pointer" />
                    </Button>
                </div>
            )}

            {file && !curriculumUrl && (
                <Button onClick={handleUpload} disabled={uploading} className='mb-4 w-full'>
                    {uploading ? 'Enviando...' : 'Enviar'}
                </Button>
            )}

            {curriculumUrl && (
                <>
                    <div className="border border-gray-200 dark:border-gray-700 rounded p-2 mb-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition flex justify-center">
                        <a
                            href={curriculumUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 underline cursor-pointer"
                        >
                            Visualizar Currículo Atual
                        </a>
                    </div>
                    <Button
                        variant='destructive'
                        className='mt-2 w-full'
                        onClick={handleDelete}
                    >
                        Remover Curriculo
                        <CrossCircledIcon />
                    </Button>
                </>
            )}

            <Button variant='ghost' className='mt-6 text-sm underline text-gray-500 dark:text-gray-400' onClick={handleSkip}>
                Enviar Currículo Depois 
            </Button>
        </div>
    )
}