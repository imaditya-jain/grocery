import Image from 'next/image'
import React from 'react'

interface IconBoxPropTypes {
    title: string,
    description: string,
    icon: string,
    textAlign: string,
    iconAlign: string
}

const IconBox: React.FC<IconBoxPropTypes> = ({ title, description, icon, iconAlign, textAlign }) => {
    return (
        <>
            <div className='p-4 flex flex-col gap-4 icon-box'>
                <div className={`flex ${iconAlign === 'center' ? 'justify-center' : iconAlign === 'left' ? 'justify-start' : 'justify-end'} items-center`}>
                    <Image src={icon} alt={title} width={40} height={40} />
                </div>
                <div>
                    <h5 className={`${textAlign === 'center' ? 'text-center' : textAlign === "left" ? 'text-left' : 'text-right'} text-center font-[700] text-[14px] md:text-[16px]`}>{title}</h5>
                    <p className={`${textAlign === 'center' ? 'text-center' : textAlign === "left" ? 'text-left' : 'text-right'} text-[12px] md:text-[14px]`}>{description}</p>
                </div>
            </div>
        </>
    )
}

export default IconBox