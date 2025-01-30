"use client"

import React from "react";
import { Controller, Control, Path, FieldValues, PathValue } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

interface RTEProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    defaultValue?: string;
    error?: string;
}

const RTE = <T extends FieldValues>({
    name,
    control,
    label,
    defaultValue = "",
    error
}: RTEProps<T>) => {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue as PathValue<T, Path<T>>} // Type cast here
                render={({ field: { onChange, value } }) => (
                    <>
                        <Editor
                            apiKey="3rmpfuqc5j8pzrybvs595qg1c244w7plhbyaej1vnq9xdlgu"
                            value={value}
                            onEditorChange={onChange}
                            init={{
                                height: 800,
                                menubar: true,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </>
                )}
            />
        </div>
    );
};

export default RTE;
