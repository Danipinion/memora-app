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
import { useToast } from '@/hooks/use-toast';

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter()
    const title = 'Daftar dulu ya!'
    const subtitle = 'Daftar akun untuk melanjutkan'
    const sublogin = 'Sudah punya akun?'
    const { toast } = useToast()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (formData: RegisterForm) => {
        console.log(formData);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast({
                    title: "Berhasil membuat akun!",
                    style: {
                        color: "#66BB6A",
                    }
                });
                router.push("/login");
            } else {
                toast({
                    title: "Gagal membuat akun!",
                    description: "Terjadi kesalahan",
                    style: {
                        color: "#FF0000",
                    }
                });
                console.log(res)
            }
        } catch (error) {
            console.error("Error:", error);
        }
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
                                <InputData
                                    placeholder='Masukkan Username'
                                    name='username'
                                    field={{ ...form.register('username') }} />
                                <InputData
                                    placeholder='Masukkan E-mail'
                                    name='email'
                                    field={{ ...form.register('email') }} />
                                <InputPassword
                                    placeholder='Masukkan Password'
                                    name='password'
                                    field={{ ...form.register('password') }} />
                                <InputPassword
                                    placeholder='Konfirmasi Password'
                                    name='confirmPassword'
                                    field={{ ...form.register('confirmPassword') }} />
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