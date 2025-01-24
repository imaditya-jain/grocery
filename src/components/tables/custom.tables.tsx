import { Delete, Edit } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React from 'react';

interface RowData {
    id: string;
    Avatar: string;
    [key: string]: string | React.ReactNode;
}

interface CustomTableProps {
    tHead: string[];
    tBody: RowData[];
    handleDelete: (id: string) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({ tHead, tBody, handleDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-left" width="100%" border={1} rules="all">
                <thead>
                    <tr>
                        {tHead.map((t) => (
                            <th key={t}>{t}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tBody.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {tHead.map((item) => (
                                <td key={item}>
                                    {item === 'Avatar' ? (
                                        <Avatar src={row['Avatar']} />
                                    ) : (
                                        row[item]
                                    )}
                                </td>
                            ))}
                            <td>
                                <IconButton>
                                    <Edit className='text-orange-400' />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(row['id'])}>
                                    <Delete className='text-red-500' />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
