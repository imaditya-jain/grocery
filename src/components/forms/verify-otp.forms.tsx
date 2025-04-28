"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFields from "../fields/input.fields.components";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { verifyOTPHandler } from "@/lib/features/auth.features";
import { useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { AuthState, clearState } from "@/lib/slices/auth.slice";

interface VerifyOTPProps {
    email: string;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ email }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { message, error, user, isAuthenticated } = useAppSelector(
        (state: { auth: AuthState }) => state.auth
    );

    const schema = yup.object().shape({
        otp: yup
            .string()
            .required("OTP is required")
            .matches(/^\d{4}$/, "OTP must be exactly 4 digits"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

    const fields = [
        {
            id: "rf-1",
            type: "text" as const,
            name: "otp" as const,
            label: "OTP",
            fullWidth: true,
            placeholder: "",
            multiline: false,
            rows: 1
        },
    ];

    interface DataType {
        otp: string;
    }

    const handleVerifyOTP = (data: DataType) => {
        const newData = { ...data, email };
        dispatch(verifyOTPHandler(newData));
    };

    const navigateTo = useCallback(
        (path: string) => {
            setTimeout(() => {
                router.push(path);
            }, 1000);
        },
        [router]
    );

    const resetForm = useCallback(() => reset(), [reset]);

    useEffect(() => {
        if (message) {
            if (error && !isAuthenticated && !user) {
                toast.error(message);
                resetForm();
                dispatch(clearState());
                navigateTo("/auth/login/");
            } else if (!error && user && isAuthenticated) {
                sessionStorage.removeItem('email')
                toast.success(message);
                dispatch(clearState());
                const path = user?.role === "admin" ? "/admin/dashboard" : "/";
                navigateTo(path);
            }
        }
    }, [
        message,
        error,
        isAuthenticated,
        user,
        dispatch,
        navigateTo,
        resetForm,
    ]);

    return (
        <>
            <form onSubmit={handleSubmit(handleVerifyOTP)}>
                {fields.map((field) => (
                    <InputFields
                        key={field.id}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        errors={errors}
                        register={register}
                        label={field.label}
                        multline={field.multiline}
                        rows={field.rows}
                    />
                ))}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-[var(--color-primary)] p-3 text-white font-[600] rounded-md"
                    >
                        Verify
                    </button>
                </div>
            </form>
        </>
    );
};

export default VerifyOTP;
