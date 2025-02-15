import React, {useCallback, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {Button} from "@/components/ui/button";
import {useAppDispatch} from "@/store";
import {loginUser} from "@/store/actions/authActions";
import {FormControl, FormField, FormItem, FormLabel, FormMessage, Form} from "@/components/ui/form";
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

function Login() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = useCallback(async (data: UserFormValue) => {
        setLoading(true);
        try {
            await dispatch(loginUser(data)).unwrap();
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Invalid Credentials');
            }
        } finally {
            setLoading(false);
        }
    }, [dispatch, navigate, setLoading]);

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
                        {loading ? 'Loading...' : 'Login'}
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