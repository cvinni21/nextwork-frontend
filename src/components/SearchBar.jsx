import React from 'react'

const SearchBar = () => {
  return (
    <div>
        <input 
            type='text'
            placeholder='Pesquise uma vaga...'
            className='w-full md:w-2/3 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
    </div>
  )
}

export default SearchBar;