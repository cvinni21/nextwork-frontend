'use client'

import { AnimatePresence, motion } from "framer-motion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { Label } from "./ui/label"

export default function DynamicInputList({ label, values, onChange }) {
    const handleAdd = () => {
        onChange([...values, ''])
    }

    const handleRemove = (index) => {
        const newValues = values.filter((_, i) => i !== index)
        onChange(newValues)
    }

    const handleChange = (index, newValue) => {
        const newValues = [...values]
        newValues[index] = newValue
        onChange(newValues)
    }

    const getPlaceholder = () => {
        switch (label) {
            case 'Responsabilidades':
                return 'Ex: Desenvolver novas funcionalidades'
            case 'Qualificações':
                return 'Ex: Experiência com React'
            case 'Benefícios':
                return 'Ex: Vale-Refeição'
            default:
                return ''
        }
    }

    return (
        <div className="space-y-2">
            <Label htmlFor={`dynamic-input-0`}>{label}</Label>
            <AnimatePresence>
                {values.map((value, index) => (
                    <motion.div key={index} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="flex items-center space-x-2">
                        <Input
                            id={`dynamic-input-${index}`}
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder={getPlaceholder()}
                            className='flex-1'
                        />
                        {values.length > 1 && (
                            <Button type='button' variant='ghost' className='bg-red-50 hover:bg-red-200 dark:bg-red-400 dark:text-black' onClick={() => handleRemove(index)}>
                                <TrashIcon />
                            </Button>
                        )}
                        <Button type='button' variant='ghost' onClick={handleAdd} className='bg-blue-50 hover:bg-blue-200 dark:bg-blue-400 dark:text-black'>
                            <PlusIcon />
                        </Button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}