"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import InputFields from "../fields/input.fields.components"
import { useAppDispatch } from "@/lib/hooks"
import { registerHandler } from "@/lib/features/auth.features"
import storage from '@/config/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const RegistrationForm = ({ page }) => {
    const dispatch = useAppDispatch()

    const schema = yup.object().shape({
        firstName: yup.string().matches(/^[A-Za-z]+$/, 'First name should only contain alphabets').required('First name is required.'),
        lastName: yup.string().matches(/^[A-Za-z]+$/, 'Last name should only contain alphabets').required('Last name is required.'),
        email: yup.string().email('Invalid email.').required('Email is required.'),
        phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number should be exactly 10 digits').required('Phone number is required.'),
        avatar: yup.mixed().required('An image is required').test('fileType', 'Only image files are allowed', (value) => { if (!value || !(value instanceof FileList) || value.length === 0) return false; return ['image/jpeg', 'image/png'].includes(value[0].type); }).test('fileSize', 'File size must be less than 2MB', (value) => { if (!value || !(value instanceof FileList) || value.length === 0) return false; return value[0].size <= 2 * 1024 * 1024; }),
        password: yup.string().min(8, 'Password must be at least 8 characters long.').matches(/[A-Z]/, 'Password must contain at least one uppercase letter.').matches(/[a-z]/, 'Password must contain at least one lowercase letter.').matches(/[0-9]/, 'Password must contain at least one number.').matches(/[@$!%*?&#]/, 'Password must contain at least one special character.').required('Password is required.'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match.').required('Confirm password is required.')

    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' })

    const fields = [
        { id: 'rf-1', type: 'text', name: 'firstName', label: 'Firstname', fullWidth: true, placeholder: 'John' },
        { id: 'rf-2', type: 'text', name: 'lastName', label: 'Lastname', fullWidth: true, placeholder: 'Doe' },
        { id: 'rf-3', type: 'email', name: 'email', label: 'Email', fullWidth: true, placeholder: 'john@example.com' },
        { id: 'rf-4', type: 'tel', name: 'phone', label: 'Phone', fullWidth: true, placeholder: '9420212223' },
        { id: 'rf-7', type: 'file', name: 'avatar', label: 'Avatar', fullWidth: true, placeholder: '' },
        { id: 'rf-5', type: 'password', name: 'password', label: 'Password', fullWidth: true, placeholder: '********' },
        { id: 'rf-6', type: 'password', name: 'confirmPassword', label: 'Confirm Password', fullWidth: true, placeholder: '********' },
    ]

    interface DataType extends Record<string, unknown> {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        avatar: FileList;
    }

    const handleRegistration = async (data: DataType) => {
        const storageRef = ref(storage, `display-profile/${Date.now()}-${data.avatar[0].name}`);
        const snapshot = await uploadBytes(storageRef, data.avatar[0]);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        const newData = { ...data, avatar: downloadUrl, role: page === '/admin/users/create' ? 'admin' : 'user' }
        dispatch(registerHandler(newData))
        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <div>
                    {
                        fields.map(field => <InputFields key={field.id} label={field.label} name={field.name} type={field.type} placeholder={field.placeholder} errors={errors} register={register} />)
                    }
                </div>
                <div>
                    <button type="submit" className="w-full bg-[var(--color-primary)] p-3 text-white font-[600] rounded-md">Register</button>
                </div>
            </form>
        </>
    )
}

export default RegistrationForm