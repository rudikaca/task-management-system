import React, { useState} from 'react';
import {Button} from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {FormControl, FormField, FormItem, FormLabel, FormMessage, Form} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import {Link, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "@/config/firebase-config";
import toast from "react-hot-toast";

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: UserFormValue) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center flex-col">
            <h2 className="text-5xl mb-8">Login</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-2 max-w-xs"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email..."
                                        disabled={false}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password..."
                                        disabled={false}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} className="ml-auto w-full max-w-xs" type="submit">
                        Login
                    </Button>

                    <div className="mt-4 text-center">
                        <span>Don't have an account? </span>
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Register here
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default Login;