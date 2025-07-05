'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import Header from "@/components/Header"
import API_URL from "@/lib/apiKey"

export default function JobDetail() {
    const { id } = useParams()
    const [job, setJob] = useState(null)

    useEffect(() => {
        console.log('ID da vaga', id)
        if (id) {
            fetchJob()
        }
    }, [id])

    const fetchJob = async () => {
        try {
            const response = await axios.get(`${API_URL}jobs/${id}/`)
            console.log('Dados da vaga:', response.data)
            setJob(response.data)
        } catch (error) {
            console.error('Erro ao carregar a vaga:', error)
        }
    }

    if (!job) {
        return <div className="p-10 text-center text-gray-500">
            Carregando vaga...
        </div>
    }

    const {
        title, company, company_logo, location, salary, modality,
        type, area, seniority_level, description,
        responsibilities, qualifications, benefits, application_link, posted_at
    } = job

    const toNumber = (str) => {
        return Number(String(str).replace(/\D/g, '')) || 0;
    }

    const formatSalary = (salary) => {
        if (!salary || typeof salary !== 'object') return 'Não informado'

        if (salary.type === 'match') return 'À combinar'
        if (salary.type === 'exact') return toNumber(salary.exact).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        if (salary.type === 'range') {
            const min = toNumber(salary.min)
            const max = toNumber(salary.max)
            return `${min.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} - ${max.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`
        }

        return 'Não informado'
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">

                    <div className="flex items-center gap-4">
                        {company_logo && (
                            <img src={company_logo} alt={`logo de ${company}`} className="w-16 h-16 rounded object-contain border" />
                        )}
                        <div>
                            <h1 className="text-2xl font-bold">{title}</h1>
                            <p className="text-gray-600 dark:text-gray-300">{company} • {location}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(posted_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                        <div><strong>Área:</strong> {area}</div>
                        <div><strong>Regime:</strong> {type}</div>
                        <div><strong>Modalidade:</strong> {modality}</div>
                        <div><strong>Senioridade:</strong> {seniority_level}</div>
                        <div><strong>Salário:</strong> {formatSalary(salary)}</div>
                        <div><strong>Localização:</strong> {location}</div>
                    </div>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Descrição de vaga</h2>
                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{description}</p>
                    </section>

                    {responsibilities?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2">Responsabilidades</h2>\
                            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                                {responsibilities.map((item, idx) => <li key={idx}>{item.text}</li>)}
                            </ul>
                        </section>
                    )}

                    {qualifications?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2">Qualificações</h2>
                            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                                {qualifications.map((item, idx) => <li key={idx}>{item.text}</li>)}
                            </ul>
                        </section>
                    )}

                    {benefits?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2">Benefícios</h2>
                            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                                {benefits.map((item, idx) => <li key={idx}>{item.text}</li>)}
                            </ul>
                        </section>
                    )}

                    {application_link && (
                        <div className="pt-4">
                            <a
                                href={application_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Candidatar-se à vaga
                            </a>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}