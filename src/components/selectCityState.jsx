'use client'
import { useEffect, useState } from "react"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"

export default function StateCitySelector({ onChange }) {
  const [statesList, setStatesList] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)

  useEffect(() => {
    async function fetchStates() {
      try {
        const res = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        )
        const data = await res.json()
        setStatesList(data)
      } catch (err) {
        console.error("Erro ao carregar estados:", err)
      }
    }
    fetchStates()
  }, [])

  useEffect(() => {
    if (selectedState) {
      async function fetchCities() {
        try {
          const res = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState.id}/municipios`
          )
          const data = await res.json()
          setCities(data)
        } catch (err) {
          console.error("Erro ao carregar cidades:", err)
        }
      }
      fetchCities()
      setSelectedCity(null) // limpa a cidade ao mudar estado
    } else {
      setCities([])
      setSelectedCity(null)
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedState && selectedCity) {
      onChange && onChange(`${selectedCity.nome}-${selectedState.sigla}`)
    }
  }, [selectedCity, selectedState, onChange])

  return (
    <div className="flex gap-4 items-center">
      {selectedState && (
        <div className="flex-1 transition-all duration-300">
          <Label htmlFor='cidade'className='mb-2'>Cidade</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-full justify-between'
                id='cidade'
              >
                {selectedCity ? selectedCity.nome : 'Selecione a cidade'}
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0 max-h-60 overflow-auto transition-all duration-300 ease-in-out'>
              <Command>
                <CommandInput placeholder='Buscar cidade...' />
                <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                <CommandGroup>
                  {cities.map((cidade) => (
                    <CommandItem
                      key={cidade.id}
                      value={cidade.nome}
                      onSelect={() => setSelectedCity(cidade)}
                      className='cursor-pointer'
                    >
                      {cidade.nome}
                      {selectedCity?.id === cidade.id && (
                        <CheckIcon className="ml-auto h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className={`transition-all duration-300 flex flex-col items-end ${selectedState ? 'w-40' : 'w-full'}`}>
        <Label htmlFor='estado' className='self-start mb-2'>Estado (UF)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='w-full justify-between'
              id='estado'
            >
              {selectedState ? selectedState.sigla : 'Selecione o estado'}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full p-0 max-h-60 overflow-auto transition-all duration-300 ease-in-out'>
            <Command>
              <CommandInput placeholder='Buscar estado...' />
              <CommandEmpty>Nenhum estado encontrado.</CommandEmpty>
              <CommandGroup>
                {statesList.map((estado) => (
                  <CommandItem
                    key={estado.id}
                    value={estado.sigla}
                    onSelect={() => {
                      setSelectedState(estado)
                    }}
                    className='cursor-pointer'
                  >
                    {estado.sigla}
                    {selectedState?.id === estado.id && (
                      <CheckIcon className="ml-auto h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>

  )
}
