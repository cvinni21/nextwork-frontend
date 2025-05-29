'use client'
import { useState, useEffect } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function SalaryInput({ value, onChange, error }) {
    const [type, setType] = useState(value?.type || '')
    const [min, setMin] = useState(value?.min || '')
    const [max, setMax] = useState(value?.max || '')
    const [exact, setExact] = useState(value?.exact || '')

    useEffect(() => {
        setType(value?.type || '')
        setMin(formatCurrency(value?.min || ''))
        setMax(formatCurrency(value?.max || ''))
        setExact(formatCurrency(value?.exact || ''))
    }, [value])

    const formatCurrency = (val) => {
        if (val === '' || val === null || val === undefined) return ''
        const num = Number(String(val).replace(/\D/g, ''))
        if (isNaN(num) || num === 0) return ''
        return num.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }

    const parseCurrency = (val) => {
        if (!val) return ''
        return val.replace(/\D/g,'')
    }

    const handleTypeChange = (newType) => {
        setType(newType)
        if (newType === 'match') {
            onChange({ type: 'match' })
        } else if (newType === 'range') {
            onChange({ type: 'range', min: '', max: '' })
            setMin('')
            setMax('')
        } else {
            onChange({ type: 'exact', exact: '' })
            setExact('')
        }
    }

    const handleMinChange = (e) => {
        const val = e.target.value
        const numericVal = parseCurrency(val)
        setMin(val)
        onChange({ type: 'range', min: numericVal, max })
    }

    const handleMaxChange = (e) => {
        const val = e.target.value
        const numericVal = parseCurrency(val)
        setMax(val)
        onChange({ type: 'range', min, max: numericVal })
    }

    const handleExactChange = (e) => {
        const val = e.target.value
        const numericVal = parseCurrency(val)
        setExact(val)
        onChange({ type: 'exact', exact: numericVal })
    }

    return (
        <div className="space-y-2">
            <Label htmlFor='salary-type'>Salário</Label>
            <Select value={type} onValueChange={handleTypeChange} id='salary-type'>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecione uma opção' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='match'>Á combinar</SelectItem>
                    <SelectItem value='range'>Faixa Salarial</SelectItem>
                    <SelectItem value='exact'>Valor Exato</SelectItem>
                </SelectContent>
            </Select>


            {type === 'range' && (
                <div className="relative flex gap-2 mt-2">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            placeholder="Mínimo"
                            min={0}
                            value={min}
                            onChange={handleMinChange}
                        />
                    </div>
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            placeholder="Máximo"
                            min={0}
                            value={max}
                            onChange={handleMaxChange}
                        />
                    </div>
                </div>
            )}

            {type === 'exact' && (
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Valor exato"
                        min={0}
                        value={exact}
                        onChange={handleExactChange}
                        className="mt-2"
                    />
                </div>
            )}

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    )
}