'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { LinkedInLogoIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { FaGoogle } from "react-icons/fa6"
import { login } from "@/services/AuthService"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from '@/contexts/AuthContext';
import { TermsDialog } from "@/components/TermsDialog"

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { setUser, setAccessToken, setRefreshToken } = useAuth()


    function getUserIdFromToken(token) {
        if (!token) return null;

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            const payload = JSON.parse(jsonPayload);
            return payload.user_id || null;
        } catch {
            return null;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(
                { email, password },
                setUser,
                setAccessToken,
                setRefreshToken
            );

            router.push('/dashboard');
        } catch (err) {
            setError('Crendeciais inválidas. Tente novamente.')
            console.error(err);
        }
    }

    return (
        <main className="h-screen flex w-full">
            <div className="bg-blue-950 w-1/2 h-full flex flex-col justify-between p-16">
                <div className="flex justify-center w-full">
                    <Carousel className='w-full max-w-xl'>
                        <CarouselContent>
                            {[1, 2, 3, 4].map((num) => (
                                <CarouselItem key={num}>
                                    <div className="flex aspect-square rounded p-8">
                                        <Image
                                            src={`/assets/work${num}.svg`}
                                            alt={`Ilustracao ${num}`}
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <p className="text-center text-white mt-4">Conectando você a novas oportunidades...</p>
            </div>
            <section className="flex items-center justify-center bg-white dark:bg-gray-900 h-full w-1/2 p-8">
                <Card className='w-full max-w-md shadow-xl'>
                    <CardHeader>
                        <CardTitle className='text-2xl font-extrabold tracking-tighter text-blue-900 dark:text-blue-500'>
                            Entre com sua conta!
                        </CardTitle>
                        <CardDescription>
                            Seja Bem Vindo! Escolha o metodo de Login:
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-1/2">
                                <Button variant='outline' className='w-full flex justify-center gap-2 cursor-pointer'>
                                    <FaGoogle className="text-blue-900 dark:text-blue-500 w-4 h-4" />
                                    Google
                                </Button>
                            </div>
                            <div className="w-1/2">
                                <Button variant='outline' className='w-full flex justify-center gap-2 cursor-pointer'>
                                    <LinkedInLogoIcon className="text-blue-900 dark:text-blue-500 w-4 h-4" />
                                    LinkedIn
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <Separator className='flex-1' />
                            <span className="text-xs text-muted-foreground">ou faça login com email</span>
                            <Separator className='flex-1' />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label 
                                    htmlFor='email' 
                                    className='mb-2'
                                >
                                    Email:
                                </Label>
                                <Input 
                                    id='email' 
                                    placeholder='exemplo@gmail.com' 
                                    type='email' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor='senha' className='mb-2' >
                                    Senha:
                                </Label>
                                <Input 
                                    id='senha' 
                                    placeholder='Sua senha:' 
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>

                            {error && <p className="text-red-600 mt-2">{error}</p>}

                            <Button className='mt-6 w-full bg-blue-900 dark:bg-blue-600 cursor-pointer dark:text-white'>
                                Entrar
                            </Button>
                        </form>
                        <Separator className='flex-1' />
                        <Button variant='outline' className='mt-6 w-full cursor-pointer' onClick={() => router.push('/register')}>
                            Registre-se
                        </Button>
                    </CardContent>
                    <CardFooter>
                        <p className="text-muted-foreground text-center text-sm">
                            Ao Entrar em nossa plataforma você concorda com nossos <TermsDialog />
                        </p>
                    </CardFooter>
                </Card>
            </section>
        </main>
    )
}