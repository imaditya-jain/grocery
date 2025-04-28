"use client"

import React, { useState, useRef } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

interface FormData {
    profileImage: File | null;
}

interface AvatarUploaderProps {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    setValue: UseFormSetValue<FormData>;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ register, errors, setValue }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setValue("profileImage", file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
        }
    };

    const triggerFileSelectPopup = () => inputRef.current?.click();

    return (
        <>
            {imagePreview ? (
                <Box className="d-flex justify-content-center align-items-center">
                    <Box p={0.5} className="placeholderCircle">
                        <Image
                            src={imagePreview}
                            className="rounded-circle img-fluid"
                            alt="avatar"
                            width={100}
                            height={100}
                        />
                        <IconButton
                            className="addaphoto"
                            onClick={triggerFileSelectPopup}
                        >
                            <Image
                                src="/images/camera.svg"
                                className="img-fluid"
                                alt="edit avatar"
                                width={20}
                                height={20}
                            />
                        </IconButton>
                        <input
                            type="file"
                            accept="image/*"
                            ref={inputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </Box>
                </Box>
            ) : (
                <div className="image-upload d-flex justify-content-center align-items-center">
                    <label htmlFor="file-input">
                        <Box className="placeholderCircle"></Box>
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        name="profileImage"
                        ref={(e) => {
                            register("profileImage");
                            inputRef.current = e;
                        }}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>
            )}
            <div className="py-3">
                <Typography align="center">Upload Profile Picture</Typography>
                {errors.profileImage && (
                    <Typography color="error" align="center">
                        {errors.profileImage.message}
                    </Typography>
                )}
            </div>
        </>
    );
};

export default AvatarUploader;
