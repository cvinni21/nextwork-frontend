'use client';
import Head from "next/head";
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [passwordMismatch, setPasswordMismatch] = useState(false);

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
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
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
    if (!validateStep1()) return;

    try {
      const response = await api.post("validate-register/", {
        username: formData.username,
        email: formData.email,
      });

      setStep(2);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);

        return;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step !== 2) {
      return;
    }

    try {
      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value);
      });

      await api.post('register/', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      router.push('/curriculo');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        setStep(1);
      }
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Criar Conta</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && ( // primeira parte 
            <>
              <div className="flex gap-4">
                <Input
                  name="first_name"
                  placeholder="Nome"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="last_name"
                  placeholder="Sobrenome"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input name="username" placeholder="Nome de Usuário" value={formData.username} onChange={handleChange} required />
              {errors.username && <p className="text-red-500 text-sm">{errors.username[0]}</p>}
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
              <Input name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
              <Input name="confirm_password" type="password" placeholder="Confirmar Senha" value={formData.confirm_password} onChange={handleChange} required />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm">{errors.confirm_password[0]}</p>
              )}
            </>
          )}

          {step === 2 && ( // segunda parte
            <>
              <Input
                name="course"
                placeholder="Formação"
                value={formData.course}
                onChange={handleChange}
              />
              <Input
                name="skills"
                placeholder="Habilidades (separadas por vírgulas)"
                value={formData.skills}
                onChange={handleChange}
              />
              <Input
                name="linkedin"
                placeholder="LinkedIn"
                value={formData.linkedin}
                onChange={handleChange}
              />
              <Input
                name="github"
                placeholder="GitHub"
                value={formData.github}
                onChange={handleChange}
              />
            </>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button type='button' onClick={() => setStep(step - 1)} variant='secondary' className='cursor-pointer'>
                Voltar
              </Button>
            )}
            {step < 2 ? (
              <Button
                type="button"
                className='cursor-pointer'
                onClick={handleNextStep}
              >
                Próximo
              </Button>
            ) : (
              <Button type="submit" className='cursor-pointer'>Finalizar Cadastro</Button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}