'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Box, TextField, Button, Typography } from '@mui/material';

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'


export const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;


export function Auth() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IAuthForm>({
        mode: 'onChange'
    })

    const [isLoginForm, setIsLoginForm] = useState(false)

    const { push } = useRouter()

    const { mutate } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) =>
            authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess() {
            toast.success('Successfully login!')
            reset()
            push(DASHBOARD_PAGES.HOME)
        },
        onError() {
            toast.error('Please check email/password!')
            reset()
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = data => {
        mutate(data)
    }

    const handleFormType = (isLogin: boolean) => {
        setIsLoginForm(isLogin);
    };

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
            <Typography variant='h5' component='div' sx={{ mb: 2 }}>
                Auth Form
            </Typography>
            <TextField
                fullWidth
                id='email'
                type='email'
                label='Email:'
                placeholder='Enter email:'
                autoComplete='email'
                error={Boolean(errors.email)}
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: EMAIL_REGEXP,
                        message: 'Invalid email address',
                    },
                })}
                helperText={errors.email?.message?.toString()}
                margin='normal'
                sx={{
                    input: { 
                        '&::placeholder': { color: 'white' }, 
                        color: 'white' 
                    },
                    '& label': { color: 'white' },
                    '& label.Mui-focused': { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                    },
                }}
            />
            <TextField
                fullWidth
                id='password'
                type='password'
                label='Password:'
                placeholder='Enter password:'
                error={Boolean(errors.password)}
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                    },
                })}
                helperText={errors.password?.message?.toString()}
                margin='normal'
                sx={{
                    input: { 
                        '&::placeholder': { color: 'white' }, 
                        color: 'white' 
                    },
                    '& label': { color: 'white' },
                    '& label.Mui-focused': { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                    }, 
                    mt: 2
                }}
            />
            <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => handleFormType(true)}>
                Login
            </Button>
            <Button
                type='submit'
                variant='contained'
                color='inherit'
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => handleFormType(false)}>
                Register
            </Button>
        </Box>
    );
}
