import Link from 'next/link'
import { AuthLayout, ForgotPasswordForm } from '@/components'

const ForgotPassword = () => {
    return (
        <>
            <AuthLayout>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-[20px] md:text-[24px] font-[600] uppercase text-center'>Forgot Password</h2>
                    <div>
                        <ForgotPasswordForm />
                    </div>
                    <div className='flex items-center justify-between'>
                        <Link href="/auth/login/" legacyBehavior><a className='font-[500] hover:text-[var(--color-primary)]'>Back</a></Link>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}

export default ForgotPassword