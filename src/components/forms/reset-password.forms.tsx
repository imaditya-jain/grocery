"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFields from "../fields/input.fields.components";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { resetPasswordHandler } from "@/lib/features/auth.features";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearState } from "@/lib/slices/auth.slice";

// Validation schema using Yup
const schema = yup.object().shape({
    otp: yup
        .string()
        .required("OTP is required")
        .matches(/^\d{4}$/, "OTP must be exactly 4 digits"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
        .matches(/[0-9]/, "Password must contain at least one number.")
        .matches(/[@$!%*?&#]/, "Password must contain at least one special character.")
        .required("Password is required."),
});

const ResetPasswordForm: React.FC<{ email: string }> = ({ email }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { message, error } = useAppSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const fields = [
        {
            id: "rf-1",
            type: "text" as const,
            name: "otp",
            label: "OTP",
            fullWidth: true,
            placeholder: "",
            multiline: false,
            rows: 1
        },
        {
            id: "rf-2",
            type: "password" as const,
            name: "password" as const,
            label: "Password",
            fullWidth: true,
            placeholder: "********",
            multiline: false,
            rows: 1
        },
    ];

    interface DataType {
        otp: string;
        password: string;
    }

    const handleResetPassword = (data: DataType) => {
        const newData = { ...data, email };
        dispatch(resetPasswordHandler(newData));
    };

    useEffect(() => {
        if (message) {
            if (error) {
                toast.error(message);
                reset();
                dispatch(clearState());
            } else if (!error) {
                sessionStorage.removeItem("email");
                toast.success(message);
                reset();
                dispatch(clearState());
                setTimeout(() => {
                    router.push("/auth/login/");
                }, 1000);
            }
        }
    }, [error, message, reset, router, dispatch, email]);

    return (
        <>
            <form onSubmit={handleSubmit(handleResetPassword)}>
                {
                    fields.map((field) => (
                        <InputFields
                            key={field.id}
                            label={field.label}
                            name={field.name as "otp" | "password"}
                            type={field.type}
                            placeholder={field.placeholder}
                            errors={errors}
                            register={register}
                            multline={field.multiline}
                            rows={field.rows}
                        />
                    ))
                }
                <div>
                    <button
                        type="submit"
                        className="w-full bg-[var(--color-primary)] p-3 text-white font-[600] rounded-md"
                    >
                        Reset Password
                    </button>
                </div>
            </form>
        </>
    );
};

export default ResetPasswordForm;
