import React, { useState} from 'react';
import {Button} from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {FormControl, FormField, FormItem, FormLabel, FormMessage, Form} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import {Link} from "react-router-dom";

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z.string()
});

type UserFormValue = z.infer<typeof formSchema>;

function Login() {
    const [loading, setLoading] = useState(false);

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: UserFormValue) => {
        console.log(data)
    };

    return (
        <div className="flex min-h-screen justify-center items-center">
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

                    <Button disabled={false} className="ml-auto w-full max-w-xs" type="submit">
                        Login
                    </Button>

                    <div className="mt-4 text-center">
                        <span>Don't have an account? </span>
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default Login;