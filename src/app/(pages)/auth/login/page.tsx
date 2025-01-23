import Link from 'next/link'
import { AuthLayout, LoginForm } from '@/components'

const Login = () => {
    return (
        <>
            <AuthLayout>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-[20px] md:text-[24px] font-[600] uppercase text-center'>Sign In</h2>
                    <div>
                        <LoginForm />
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='font-[500]'>Create new account.<Link href='/auth/register/' legacyBehavior><a className="hover:text-[var(--color-primary)]">Sign Up</a></Link></p>
                        <p className='font-[500]'><Link href='/auth/forgot-password/' legacyBehavior><a className="hover:text-[var(--color-primary)]">Forgot Password</a></Link></p>

                    </div>
                </div>
            </AuthLayout>
        </>
    )
}

export default Login