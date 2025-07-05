'use client'

import React, { useEffect, useState } from 'react'
import { Upload, ClipboardList, Link2 } from 'lucide-react'
import { Card, CardContent, CardHeader, } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import UploadCurriculum from '@/components/uploadCurriculum'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'

export default function CurriculoPage() {
  const router = useRouter()
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('accessToken'); // Defina o token aqui
      console.log('storedToken', storedToken);
      if (!storedToken) {
        router.push('/login');
      } else {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, [router]);


  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-black dark:text-white'>Carregando... </p>
      </div>
    )
  }

  return (
    <section className='bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen py-12 px-4 flex flex-col items-center'>
      <h1 className='text-3xl md:text-4xl font-bold text-center mb-10'>
        Construa seu currículo profissional de<br />
        forma <span className='text-black dark:text-white'>Rápida e Fácil</span>
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full'>
        {/* Envio de currículo */}
        <Card className='flex flex-col items-center text-center bg-gray-50 dark:bg-gray-800'>
          <CardContent className='flex flex-col items-center justify-between p-6 h-full gap-2'>
            <Upload className='w-10 h-10 text-black dark:text-white mx-auto' />
            <p className='mb-4 text-sm text-muted-foreground dark:text-gray-300'>
              Já criou seu currículo?<br />
              Exporte-o em PDF ou outro formato de suas referência para enviar para os recrutadores.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button className='dark:text-gray-200'>Enviar Currículo</Button>
              </DialogTrigger>
              <DialogContent className='max-w-md dark:bg-gray-900 dark:text-white'>
                <DialogHeader>
                  <DialogTitle className='flex flex-row items-center gap-2'>
                    <Upload className='w-5 h-5' />
                    Enviar Currículo
                  </DialogTitle>
                  <DialogDescription className='dark:text-gray-300'>
                    Selecione um arquivo PDF com seu currículo.
                  </DialogDescription>
                </DialogHeader>
                {/* Passa token real para o componente */}
                <UploadCurriculum />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Criação de currículo */}
        <Card className='flex flex-col items-center text-center bg-gray-50 dark:bg-gray-800'>
          <CardContent className='flex flex-col items-center justify-between p-6 h-full gap-2'>
            <ClipboardList className='w-10 h-10 text-black dark:text-white mx-auto' />
            <p className='mb-4 text-sm text-muted-foreground dark:text-gray-300'>
              Preencha seus dados e<br />
              monte seu curriculo profissional em poucos minutos.
            </p>
            <Button className='dark:text-gray-200' onClick={() => router.push('/curriculo/criar')}>
              Criar Currículo
            </Button>
          </CardContent>
        </Card>

        {/* Importar do Linkedln */}
        <Card className='flex flex-col items-center text-center bg-gray-50 dark:bg-gray-800'>
          <CardContent className='flex flex-col items-center justify-between p-6 h-full gap-2'>
            <Link2 className='w-10 h-10 text-black dark:text-white mx-auto' />
            <p className='mb-4 text-sm text-muted-foreground dark:text-gray-300'>
              Caso já tenha um currículo do LinkedIn, você pode importá-lo automaticamente para agilizar o preenchimento.
            </p>
            <Button className='dark:text-gray-200'>Importar do LinkedIn</Button>
          </CardContent>
        </Card>
      </div>
      <Button
        variant='outline'
        className='mt-6 dark:text-gray-400'
        onClick={() => router.push('/')}
      >
        Enviar Currículo Depois
      </Button>
    </section >
  )
}