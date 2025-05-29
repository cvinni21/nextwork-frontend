'use client'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createJob } from '@/services/JobService'
import Header from '@/components/Header'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import StateCitySelector from '@/components/selectCityState'
import DynamicInputList from '@/components/DynamicInputList'
import LogoUploader from '@/components/LogoUploader'
import JobSelectData from '../../data/job_select_data.json'
import SalaryInput from '@/components/SalaryInput'


export default function NovaVaga() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: { type: '' },
        company: '',
        type: '',
        modality: '',
        area: '',
        seniority_level: '',
        responsibilities: [''],
        qualifications: [''],
        benefits: [''],
        application_link: '',
    })
    const [formErrors, setFormErrors] = useState({})

    const [companyLogoFile, setCompanyLogoFile] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLocationChange = useCallback(
        (value) => {
            setFormData((prev) => ({ ...prev, location: value }))
        },
        [setFormData]
    )

    const handleSubmit = async (e) => {
        e.preventDefault()

        let errors = {}

        if (!formData.salary?.type) {
            errors.salary = 'Por favor, selecione um valor salarial.'
        }

        if(Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        const data = new FormData()
        for (let key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach(item => data.append(`${key}[]`, item))
            } else if (typeof formData[key] === 'object' && formData[key] !== null) {
                data.append(key, JSON.stringify(formData[key]))
            } else {
                data.append(key, formData[key])
            }
        }
        if (companyLogoFile) {
            data.append('company_logo', companyLogoFile)
        }

        try {
            await createJob(data)
            router.push('/dashboard')
        } catch (err) {
            console.error('Erro ao cadastrar a vaga:', err)
            alert('Erro ao cadastrar vaga')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <main className="max-w-3xl mx-auto px-4 py-10">
                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-semibold">Cadastrar nova vaga</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Preencha os campos abaixo para publicar uma nova vaga
                        </p>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">

                            <Label htmlFor='title'>Título da vaga: </Label>
                            <Input name="title" placeholder="Título da vaga" value={formData.title} onChange={handleChange} required />

                            <Label htmlFor='company'>Empresa:</Label>
                            <Input 
                                id='company'
                                name='company'
                                placeholder='Nome da Empresa: (ex: Microsoft, Apple...)'
                                value={formData.company}
                                onChange={handleChange}
                                required
                            />

                            <Label htmlFor='area'>Área: </Label>
                            <Select onValueChange={(value) => setFormData({ ...formData, area: value })} value={formData.area}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Área' />
                                </SelectTrigger>
                                <SelectContent>
                                    {JobSelectData.area.map((areaOption) => (
                                        <SelectItem key={areaOption} value={areaOption}>
                                            {areaOption}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            <Label htmlFor='senioridade'>Senioridade: </Label>
                            <Select onValueChange={(value) => setFormData({ ...formData, seniority_level: value })} value={formData.seniority_level}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Senioridade' />
                                </SelectTrigger>
                                <SelectContent>
                                    {JobSelectData.seniority_level.map((seriority_levelOption) => (
                                        <SelectItem key={seriority_levelOption} value={seriority_levelOption}>
                                            {seriority_levelOption}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            <Label htmlFor='tipo_contrato'>Tipo de Contrato: </Label>
                            <Select onValueChange={(value) => setFormData({ ...formData, type: value })} value={formData.type}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Tipo de Contrato' />
                                </SelectTrigger>
                                <SelectContent>
                                    {JobSelectData.contract_type.map((contract_typeOption) => (
                                        <SelectItem key={contract_typeOption} value={contract_typeOption}>
                                            {contract_typeOption}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            <Label htmlFor='modalidade'>Modalidade: </Label>
                            <Select onValueChange={(value) => setFormData({ ...formData, modality: value })} value={formData.modality}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Modalidade: ' />
                                </SelectTrigger>
                                <SelectContent>
                                    {JobSelectData.modality.map((modalityOption) => (
                                        <SelectItem key={modalityOption} value={modalityOption}>
                                            {modalityOption}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <SalaryInput 
                                value={formData.salary}
                                onChange={(newSalary) => setFormData({ ...formData, salary: newSalary })}
                                error={formErrors.salary}
                            />

                            <StateCitySelector onChange={handleLocationChange} />

                            <Label htmlFor='description'>Descrição da Vaga:</Label>
                            <Textarea name='description' placeholder='Descrição da vaga' value={formData.description} onChange={handleChange} required className='h-24' />

                            <DynamicInputList
                                label='Responsabilidades'
                                values={formData.responsibilities}
                                onChange={(values) => setFormData({ ...formData, responsibilities: values })}
                            />

                            <DynamicInputList
                                label='Qualificações'
                                values={formData.qualifications}
                                onChange={(values) => setFormData({ ...formData, qualifications: values })}
                            />

                            <DynamicInputList
                                label='Benefícios'
                                values={formData.benefits}
                                onChange={(values) => setFormData({ ...formData, benefits: values })}
                            />

                            <Label htmlFor='application_link'>Link para Candidatura</Label>

                            <Input name="application_link" type="url" placeholder="Link de candidatura (opcional)" value={formData.application_link} onChange={handleChange} />

                            <Label className='company_logo'>Logo da Empresa (opcional)</Label>
                            <LogoUploader
                                onFileSelect={(file) => setCompanyLogoFile(file)}
                                preview={companyLogoFile ? URL.createObjectURL(companyLogoFile) : null}
                            />

                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full text-white mt-4">
                                Publicar Vaga
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </div>
    )
}
