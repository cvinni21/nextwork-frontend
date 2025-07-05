'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { fetchJobs } from "@/services/JobService"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import JobCard from "@/components/JobCard"
import FilterSideBar from "@/components/FilterSideBar"
import { Button } from "@/components/ui/button"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import LoadingSpinner from "@/components/LoadingSpinner"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"

const ITEMS_PER_PAGE = 5

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loadingPage, setLoadingPage] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()
  const searchParams = useSearchParams();

  useEffect(() => {
    const filters = Object.fromEntries([...searchParams.entries()]);
    loadJobs(filters, page);
  }, [searchParams.toString(), page]);


  const handleAddJobClick = () => {
    setLoadingPage(true)
    router.push('/nova-vaga')
  }

  const loadJobs = async (filters = {}, currentPage = 1) => {
    try {
      const filtersWithPagination = {
        ...filters,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }

      const response = await fetchJobs(filtersWithPagination)
      console.log('Resposta Bruta da API:', response)

      const { data, total } = response

      setJobs(Array.isArray(data) ? data : [])
      setTotalPages(Math.ceil((total ?? 0) / ITEMS_PER_PAGE))
    } catch (err) {
      console.error('Erro ao buscar vagas:', err)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <div className="overflow-y-auto pb-10 bg-gray-100 dark:bg-gray-900 min-h-screen pt-30">
      <Header />
      <main className="max-w-6xl mx-auto px-4 mt-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {jobs.length} {jobs.length === 1 ? 'Vaga disponível' : 'Vagas Disponíveis'}
          </h2>
          <Button
            onClick={handleAddJobClick}
            className='bg-blue-600 text-white text-base px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-900 transition cursor-pointer'
            disabled={loadingPage}
          >
            {loadingPage ? <LoadingSpinner /> : <PlusCircledIcon />}
            {loadingPage ? 'Carregando...' : 'Adicionar Vaga'}
          </Button>
        </div>

        <div className="flex gap-6">
          <FilterSideBar />

          <div className="flex-1 flex flex-col gap-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  id={job.id}
                  key={job.id}
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
              <p>Nenhuma vaga disponível no momento.</p>
            )}

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>

                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href='#' onClick={() => handlePageChange(page - 1)} />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          isActive={pageNumber === page}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}
                  
                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext href='#' onClick={() => handlePageChange(page + 1)} />
                    </PaginationItem>
                  )}

                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}