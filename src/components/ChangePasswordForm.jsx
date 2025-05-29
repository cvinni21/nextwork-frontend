'use client'

import { useState } from "react";
import { changePassword } from "@/services/userService";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";


export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await changePassword({ current_password: currentPassword, new_password: newPassword });

            setCurrentPassword('');
            setNewPassword('');
            
            toast.success('Senha alterada com sucesso!')
        } catch (error) {
            toast.error('Erro ao alterar senha. Verifique sua senha atual.')
        } finally {
            setLoading(false);
        }
    };

    const isCurrentPasswordValid = currentPassword.length >= 6;

    return (
        <Card className='mt-6 w-full max-w-wd'>
            <CardContent className='p-4'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <Label>Senha Atual</Label>
                        <div className='relative'>
                            <LockClosedIcon className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                            <Input 
                                type='password'
                                placeholder='Senha atual'
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className='pl-8 mt-2'
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Nova Senha</Label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                type='password'
                                placeholder='Nova senha'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='pl-8 mt-2'
                                required
                                disabled={!isCurrentPasswordValid}
                            />
                        </div>
                    </div>

                    <Button type='submit' disabled={!isCurrentPasswordValid || loading} className='w-full dark:text-white'>
                        {loading ? 'Salvando...' : 'Alterar Senha'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}