"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import InputFields from "../fields/input.fields.components"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { forgotPasswordHandler } from "@/lib/features/auth.features"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { clearState } from "@/lib/slices/auth.slice"

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { message, error, } = useAppSelector((state) => state.auth)

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email.').required('Email is required.'),
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' })

    const fields = [
        { id: 'rf-3', type: 'email', name: 'email', label: 'Email', fullWidth: true, placeholder: 'john@example.com' },
    ]

    interface DataType {
        email: string,
    }

    const handleLogin = (data: DataType) => {
        dispatch(forgotPasswordHandler(data))
        setEmail(data.email)
    }

    useEffect(() => {
        if (message) {
            if (error) {
                toast.error(message)
                reset()
                dispatch(clearState())
            } else {
                sessionStorage.setItem('email', email)
                toast.success(message)
                reset()
                dispatch(clearState())
                setTimeout(() => {
                    router.push('/auth/reset-password/')
                }, 1000)

            }
        }
    }, [error, message, dispatch, email, router, reset])
    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)}>
                {
                    fields.map(field => <InputFields key={field.id} label={field.label} name={field.name} type={field.type} placeholder={field.placeholder} errors={errors} register={register} />)
                }
                <div>
                    <button type="submit" className="w-full bg-[var(--color-primary)] p-3 text-white font-[600] rounded-md">Log In</button>
                </div>
            </form>
        </>
    )
}

export default ForgotPasswordForm