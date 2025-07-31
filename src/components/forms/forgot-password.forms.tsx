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
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { message, error } = useAppSelector((state) => state.auth);

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email.').required('Email is required.'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<{ email: string }>({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    const fields = [
        {
            id: 'rf-3',
            type: 'email' as const,
            name: 'email' as const,
            label: 'Email',
            fullWidth: true,
            placeholder: 'john@example.com',
            multiline: false,
            rows: 1
        },
    ];

    const handleForgotPassword = (data: { email: string }) => {
        dispatch(forgotPasswordHandler({ email: data.email }));
        setEmail(data.email);
    };

    useEffect(() => {
        if (message) {
            if (error) {
                toast.error(message);
                reset();
                dispatch(clearState());
            } else {
                sessionStorage.setItem('email', email);
                toast.success(message);
                reset();
                dispatch(clearState());
                setTimeout(() => {
                    router.push('/auth/reset-password/');
                }, 1000);
            }
        }
    }, [error, message, dispatch, email, router, reset]);

    return (
        <form onSubmit={handleSubmit(handleForgotPassword)}>
            {fields.map((field) => (
                <InputFields
                    key={field.id}
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    errors={errors}
                    register={register}
                    multline={field.multiline}
                    rows={field.rows}
                />
            ))}
            <button type="submit">Reset Password</button>
        </form>
    );
};


export default ForgotPasswordForm
