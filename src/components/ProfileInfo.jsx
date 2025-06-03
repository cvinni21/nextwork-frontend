'use client'

import { useState, useEffect } from "react"
import { getUserProfile, uploadProfilePhoto } from "@/services/userService"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"
import ProfileAvatar from "./ProfileAvatar"

export default function ProfileInfo() {
    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useAuth()
    const [profile, setProfile] = useState(null)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        course: '',
        skills: '',
        linkedin: '',
        github: '',
    })

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getUserProfile(accessToken)
                setProfile(data)
                setForm({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    course: data.course || '',
                    skills: data.skills || '',
                    linkedin: data.linkedin || '',
                    github: data.github || '',
                })
            } catch (err) {
                toast.error('Erro ao carregar perfil.')
            }
        }

        loadProfile()
    }, [accessToken])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value)
            })

            const updated = await uploadProfilePhoto(formData, accessToken)
            setProfile(updated)
            toast.success('Perfil atualizado com sucesso')
        } catch (err) {
            toast.error('Erro ao atualizar perfil')
        }
    }

    if (!profile) return <p>Carregando dados...</p>

    return (
        <form onSubmit={handleSubmit} className='space-y-6 max-w-xl'>
            <div className="flex items-center gap-6">
                <ProfileAvatar user={profile} onUpdate={setProfile} />

                <div>
                    <h2 className="text-xl font-semibold">
                        {profile.first_name} {profile.last_name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">{profile.course}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Nome</Label>
                    <Input name='first_name' value={form.first_name} onChange={handleChange} className='mt-2'/>
                </div>
                <div>
                    <Label>Sobrenome</Label>
                    <Input name='last_name' value={form.last_name} onChange={handleChange} className='mt-2'/>
                </div>
            </div>

            <div>
                <Label>Curso</Label>
                <Input name='course' value={form.course} onChange={handleChange} className='mt-2'/> 
            </div>

            <div>
                <Label>Habilidades</Label>
                <Input name='skills' value={form.skills} onChange={handleChange} className='mt-2'/>
            </div>

            <div>
                <Label>LinkedIn</Label>
                <Input name='linkedin' value={form.linkedin} onChange={handleChange} className='mt-2'/> 
            </div>

            <div>
                <Label>GitHub</Label>
                <Input name='github' value={form.github} onChange={handleChange} className='mt-2'/>
            </div>

            <Button type='submit' className='w-full dark:text-white'>
                Salvar Alterações
            </Button>
        </form>
    )
}