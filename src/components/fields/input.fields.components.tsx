"use client"

import { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { UseFormRegister, FieldValues, FieldErrorsImpl } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

interface InputFieldsProps {
    type: 'text' | 'password' | 'email' | 'number';
    name: string;
    placeholder: string;
    label: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrorsImpl<FieldValues>;
}

const InputFields = ({ type, name, placeholder, register, errors, label }: InputFieldsProps) => {
    const [show, setShow] = useState(false);

    return (
        <div className="mb-4 relative">
            <TextField
                variant="outlined"
                type={type === 'password' && show ? 'text' : type}
                label={label}
                placeholder={placeholder}
                fullWidth
                {...register(name)}
                error={!!errors[name]}
                helperText={errors[name]?.message as string}
            />
            {type === 'password' && (
                <IconButton
                    className="!absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShow(!show)}
                    aria-label={show ? 'Hide password' : 'Show password'}
                >
                    {show ? <IoMdEyeOff /> : <IoMdEye />}
                </IconButton>
            )}
        </div>
    );
};

export default InputFields;
