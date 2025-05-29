'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import API_URL from './../lib/apiKey';

const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-br', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

const JobCard = ({
    id,
    title,
    company,
    location,
    modality,
    salary,
    posted_at,
    description,
    company_logo,
    type
}) => {

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

    const router = useRouter()

    const handleClick = () => {
        router.push(`/vaga/${id}`)
    }

    return (
        <div
            onClick={handleClick}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:bg-gray-900 rounded-lg p-4 transition w-full max-w-6xl flex gap-6 items-start cursor-pointer"
        >
            {/* Logo fixa à esquerda */}
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
                {company_logo ? (
                    <img
                        src={company_logo.startsWith('http') ? company_logo : `${API_URL}${company_logo}`}
                        alt={`${company} logo`}
                        className="w-16 h-16 object-contain"
                    />
                ) : (
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
                        Logo
                    </div>
                )}
            </div>

            {/* Informações ao lado da logo */}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">{company}</p>
                        <h2 className="text-2xl font-bold text-black dark:text-gray-200">{title}</h2>
                    </div>

                    <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded">
                        {type}
                    </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 text-base">
                    <div className="flex items-center gap-1">
                        <CiLocationOn />
                        <span>{location}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <IoMdTime />
                        <span>{modality}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <FaDollarSign />
                        <span>{formatSalary(salary)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <FaCalendar />
                        <span>{formatDate(posted_at)}</span>
                    </div>
                </div>

                <div className="mt-3 text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-6">
                    {description}
                </div>
            </div>
        </div>
    )
}

export default JobCard;