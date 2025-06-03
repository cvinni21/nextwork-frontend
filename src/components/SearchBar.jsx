'use client'

import React, { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command'
import {
  CheckIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [citySearch, setCitySearch] = useState('')

  useEffect(() => {
    fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
    )
      .then((res) => res.json())
      .then((data) => setStates(data))
  }, [])

  useEffect(() => {
    if (selectedState) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState.id}/municipios`
      )
        .then((res) => res.json())
        .then((data) => setCities(data))
      setSelectedCity(null)
      setCitySearch('') // limpa a busca ao mudar o estado
    }
  }, [selectedState])

  const handleSearch = () => {
    const query = new URLSearchParams()
    if (searchText) query.set('search', searchText)
    if (selectedCity && selectedState) {
      query.set('local', `${selectedCity.nome}-${selectedState.sigla}`)
    } else if (selectedState) {
      query.set('local', selectedState.sigla)
    }
    router.push(`/dashboard?${query.toString()}`)
  }

  return (
    <div className="flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/30 shadow-md backdrop-blur-md">
      <Input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Pesquise uma vaga ou selecione uma cidade"
        className="bg-transparent border-none focus:ring-0 focus-visible:ring-0 shadow-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-gray-700 dark:text-gray-400 hover:bg-gray-100"
          >
            {selectedCity
              ? `${selectedCity.nome}/${selectedState?.sigla}`
              : 'Local'}
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <p className="text-sm mb-2 text-gray-500">Selecione o estado</p>
              <Command className='max-h-60 overflow-y-auto'>
                <CommandInput placeholder="Buscar estado..." />
                <CommandEmpty>Nenhum estado encontrado</CommandEmpty>
                <CommandGroup className='max-h-48 overflow-y-auto'>
                  {states.map((estado) => (
                    <CommandItem
                      key={estado.id}
                      value={estado.sigla}
                      onSelect={(value) => {
                        const selected = states.find((estado) => estado.sigla === value)
                        if (selected) setSelectedState(selected)
                      }}
                      className="cursor-pointer"
                    >
                      {estado.sigla} - {estado.nome}
                      {selectedState?.id === estado.id && (
                        <CheckIcon className="ml-auto h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </div>

            {selectedState && (
              <div className="w-1/2">
                <p className="text-sm mb-2 text-gray-500">Selecione a cidade</p>
                <Command className='max-h-60 overflow-y-auto'>
                  <CommandInput placeholder="Buscar cidade..." />
                  <CommandEmpty>Nenhuma cidade encontrada</CommandEmpty>
                  <CommandGroup className='max-h-48 overflow-y-auto'>
                    {cities.map((cidade) => (
                      <CommandItem
                        key={cidade.id}
                        value={cidade.nome}
                        onSelect={(value) => {
                          const selected = cities.find((cidade) => cidade.nome === value)
                          if (selected) setSelectedCity(selected)
                        }}
                        className="cursor-pointer"
                      >
                        {cidade.nome}
                        {selectedCity?.id === cidade.id && (
                          <CheckIcon className="ml-auto h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <Button
        onClick={handleSearch}
        className="ml-2 bg-blue-900/90 hover:bg-blue-900 text-white"
      >
        <MagnifyingGlassIcon className="w-4 h-4" />
        Buscar
      </Button>
    </div>
  )
}
