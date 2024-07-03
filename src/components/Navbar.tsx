
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight, LogOut } from 'lucide-react'
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'

const Navbar =async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  
  

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>quill.</span>
          </Link>

          

          <div className='hidden items-center space-x-4 sm:flex'>
            {(!user || !user.id )? (
              <>
                
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Get started{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </RegisterLink>
              </>
             ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Dashboard
                </Link>
                <LogoutLink
                  className={buttonVariants({
                    size: 'sm',
                    variant :'ghost'
                  })}>
                  Logout{' '}
                  <LogOut className='ml-1.5 h-5 w-5' />
                </LogoutLink>

                
              </>
            )} 
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar