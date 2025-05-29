'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { BellIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import SearchBar from './SearchBar';

const Header = () => {
  const { user, accessToken } = useAuth();
  const isLoggedIn = !!accessToken;
  const pathname = usePathname();

  return (
    <header className='bg-blue-900 text-white dark:bg-gray-800 dark:text-white px-6 pb-4'>
      <div className='flex items-center justify-between py-3'>
        <Link href='/dashboard'>
          <img
            src='/assets/LogoNextWork.svg'
            alt='Logo NextWork'
            className='h-20 w-20 object-contain cursor-pointer'
          />
        </Link>

        <nav className='hidden md:flex space-x-6'>
          <Link href='/dashboard'><p className='hover:underline'>Home</p></Link>
          <Link href='/vagas'><p className='hover:underline'>Vagas</p></Link>
          <Link href='/candidatos'><p className='hover:underline'>Candidatos</p></Link>
          <Link href='/sobre'><p className='hover:underline'>Sobre Nós</p></Link>
        </nav>

        {isLoggedIn ? (
          <div className='flex items-center space-x-4'>
            <button
              aria-label='notificações'
              className='relative p-1 rounded hover:bg-white/20 transition cursor-pointer'
            >
              <BellIcon className='h-6 w-6 text-white' />
            </button>

            <div className='text-right leading-tight'>
              <div className='font-semibold'>
                Olá, {user?.first_name || 'Usuário'}
              </div>
              <div className='text-sm text-gray-300'>
                {user?.course || 'Formação não informada.'}
              </div>
            </div>

            <Link href='/profile'>
              <Avatar>
                {user?.profile_photo ? (
                  <AvatarImage src={user.profile_photo} alt={`foto de perfil de ${user.first_name}`} />
                ) : (
                  <AvatarFallback>
                    {user?.first_name?.[0] ?? 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>
          </div>
        ) : (
          <div className='space-x-2'>
            <Link href='/login'>
              <Button variant='outline' className='text-white border-white bg-transparent hover:bg-white/20'>
                Fazer Login
              </Button>
            </Link>
            <Link href='/register'>
              <Button className='bg-white text-blue-900 hover:bg-gray-200'>
                Registrar-se
              </Button>
            </Link>
          </div>
        )}
      </div>

      {pathname === '/dashboard' && (
        <div className='mt-4 flex justify-center px-6'>
          <div className='w-full max-w-4xl'>
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header;