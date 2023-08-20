import React, { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IIputData } from '../../types';
import { Autocomplete, MenuItem, TextField } from '@mui/material';


interface props {
    inputs: IIputData[];
    register: UseFormRegister<any>;
}


const InputsList: FC<props> = ({ inputs, register }) => {
    return (
        <>
            {inputs.map((item) => {
                if (item.field === 'text') {
                    return (
                        <TextField
                            {...register(item.key)}
                            key={item.key}
                            helperText={item.helperText}
                            defaultValue={item.defaultValue}
                            placeholder={item.placeholder}
                            label={item.label}
                            type={item.type}
                            autoComplete={item.autoComplete}
                            sx={{ minWidth: '96px' }}
                        />
                    );
                }

                if (item.field === 'select') {
                    return (
                        <TextField
                            {...register(item.key)}
                            select
                            key={item.key}
                            helperText={item.helperText}
                            defaultValue={item.defaultValue}
                            placeholder={item.placeholder}
                            label={item.label}
                            type={item.type}
                            sx={{ minWidth: '96px' }}
                        >
                            {item.options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    );
                }
            })}
        </>
    )
}


export default InputsList;