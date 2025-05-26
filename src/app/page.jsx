'use client'
import { useEffect, useState } from 'react'
import { fetchJobs, createJob } from '@/services/JobService'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import JobCard from '../components/JobCard'
import FilterSideBar from '../components/FilterSideBar'

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    company: '',
    type: '',
    modality: '',
  })

  const [companyLogoFile, setCompanyLogoFile] = useState(null)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      const data = await fetchJobs()
      setJobs(data)
    } catch (err) {
      console.error('Erro ao buscar vagas:', err)
    }
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('salary', formData.salary);
    data.append('company', formData.company);
    data.append('type', formData.type);
    data.append('modality', formData.modality);

    if (companyLogoFile) {
      data.append('company_logo', companyLogoFile);
    }

    try {
      const newJob = await createJob(data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setJobs(prev => [...prev, newJob])

      setFormData({
        title: '',
        description: '',
        location: '',
        salary: '',
        company: '',
        modality: '',
        type: '',
      })
      setCompanyLogoFile(null)
      setShowForm(false)
    } catch (err) {
      console.error('Erro ao adicionar vaga:', err)
      alert('Erro ao adicionar vaga')
    }
  }

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-4 mt-6">
        <SearchBar />

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Vagas Disponíveis</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Adicionar Vaga
          </button>
        </div>

        <div className="flex gap-6">
          <FilterSideBar />

          <div className="flex-1 flex flex-col gap-4">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <JobCard
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
          </div>
        </div>
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow max-w-md w-full space-y-4"
          >
            <h3 className="text-lg font-bold">Adicionar nova vaga</h3>

            {[
              { name: 'title', placeholder: 'Título da vaga' },
              { name: 'description', placeholder: 'Descrição' },
              { name: 'location', placeholder: 'Localização' },
              { name: 'company', placeholder: 'Nome da empresa' },
              { name: 'type', placeholder: 'Tipo de vaga (ex: CLT, PJ, Estágio...)' },
              { name: 'salary', placeholder: 'Salário (ex: À combinar)' },
              { name: 'modality', placeholder: 'Modalidade (ex: Remoto, Presencial)' },
            ].map(field => (
              <input
                key={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            ))}

            <div>
              <label htmlFor='company_logo' className='block mb-1 font-medium'>
                Logo da Empresa (Opcional)
              </label>

              <input
                id='company_logo'
                type='file'
                accept='image/*'
                onChange={e => setCompanyLogoFile(e.target.files[0])}
                className='hidden'
              />
              <label htmlFor='company_logo' className='cursor-pointer text-blue-600 underline'>
                Escolher logo da empresa
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded border border-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
