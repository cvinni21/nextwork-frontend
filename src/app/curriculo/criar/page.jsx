'use client'

import React, { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { createFullCurriculum } from "@/services/curriculumService"
import { toast } from "sonner"


export default function CriarCurriculoPage() {
    const router = useRouter()
    const { accessToken } = useAuth()
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            habilidades: [''],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'habilidades',
    })

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        const body = {
            nome_completo: data.nomeCompleto,
            telefone: data.telefone,
            email: data.email,
            rua: data.rua,
            numero: data.numero,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            cep: data.cep,
            instituicao: data.instituicao,
            diploma: data.diploma,
            curso: data.curso,
            inicio_curso: data.inicioCurso,
            termino_curso: data.terminoCurso,
            descricao_curso: data.descricaoCurso,
            habilidades: data.habilidades.filter(h => h.trim() !== '').map(nome => ({ nome })),
            experiencias: data.empresa?.trim() ? [{
                empresa: data.empresa,
                cargo: data.cargo,
                tempo_experiencia: data.tempoExperiencia,
                descricao: data.descricaoExperiencia
            }] : []
        }

        try {
            setLoading(true);

            await createFullCurriculum(body, accessToken);

            await setUserCurriculum(body, accessToken);

            toast.success('Currículo salvo com sucesso!')
        } catch (error) {
            console.error(error)
            toast.error('Erro ao salvar currículo.')
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white min-h-screen py-12 px-4 flex flex-col items-center">
            <h1 className='text-3xl md:text-4xl font-bold text-center mb-10'>
                Criação de Currículo
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl space-y-6'>
                <Card>
                    <CardHeader>
                        <CardTitle>Informações Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                            <Label className='mb-2'>Nome Completo</Label>
                            <Input {...register('nomeCompleto')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Telefone</Label>
                            <Input {...register('telefone')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Email</Label>
                            <Input type='email' {...register('email')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Rua</Label>
                            <Input {...register('rua')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Número</Label>
                            <Input {...register('numero')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Bairro</Label>
                            <Input {...register('bairro')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Estado</Label>
                            <Input {...register('estado')} />
                        </div>
                        <div>
                            <Label className='mb-2'>CEP</Label>
                            <Input {...register('cep')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Cidade</Label>
                            <Input {...register('cidade')} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Informações Acadêmicas</CardTitle>
                    </CardHeader>
                    <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <Label className='mb-2'>Instuição de Ensino</Label>
                            <Input {...register('instituicao')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Diploma</Label>
                            <Input {...register('diploma')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Curso</Label>
                            <Input {...register('curso')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Data de Início</Label>
                            <Input type='date' {...register('inicioCurso')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Data de Término</Label>
                            <Input type='date' {...register('terminoCurso')} />
                        </div>
                        <div className="md:col-span-2">
                            <Label className='mb-2'>Descrição</Label>
                            <Textarea {...register('descricaoCurso')} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Experiências Profissionais (se tiver)</CardTitle>
                        <CardDescription>Informe aqui suas experiências de trabalho anteriores, isso ajuda as empresas a conhecerem melhor sua trajetória profissional.</CardDescription>
                    </CardHeader>
                    <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <Label className='mb-2'>Nome da Empresa</Label>
                            <Input {...register('empresa')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Cargo</Label>
                            <Input {...register('cargo')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Tempo de Experiência</Label>
                            <Input {...register('tempoExperiencia')} />
                        </div>
                        <div className="md:cols-span-2">
                            <Label className='mb-2'>Descrição</Label>
                            <Textarea {...register('descricaoExperiencia')} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Habilidades</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-4">
                                <Input {...register(`habilidades.${index}`)} placeholder='Ex: Proativo' />
                                <Button
                                    type='button'
                                    variant='destructive'
                                    onClick={() => remove(index)}
                                >
                                    Remover
                                </Button>
                            </div>
                        ))}

                        <Button type='button' className='text-white' onClick={() => append('')}>
                            Adicionar Habilidade
                        </Button>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type='submit' className='text-white' disabled={loading}>
                        {loading ? 'Gerando Currículo...' : 'Gerar Currículo'}
                    </Button>
                </div>
            </form>

            <Button type='submit' className='text-white' disabled={loading}>
                {loading ? 'Salvando...' : 'Gerar Currículo'}
            </Button>
        </section>
    )
}