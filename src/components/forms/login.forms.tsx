"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFields from "../fields/input.fields.components";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginHandler } from "@/lib/features/auth.features";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { clearState } from "@/lib/slices/auth.slice";

const Login = () => {
    const [email, setEmail] = useState("");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { message, error } = useAppSelector((state) => state.auth);

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email.")
            .required("Email is required."),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters long.")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
            .matches(/[0-9]/, "Password must contain at least one number.")
            .matches(/[@$!%*?&#]/, "Password must contain at least one special character.")
            .required("Password is required."),
    });

    type LoginFormValues = yup.InferType<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const fields = [
        {
            id: "rf-3",
            type: "email" as const,
            name: "email" as const,
            label: "Email",
            placeholder: "john@example.com",
            multiline: false,
            rows: 1
        },
        {
            id: "rf-5",
            type: "password" as const,
            name: "password" as const,
            label: "Password",
            placeholder: "********",
            multiline: false,
            rows: 1
        },
    ];

    const handleLogin = (data: LoginFormValues) => {
        dispatch(loginHandler(data));
        setEmail(data.email);
    };

    useEffect(() => {
        if (message) {
            if (error) {
                toast.error(message);
                reset();
                dispatch(clearState());
            } else {
                sessionStorage.setItem("email", email);
                toast.success(message);
                reset();
                dispatch(clearState());
                setTimeout(() => {
                    router.push("/auth/verify-otp/");
                }, 1000);
            }
        }
    }, [error, message, dispatch, email, reset, router]);

    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)}>
                {fields.map((field) => (
                    <InputFields
                        key={field.id}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        errors={errors}
                        register={register}
                        multline={field.multiline}
                        rows={field.rows}
                    />
                ))}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-[var(--color-primary)] p-3 text-white font-[600] rounded-md"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </>
    );
};

export default Login;
