'use client'

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "./ui/button"

export default function LogoUploader({ onFileSelect, preview }) {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles && acceptedFiles[0]) {
            onFileSelect(acceptedFiles[0])
        }
    }, [onFileSelect])

    const handleRemove = () => {
        onFileSelect(null)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        multiple: false
    })

    return (
        <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 cursor-pointer">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {preview ? (
                    <img src={preview} alt="Logo da Empresa" className="mx-auto h-32 object-contain" />
                ) : (
                    <p>{isDragActive ? 'Solte a imagem aqui...' : 'Arraste e solte a logo aqui ou clique para selecionar'}</p>
                )}
            </div>
            {preview && (
                <Button type='button' variant='ghost' className='mt-2 hover:bg-red-500 hover:text-white' onClick={handleRemove} >
                    Remover Imagem
                </Button>
            )}
        </div>
    )
}