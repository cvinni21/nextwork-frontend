import React, { useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from './ui/menubar'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const salaryRanges = {
    hora: { min: 10, max: 100, step: 5, defaultValue: [15, 50], unit: 'R$ / Hora' },
    mensal: { min: 1500, max: 15000, step: 500, defaultValue: [1500, 5000], unit: 'R$ / Mês' },
    anual: { min: 1800, max: 18000, step: 5000, defaultValue: [18000, 600000], unit: 'R$ / Ano' },
};


const FilterSideBar = () => {
    const [salaryType, setSalaryType] = useState('mensal');
    const [range, setRange] = useState(salaryRanges[salaryType].defaultValue)

    const handleSalaryTypeChange = (type) => {
        setSalaryType(type);
        setRange(salaryRanges[type].defaultValue);
    };

    return (
        <aside className='w-64 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md'>
            <h3 className='text-lg font-semibold mb-6'>Filtrar por</h3>

            <div className='mb-6'>
                <div className='space-y-2 flex flex-col'>
                    <div className='flex items-center gap-2'>
                        <Checkbox id='clt' value='clt' />
                        <Label htmlFor='clt'>CLT</Label>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox id='estagio' value='estagio' />
                        <Label htmlFor='estagio'>Estágio</Label>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox id='freelance' value='freelance' />
                        <Label htmlFor='freelance'>Freelance</Label>
                    </div>
                </div>

                <div className='mb-6 mt-6'>
                    <Label htmlFor='location' className='mb-2 block font-semibold'>
                        Área
                    </Label>
                    <Select className='cursor-pointer'>
                        <SelectTrigger id='area'>
                            <SelectValue placeholder='Selecione a área' />
                        </SelectTrigger>
                        <SelectContent className=' dark:bg-gray-800'>
                            <SelectGroup>
                                <SelectItem value='todos' className='cursor-pointer dark:hover:bg-gray-700'>Todos</SelectItem>
                                <SelectItem value='tecnologia' className='cursor-pointer dark:hover:bg-gray-700'>Tecnologia</SelectItem>
                                <SelectItem value='design' className='cursor-pointer dark:hover:bg-gray-700'>Design</SelectItem>
                                <SelectItem value='marketing' className='cursor-pointer dark:hover:bg-gray-700'>Marketing</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className='mb-6'>
                    <Label className='mb-2 block font-semibold'>Faixa Salarial ({salaryRanges[salaryType].unit})</Label>

                    <Menubar className='bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-pointer'>
                        <MenubarMenu className='cursor-pointer'>
                            <MenubarTrigger className='bg-gray-100 dark:bg-gray-700 text-sm py-1.5 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer'>{salaryType.charAt(0).toUpperCase() + salaryType.slice(1)}</MenubarTrigger>
                            <MenubarContent className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md'>
                                <MenubarItem onSelect={() => handleSalaryTypeChange('hora')} className='cursor-pointer dark:hover:bg-gray-700'>Hora</MenubarItem>
                                <MenubarItem onSelect={() => handleSalaryTypeChange('mensal')} className='cursor-pointer dark:hover:bg-gray-700'>Mensal</MenubarItem>
                                <MenubarItem onSelect={() => handleSalaryTypeChange('anual')} className='cursor-pointer dark:hover:bg-gray-700'>Anual</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>

                    <Slider
                        value={range}
                        max={salaryRanges[salaryType].max}
                        min={salaryRanges[salaryType].min}
                        step={salaryRanges[salaryType].step}
                        onValueChange={(val) => setRange(val)}
                        aria-label='Faixa Salarial'
                        className='w-full mt-4'
                        defaultValue={salaryRanges[salaryType].defaultValue}
                    >
                    </Slider>
                    <div className='flex justify-between text-sm mt-1'>
                        <span>{range[0].toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                        <span>{range[1].toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                    </div>
                </div>

                <div className='mb-6'>
                    <Label className='mb-2 block font-semibold'>Data de Postagem</Label>
                    <RadioGroup defaultValue='qualquer' className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <RadioGroupItem value='qualquer' id='qualquer' />
                            <Label htmlFor='qualquer'>Qualquer</Label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <RadioGroupItem value='24h' id='24h' />
                            <Label htmlFor='24h'>Últimas 24h</Label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <RadioGroupItem value='7dias' id='7dias' />
                            <Label htmlFor='7dias'>Últimos 7 dias</Label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <RadioGroupItem value='30dias' id='30dias' />
                            <Label htmlFor='30dias'>Últimos 30 dias</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div>
                    <Label htmlFor='experience' className='mb-2 block font-semibold'>
                        Experiência
                    </Label>
                    <Select>
                        <SelectTrigger id='experience'>
                            <SelectValue placeholder='Selecione o nível' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='junior'>Júnior</SelectItem>
                                <SelectItem value='pleno'>Pleno</SelectItem>
                                <SelectItem value='senior'>Sênior</SelectItem>
                                <SelectItem value='estagio'>Estágio</SelectItem>
                                <SelectItem value='todas'>Todas</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </aside>
    )
}

export default FilterSideBar