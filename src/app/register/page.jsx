'use client';
import Head from "next/head";
import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import api from "@/lib/axiosInstance";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowBottomLeftIcon, CheckCircledIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { register, login } from "@/services/AuthService";
import { useAuth } from "@/contexts/AuthContext";
import { TermsDialog } from "@/components/TermsDialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    course: "",
    skills: "",
    linkedin: "",
    github: "",
    acceptedTerms: false,
  });

  const router = useRouter();
  const { setUser, setAccessToken, setRefreshToken } = useAuth();

  const firstInputRef = useRef(null);
  const courseInputRef = useRef(null);

  useEffect(() => {
    if (step === 1 && firstInputRef.current) {
      firstInputRef.current.focus();
    } else if (step === 2 && courseInputRef.current) {
      courseInputRef.current.focus();
    }
  }, [step]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    setGeneralError('');
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = ['Nome é obrigatório.']
    if (!formData.last_name.trim()) newErrors.last_name = ['Sobrenome é obrigatório.']
    if (!formData.username.trim()) newErrors.username = ['Nome de usuário é obrigatório.']
    if (!formData.email.trim()) newErrors.email = ['Email é obrigatório.']
    if (!formData.password.trim()) newErrors.password = ['Senha é obrigatória.']
    if (!formData.confirm_password.trim()) newErrors.confirm_password = ['Confirmação de senha é obrigatória.']
    if (formData.password !== formData.confirm_password) newErrors.confirm_password = ['As senhas não coincidem.']

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (!formData.username.trim() || !formData.email.trim()) {
      setErrors({
        username: !formData.username.trim() ? ['Nome de usuário é obrigatório.'] : null,
        email: !formData.email.trim() ? ['Email é obrigatório.'] : null,
      });
      return;
    }

    setLoading(true);
    setGeneralError('');

    try {
      console.log('Enviado para validação:', { username: formData.username, email: formData.email });
      const response = await api.post('validate-register/', {
        username: formData.username,
        email: formData.email,
      });
      setStep(2);
    } catch (error) {
      console.error('Erro na validação do back end: ', error.response?.data || error.message);

      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setGeneralError('Erro inesperado na validação. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const isStep1Valid =
    formData.first_name.trim() !== '' &&
    formData.last_name.trim() !== '' &&
    formData.username.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.confirm_password.trim() !== '' &&
    formData.password === formData.confirm_password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step !== 2) return;

    if (!formData.acceptedTerms) {
      setErrors({ acceptedTerms: ['Você precisa aceitar os termos para continuar.'] });
      return;
    }

    setSubmitting(true);
    setGeneralError("");

    try {
      console.log("Dados enviados para cadastro:", formData);
      await register(formData);

      const loginResponse = await login({
        email: formData.email,
        password: formData.password,
      }, setUser, setAccessToken, setRefreshToken);

      localStorage.setItem('accessToken', loginResponse.access);
      localStorage.setItem('refreshToken', loginResponse.refresh);

      router.push('/curriculo');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        setStep(1);
      } else {
        setGeneralError('Erro inesperado no cadastro. Tente novamente mais tarde.');
      }
    } finally {
      setSubmitting(false);
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
                      alt={`Ilustração ${num}`}
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
        <p className="text-center text-white mt-4">Dê o primeiro passo na sua carreira...</p>
      </div>

      <section className="flex items-center justify-center bg-white dark:bg-gray-900 h-full w-1/2 p-8">
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-2xl font-extrabold tracking-tighter text-blue-900 dark:text-blue-500'>
              Crie sua conta!
            </CardTitle>
            <CardDescription>
              Preencha os dados abaixo para se registrar:
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="flex gap-4">
                    <div className="w-1/2 space-y-2">
                      <Label htmlFor='first_name'>Nome</Label>
                      <Input name='first_name' value={formData.first_name} placeholder='Ex: João...' onChange={handleChange} required ref={firstInputRef} />
                      {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name[0]}</p>}
                    </div>
                    <div className="w-1/2 space-y-2">
                      <Label htmlFor='last_name'>Sobrenome</Label>
                      <Input name='last_name' value={formData.last_name} placeholder='Ex: Silva...' onChange={handleChange} required />
                      {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name[0]}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor='username'>Nome de Usuário</Label>
                    <Input name='username' value={formData.username} placeholder='Ex: jbsilva123...' onChange={handleChange} required />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username[0]}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor='email'>Email</Label>
                    <Input name='email' value={formData.email} placeholder='Ex: exemplo@gmail.com' onChange={handleChange} required />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor='password'>Senha</Label>
                    <Input type='password' name='password' value={formData.password} placeholder='Ex: suasenha231' onChange={handleChange} required />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor='confirm_password'>Confirme sua senha</Label>
                    <Input type='password' name='confirm_password' value={formData.confirm_password} placeholder='Ex: suasenha231' onChange={handleChange} required />
                    {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password[0]}</p>}
                  </div>

                  <Button
                    type='button'
                    className={`w-full cursor-pointer ${isStep1Valid ? 'bg-blue-900 dark:text-white' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={loading}
                    onClick={handleNextStep}
                  >
                    Próximo
                    <ArrowRightCircle />
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <Label htmlFor='course'>Formação (opcional)</Label>
                    <Input name='course' placeholder='Ex: Análise e Desenvolvimento de Sistemas...' value={formData.course} onChange={handleChange} ref={courseInputRef} className='mt-2' />
                  </div>

                  <div>
                    <Label htmlFor='skills'>Habilidades (opcional)</Label>
                    <Input name='skills' placeholder='Ex: Proativo, Python Básico' value={formData.skills} onChange={handleChange} className='mt-2' />
                  </div>

                  <div>
                    <Label htmlFor='linkedin'>LinkedIn (opcional)</Label>
                    <Input name='linkedin' placeholder='Ex: linkedln.com/seuperfil' value={formData.linkedin} onChange={handleChange} className='mt-2' />
                  </div>

                  <div>
                    <Label htmlFor='github'>GitHub (opcional)</Label>
                    <Input name='github' placeholder='Ex: github.com/seuperfil' value={formData.github} onChange={handleChange} className='mt-2' />
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id='acceptedTerms'
                      name='acceptedTerms'
                      checked={formData.acceptedTerms}
                      onCheckedChange={(checked) => {
                        setFormData(prev => ({ ...prev, acceptedTerms: checked || false }));
                        setErrors(prev => ({ ...prev, acceptedTerms: null }));
                      }}
                    />
                    <Label htmlFor='acceptedTerms' className='cursor-pointer selected-none text-sm'>
                      Eu aceito os <TermsDialog />
                    </Label>
                  </div>

                  {errors.acceptedTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptedTerms[0]}</p>}

                  <Button
                    type='submit'
                    className='w-full bg-blue-900 cursor-pointer dark:text-white'
                    disabled={!formData.acceptedTerms || submitting}
                  >
                    Finalizar Cadastro
                    <CheckCircledIcon />
                  </Button>
                </>
              )}
            </form>
            {generalError && <p className="text-red-500 text-center">{generalError}</p>}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type='button' onClick={() => router.push('/login')} variant='outline' className='w-full cursor-pointer'>
              Já tem uma conta?<p className="underline">Faça Login</p>
            </Button>
            <div className="flex items-center gap-4 w-full">
              <div className="w-1/2">
                <Button variant='outline' className='w-full flex justify-center gap-2 cursor-pointer'>
                  <FaGoogle className="text-blue-900 w-4 h-4 dark:text-blue-500" />
                  Google
                </Button>
              </div>
              <div className="w-1/2">
                <Button variant='outline' className='w-full flex justify-center gap-2 cursor-pointer'>
                  <LinkedInLogoIcon className="text-blue-900 w-4 h-4 dark:text-blue-500" />
                  LinkedIn
                </Button>
              </div>
            </div>

            <p className="text-muted-foreground text-center text-sm">
              Ao se registrar, você concorda com nossos <TermsDialog />
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}