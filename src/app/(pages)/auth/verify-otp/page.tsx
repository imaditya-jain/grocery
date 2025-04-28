"use client"

import { useRouter } from "next/navigation"
import { AuthLayout, VerifyOTPForm } from '@/components'
import { useEffect, useState } from 'react';

const VerifyOTP = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            router.back()
        }
    }, [router]);



    return (
        <>
            <AuthLayout>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-[20px] md:text-[24px] font-[600] uppercase text-center'>Verify OTP</h2>
                    <div>
                        <VerifyOTPForm email={email} />
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}

export default VerifyOTP