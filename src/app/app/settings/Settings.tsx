'use client'

import { TypeUserForm } from '@/types/auth.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'
import { Box, TextField, Button } from '@mui/material'

export default function Settings() {

    const { register, handleSubmit, reset } = useForm<TypeUserForm>({
        mode: 'onChange'
    })

    useInitialData(reset)

    const { isPending, mutate } = useUpdateSettings()

    const onSubmit: SubmitHandler<TypeUserForm> = data => {
        const { password, ...rest } = data

        mutate({
            ...rest,
            password: password || undefined
        })
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                maxWidth: '500px',
                margin: 'auto',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#0E0F0F'
            }}
        >
            <div>
                <TextField
                    id='email'
                    label='Email:'
                    placeholder='Enter email:'
                    autoComplete='email'
                    {...register('email', {
                        required: 'Email is required',
                    })}
                    margin='normal'
                    className='custom-textfield'
                />

                <TextField
                    id='name'
                    label='Name:'
                    placeholder="Enter name:"
                    {...register('name')}
                    margin='normal'
                    className='custom-textfield'
                    sx={{ mt: 2 }}
                />

                <TextField
                    id='password'
                    type='password'
                    label='Password:'
                    placeholder='Enter password:'
                    {...register('password')}
                    margin='normal'
                    className='custom-textfield'
                    sx={{ mt: 2 }}
                />
            </div>
            <div>
                <TextField
                    id='workInterval'
                    label='Work interval (min.)'
                    placeholder='Enter work interval (min.):'
                    type='isNumber'
                    {...register('workInterval', {
                        valueAsNumber: true
                    })}
                    margin='normal'
                    className='custom-textfield'
                />

                <TextField
                    id='breakInterval'
                    label='Break interval (min.):'
                    placeholder='Enter break interval (min.):'
                    type='isNumber'
                    {...register('breakInterval', {
                        valueAsNumber: true
                    })}
                    margin='normal'
                    className='custom-textfield'
                    sx={{ mt: 2 }}
                />

                <TextField
                    id='intervalsCount'
                    label='Intervals count (max 5):'
                    placeholder='Enter intervals count (max 5):'
                    type='isNumber'
                    {...register('intervalsCount', {
                        valueAsNumber: true
                    })}
                    margin='normal'
                    className='custom-textfield'
                    sx={{ mt: 2 }}
                />
            </div>
            <Button
                type="submit"
                color="primary"
                disabled={isPending}
                sx={{ mt: 2 }}
            >
                Save
            </Button>
        </Box>
    )
}