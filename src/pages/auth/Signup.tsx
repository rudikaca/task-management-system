import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {auth, db} from "@/config/firebase-config";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import toast from "react-hot-toast";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z.string(),
    role: z.enum(['ADMIN', 'USER'] as const).optional()
});

type RegisterFormValue = z.infer<typeof formSchema>;

function Signup() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm<RegisterFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            role: undefined
        }
    });

    const onSubmit = async (data: RegisterFormValue) => {
        setLoading(true);
        try {
            const userCredencial = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredencial.user;

            await setDoc(doc(db, "users", user.uid), {
                email: data.email,
                role: data.role,
                createdAt: new Date()
            });

            toast.success('Account created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Register error', error);
            if (error instanceof FirebaseError) {
                // Handle Firebase-specific errors
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error('Email is already in use.');
                        break;
                    case 'auth/invalid-email':
                        toast.error('Invalid email address.');
                        break;
                    case 'auth/weak-password':
                        toast.error('Password is too weak.');
                        break;
                    default:
                        toast.error(`Registration failed: ${error.message}`);
                }
            } else if (error instanceof Error) {
                toast.error(`Registration failed: ${error.message}`);
            } else {
                toast.error('An unknown error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center flex-col">
            <h2 className="text-5xl mb-8">Register</h2>
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
                                        disabled={loading}
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
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={loading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select user role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Roles</SelectLabel>
                                                <SelectItem value="ADMIN">Admin</SelectItem>
                                                <SelectItem value="USER">User</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} className="ml-auto w-full" type="submit">
                        {loading ? 'Loading...' : 'Register'}
                    </Button>

                    <div className="mt-4 text-center">
                        <span>Already have an account? </span>
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default Signup;
