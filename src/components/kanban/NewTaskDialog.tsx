import {useEffect, useState} from "react";
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import {useTaskStore} from "@/hooks/useTaskStore";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface User {
    id: string;
    email: string;
    role: string;
}

export default function NewTaskDialog() {
    const {addTask} = useTaskStore();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const db = getFirestore();
            const usersCollection = collection(db, 'users');
            const userSnapshot = await getDocs(usersCollection);
            const userList = userSnapshot.docs.map(doc => ({
                id: doc.id,
                email: doc.data().email,
                role: doc.data().role
            }));
            setUsers(userList);
        };

        fetchUsers();
    }, []);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const { title, description, assignedTo } = Object.fromEntries(formData);

        if (typeof title !== 'string' || typeof description !== 'string'|| typeof assignedTo !== 'string') return;
        addTask(title, description, 'TODO', assignedTo);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" size="sm">
                    ＋ Add New Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                        What do you want to get done today?
                    </DialogDescription>
                </DialogHeader>
                <form
                    id="todo-form"
                    className="grid gap-4 py-4"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                            id="title"
                            name="title"
                            placeholder="Todo title..."
                            className="col-span-4"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Description..."
                            className="col-span-4"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Select name="assignedTo">
                            <SelectTrigger className="col-span-4">
                                <SelectValue placeholder="Assign to..." />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((user) => (
                                    <SelectItem key={user.id} value={user.id}>
                                        {user.email} ({user.role})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </form>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button type="submit" size="sm" form="todo-form">
                            Add Task
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
