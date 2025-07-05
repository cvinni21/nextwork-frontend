'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InstagramLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { FaBehance } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white px-6 pt-10">
      {/* Parte de cima */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6 pb-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href='/'>
            <img
              src="/assets/LogoNextWork.png"
              alt="Logo NextWork"
              className="h-12 w-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Navegação central */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/empresas"><Button variant="ghost" className="text-white hover:underline px-2">Para Empresas</Button></Link>
          <Link href="/candidatos"><Button variant="ghost" className="text-white hover:underline px-2">Para Candidatos</Button></Link>
          <Link href="/faq"><Button variant="ghost" className="text-white hover:underline px-2">FAQ</Button></Link>
          <Link href="/equipe"><Button variant="ghost" className="text-white hover:underline px-2">Equipe</Button></Link>
          <Link href="/sobre"><Button variant="ghost" className="text-white hover:underline px-2">Equipe NextWork</Button></Link>
        </div>

        {/* Redes sociais */}
        <div className="flex space-x-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Button variant="ghost" size="icon" className="text-white hover:text-pink-400">
              <InstagramLogoIcon className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Button variant="ghost" size="icon" className="text-white hover:text-gray-400">
              <GitHubLogoIcon className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" aria-label="Behance">
            <Button variant="ghost" size="icon" className="text-white hover:text-blue-400">
              <FaBehance className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>

      {/* Parte de baixo */}
      <div className="border-t border-gray-700 pt-4 pb-6 text-sm max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2">
        <p>© 2025 StarGroup</p>
        <p>Av. Sen. Salgado Filho, s/n - Centro, Paulista - PE, 53401-440</p>
        <div className="space-x-4">
          <Link href="/politica-de-privacidade" className="hover:underline">Política de Privacidade</Link>
          <Link href="/termos-de-uso" className="hover:underline">Termos de Uso</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
