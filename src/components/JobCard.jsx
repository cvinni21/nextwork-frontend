import React from "react";
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
    return (
        <div className="bg-white border-1 border-gray-200 hover:shadow-md rounded-lg p-4 transition w-full max-w-6xl flex gap-6 items-start cursor-pointer">
            {/* Logo fixa à esquerda */}
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-gray-100 rounded">
                {company_logo ? (
                    <img
                        src={company_logo.startsWith('http') ? company_logo : `${API_URL}${company_logo}`}
                        alt={`${company} logo`}
                        className="w-16 h-16 object-contain"
                    />
                ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                        Logo
                    </div>
                )}
            </div>

            {/* Informações ao lado da logo */}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-700 text-sm mb-1">{company}</p>
                        <h2 className="text-2xl font-bold text-black">{title}</h2>
                    </div>

                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        {type}
                    </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-4 text-gray-600 text-base">
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
                        <span>{salary}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <FaCalendar />
                        <span>{formatDate(posted_at)}</span>
                    </div>
                </div>

                <div className="mt-3 text-gray-700 text-sm line-clamp-3 mb-6">
                    {description}
                </div>
            </div>
        </div>
    )
}

export default JobCard;