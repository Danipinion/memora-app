'use client'

import InputData from '@/components/organism/inputData';
import InputPassword from '@/components/organism/inputPassword';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { registerSchema } from '@/lib/form-schema';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function RegisterPage() {
    const router = useRouter()
    const title = 'Daftar dulu ya!'
    const subtitle = 'Daftar akun untuk melanjutkan'
    const sublogin = 'Sudah punya akun?'

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (val: z.infer<typeof registerSchema>) => {
        console.log(val);
    }

    return (
        <div className='mx-5'>
            <div className='h-screen w-full flex flex-col items-center justify-center'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                        <div className='space-y-10 mb-20 w-full'>
                            <div className='w-full text-center'>
                                <div className='text-2xl font-semibold' style={{ color: '#6C63FF' }}>
                                    {title}
                                </div>
                                <div className='text-slate-700'>
                                    {subtitle}
                                </div>
                            </div>

                            <div className='shadow-md w-full p-10 space-y-5 text-sm text-slate-700'>
                                <Form {...form}>
                                    <InputData name='username' placeholder='Masukkan Username' {...registerSchema} />
                                    <InputData name='email' placeholder='Masukkan E-mail' {...registerSchema} />
                                    <InputPassword name='password' placeholder='Masukkan Password' {...registerSchema} />
                                    <InputPassword name='confirmPassword' placeholder='Konfirmasi Password' {...registerSchema} />
                                </Form>
                            </div>
                        </div>

                        <div className="fixed bottom-10 left-5 right-5">
                            <Button style={{ backgroundColor: '#6C63FF' }} className="p-5 w-full text-slate-100 hover:bg-slate-300">Daftar</Button>
                            <div className='flex justify-center gap-1 p-1 text-xs'>
                                <p>{sublogin}</p>
                                <Link href={'/login'} className='text-slate-700 font-semibold'>Masuk</Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}