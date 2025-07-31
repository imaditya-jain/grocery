"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { AdminLayout, InputFields } from '@/components'
import { useForm, SubmitHandler, FieldValues, FieldErrors } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import storage from "@/config/firebase.config"
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage"
import Close from '@mui/icons-material/Close'
import CopyAll from '@mui/icons-material/CopyAll'
import { IconButton } from '@mui/material'
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify'

const Media = () => {
    const [show, setShow] = useState(false)
    const [images, setImages] = useState<string[]>([])

    const schema = yup.object({
        image: yup
            .mixed<FileList>()
            .test(
                "fileRequired",
                "An image is required",
                (value) => value && value instanceof FileList && value.length > 0
            )
            .test(
                "fileType",
                "Only image files are allowed",
                (value) =>
                    value &&
                    value instanceof FileList &&
                    ["image/jpeg", "image/png"].includes(value[0]?.type)
            )
            .test(
                "fileSize",
                "File size must be less than 2MB",
                (value) =>
                    value && value instanceof FileList && value[0]?.size <= 10 * 1024 * 1024
            ),
    })

    const fields = [
        { id: "rf-7", type: "file" as const, name: "image", label: "Avatar", placeholder: "", multiline: false, rows: 1 },
    ]

    const { register, handleSubmit, formState: { errors }, reset } = useForm<{ image?: FileList }>({
        resolver: yupResolver(schema),
        mode: "onBlur"
    })

    const fetchImages = async () => {
        const imagesRef = ref(storage, 'uploads/')
        const res = await listAll(imagesRef)
        const imageUrls = await Promise.all(
            res.items.map(item => getDownloadURL(item))
        )
        setImages(imageUrls)
    }

    const handleUpload: SubmitHandler<{ image?: FileList }> = async (data) => {
        const storageRef = ref(storage, `uploads/${Date.now()}-${data.image![0].name}`)
        await uploadBytes(storageRef, data.image![0])
        setShow(false)
        setTimeout(() => {
            reset()
            fetchImages()
        }, 1000)
    }

    useEffect(() => {
        fetchImages()
    }, [])

    const handleCopy = (url: string) => {
        copy(url);
        toast.success('Image URL copied!')
    }

    return (
        <AdminLayout>
            <section>
                <div className='flex flex-col gap-4 p-0 md:p-4'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-[600] text-[20px] md:text-[24px]'>Media</h2>
                        <button className='dark-outline-btn' onClick={() => setShow(!show)}>{!show ? 'Add Media' : <Close />}</button>
                    </div>
                    {show && (
                        <div className='border-[#c5c5c5] border-b-[1px] pb-4'>
                            <div className='w-[100%] md:w-[50%]'>
                                <form onSubmit={handleSubmit(handleUpload)}>
                                    <div>
                                        {fields.map((field) => (
                                            <InputFields
                                                key={field.id}
                                                label={field.label}
                                                name={field.name}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                errors={errors as FieldErrors<FieldValues>}
                                                register={register}
                                                multline={field.multiline}
                                                rows={field.rows}
                                            />
                                        ))}
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-[var(--color-primary)] p-3 text-white font-[600] rounded-md"
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    <div>
                        <h3 className='font-[600] text-[18px] mt-6'>Uploaded Images</h3>
                        <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
                            {images.length > 0 ? (
                                images.map((url, index) => (<React.Fragment key={`${url}-${index}`}>
                                    <div className='border relative flex items-center justify-center'>
                                        <Image src={url} alt={`uploaded-img-${index}`} width={100} height={100} className="w-full h-auto" />
                                        <IconButton onClick={() => handleCopy(url)} className='!absolute top-0 right-0 bg-primary'><CopyAll /></IconButton>
                                    </div>
                                </React.Fragment>
                                ))
                            ) : (
                                <p>No images found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    )
}

export default Media
