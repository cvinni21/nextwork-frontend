'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { fetchJobs } from "@/services/JobService"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import JobCard from "@/components/JobCard"
import { Code, Palette, Briefcase, Stethoscope, Hammer, GraduationCap } from "lucide-react"
import Footer from "@/components/Footer"

export default function HomePage() {
    const [jobs, setJobs] = useState([])
    const searchParams = useSearchParams()

    const categorias = [
        { icon: <Code className="w-6 h-6" />, title: "Tecnologia" },
        { icon: <Palette className="w-6 h-6" />, title: "Design" },
        { icon: <Briefcase className="w-6 h-6" />, title: "Administração" },
        { icon: <Stethoscope className="w-6 h-6" />, title: "Saúde" },
        { icon: <Hammer className="w-6 h-6" />, title: "Construção" },
        { icon: <GraduationCap className="w-6 h-6" />, title: "Educação" },
    ]

    useEffect(() => {
        const search = searchParams.get('search') || '';
        const local = searchParams.get('local') || '';
        loadJobs({ search, local });
    }, [searchParams.toString()]);

    const loadJobs = async (filters = {}) => {
        try {
            const data = await fetchJobs(filters)
            setJobs(data)
        } catch (err) {
            console.error('Erro ao buscar vagas:', err)
        }
    }

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
            <Header />

            <section
                className="relative w-full h-[500px] md:h-[500px] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/WorkStockImage.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/60 z-0" />
                <div className="z-10 px-4 w-full max-w-3xl">
                    <SearchBar />
                </div>
            </section>

            <section className="py-12 px-4 max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Escolha sua categoria</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {categorias.map((categoria, index) => (
                        <button
                            key={index}
                            className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow hover:shadow-lg transition"
                        >
                            {categoria.icon}
                            <span className="text-sm font-medium">{categoria.title}</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="py-12 px-4 max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Vagas que você pode se interessar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <JobCard
                                key={job.id}
                                id={job.id}
                                title={job.title}
                                company_logo={job.company_logo}
                                company={job.company}
                                location={job.location}
                                modality={job.modality}
                                salary={job.salary}
                                posted_at={job.posted_at}
                                description={job.description}
                                type={job.type}
                                area={job.area}
                            />
                        ))
                    ) : (
                        <p className="text-center col-span-full">Nenhuma vaga disponível no momento.</p>
                    )}
                </div>
            </section>
        </div>
    )
}
