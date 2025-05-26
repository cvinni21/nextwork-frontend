import React from 'react'

const FilterSideBar = () => {
  return (
    <aside className='w-64 bg-white border rounded-lg p-4 shadow-sm h-fit'>
        <h3 className='text-lg font-semibold mb-4'>Filtrar por</h3>

        <div className='mb-4'>
            <label className='block font-medium mb-2'>Tipo de Vaga</label>
            <div className='space-y-1'>
                <div><input type='checkbox'/> CLT</div>
                <div><input type='checkbox'/> Estágio</div>
                <div><input type='checkbox'/> Freelance</div>
            </div>
        </div>

        <div className='mb-4'>
            <label className='block font-medium mb-2'>Localização</label>
            <input 
                type='text'
                placeholder='Cidade ou Remoto'
                className='w-full p-2 border rounded-md'
            />
        </div>

        <div>
            <label className='block font-medium mb-2'>Área</label>
            <select className='w-full p-2 border rounded-md'>
                <option>Todos</option>
                <option>Tecnologia</option>
                <option>Design</option>
                <option>Marketing</option>
            </select>
        </div>
    </aside>
  )
}

export default FilterSideBar