'use client'

import React, { useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from './ui/menubar'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const salaryRanges = {
  hora: { min: 10, max: 100, step: 5, defaultValue: [15, 50], unit: 'R$ / Hora' },
  mensal: { min: 1500, max: 15000, step: 500, defaultValue: [1500, 5000], unit: 'R$ / Mês' },
  anual: { min: 18000, max: 600000, step: 5000, defaultValue: [18000, 600000], unit: 'R$ / Ano' },
}

const FilterSideBar = () => {
  const router = useRouter()
  const [salaryType, setSalaryType] = useState('mensal')
  const [range, setRange] = useState(salaryRanges[salaryType].defaultValue)
  const [types, setTypes] = useState([])
  const [area, setArea] = useState('')
  const [experience, setExperience] = useState('')
  const [postDate, setPostDate] = useState('qualquer')

  const handleSalaryTypeChange = (type) => {
    setSalaryType(type)
    setRange(salaryRanges[type].defaultValue)
  }

  const toggleType = (type) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleFilter = () => {
    const query = new URLSearchParams()

    if (types.length) query.set('type', types.join(','))
    if (area && area !== 'todos') query.set('area', area)
    if (experience && experience !== 'todas') query.set('experience', experience)
    if (postDate && postDate !== 'qualquer') query.set('date', postDate)
    query.set('salaryType', salaryType)
    query.set('salaryMin', range[0])
    query.set('salaryMax', range[1])

    router.push(`/dashboard?${query.toString()}`)
  }

  return (
    <aside className='w-64 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md'>
      <h3 className='text-lg font-semibold mb-6'>Filtrar por</h3>

      <div className='space-y-4'>
        <div className='space-y-2'>
          {['clt', 'estagio', 'freelance'].map((type) => (
            <div key={type} className='flex items-center gap-2'>
              <Checkbox
                id={type}
                checked={types.includes(type)}
                onCheckedChange={() => toggleType(type)}
              />
              <Label htmlFor={type}>{type.toUpperCase()}</Label>
            </div>
          ))}
        </div>

        <div>
          <Label className='mb-2 block font-semibold'>Área</Label>
          <Select onValueChange={setArea}>
            <SelectTrigger>
              <SelectValue placeholder='Selecione a área' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {['todos', 'tecnologia', 'design', 'marketing'].map((a) => (
                  <SelectItem key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className='mb-2 block font-semibold'>Faixa Salarial ({salaryRanges[salaryType].unit})</Label>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>{salaryType.charAt(0).toUpperCase() + salaryType.slice(1)}</MenubarTrigger>
              <MenubarContent>
                {Object.keys(salaryRanges).map((type) => (
                  <MenubarItem key={type} onSelect={() => handleSalaryTypeChange(type)}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <Slider
            value={range}
            min={salaryRanges[salaryType].min}
            max={salaryRanges[salaryType].max}
            step={salaryRanges[salaryType].step}
            onValueChange={(val) => setRange(val)}
            className='mt-4'
          />
          <div className='flex justify-between text-sm mt-1'>
            <span>{range[0].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            <span>{range[1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </div>

        <div>
          <Label className='mb-2 block font-semibold'>Data de Postagem</Label>
          <RadioGroup value={postDate} onValueChange={setPostDate} className='space-y-2'>
            {['qualquer', '24h', '7dias', '30dias'].map((val) => (
              <div key={val} className='flex items-center gap-2'>
                <RadioGroupItem value={val} id={val} />
                <Label htmlFor={val}>{val === 'qualquer' ? 'Qualquer' : `Últimos ${val}`}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label className='mb-2 block font-semibold'>Experiência</Label>
          <Select onValueChange={setExperience}>
            <SelectTrigger>
              <SelectValue placeholder='Selecione o nível' />
            </SelectTrigger>
            <SelectContent>
              {['junior', 'pleno', 'senior', 'estagio', 'todas'].map((level) => (
                <SelectItem key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleFilter} className='w-full mt-4 bg-blue-900 text-white'>
          Aplicar Filtros
        </Button>
      </div>
    </aside>
  )
}

export default FilterSideBar
