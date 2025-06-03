'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import React from 'react'
import { BellIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import SearchBar from './SearchBar';

const Header = () => {
  const { user, accessToken } = useAuth();
  const isLoggedIn = !!accessToken;
  const { theme } = useTheme();
  const pathname = usePathname();

  const logoSrc = pathname === '/' ? 'assets/LogoNextWork.png' : theme === 'dark' ? 'assets/LogoNextWork.png' : 'assets/LogoNextWorkDark.png';

  return (
    <>
      <header className='fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-transparent z-50'>
        <Link href='/' className='flex-shrink-0'>
          <img
            src={logoSrc}
            alt='Logo NextWork'
            className='h-16 w-40 object-contain cursor-pointer'
          />
        </Link>

        <nav className='relative hidden md:flex space-x-6 border-2 border-gray-300 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/30 rounded-xl px-6 py-1 shadow-md backdrop-blur-md'>
          {[
            { href: '/', label: 'Início' },
            { href: '/dashboard', label: 'Vagas' },
            { href: '/candidatos', label: 'Candidatos' },
            { href: '/sobre', label: 'Sobre Nós' },
          ].map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-0.5 font-semibold cursor-pointer
          ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}
          hover:underline`}
              >
                {label}
                {isActive && (
                  <span
                    className="absolute -top-2 left-0 w-full h-1 bg-blue-500 dark:bg-blue-400 rounded-t-xl"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>



        {isLoggedIn ? (
          <div className='flex items-center space-x-6'>
            <button
              aria-label='Notificações'
              className='relative p-1 rounder hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer'
            >
              <BellIcon className='h-6 w-6 text-gray-700 dark:text-gray-300' />
            </button>

            <div className='text-right leading-tight max-w-xs'>
              <div className={`font-semibold truncate ${pathname === '/' && theme === 'light'
                ? 'text-gray-100'
                : 'text-gray-900 dark:text-white'
                }`}>
                Olá, {user?.first_name || 'Usuário'}
              </div>
              <div className={`text-sm truncate ${pathname === '/' && theme === 'light'
                ? 'text-gray-200'
                : 'text-gray-500 dark:text-gray-400'
                }`}>
                {user?.course || 'Formação não informada.'}
              </div>
            </div>

            <Link href='/profile' className='flex-shrink-0'>
              <Avatar>
                {user?.profile_photo ? (
                  <AvatarImage
                    src={user.profile_photo}
                    alt={`Foto de perfil de ${user.first_name}`}
                  />
                ) : (
                  <AvatarFallback>
                    {user?.first_name?.[0] ?? 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>
          </div>
        ) : (
          <div className='space-x-4'>
            <Link href='/login'>
              <Button
                variant='outline'
                className='text-white border-white bg-transparent hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
              >
                Fazer Login
              </Button>
            </Link>
            <Link href='/register'>
              <Button className='bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'>
                Registrar-se
              </Button>
            </Link>
          </div>
        )}
      </header>

      {pathname === '/dashboard' && (
        <div className='flex justify-center px-6 pb-4'>
          <div className='w-full max-w-4xl'>
            <SearchBar />
          </div>
        </div>
      )}
    </>
  )
}

export default Header;