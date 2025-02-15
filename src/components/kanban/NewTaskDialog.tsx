import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useTaskStore } from "@/hooks/useTaskStore";
import {Task, TaskPriority} from "@/models/types";
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface User {
    id: string;
    email: string;
    role: string;
}

interface NewTaskDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    taskToEdit?: Task;
}

export default function NewTaskDialog({ open, onOpenChange, taskToEdit }: NewTaskDialogProps) {
    const { addTask, updateTask } = useTaskStore();
    const [users, setUsers] = useState<User[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('LOW');

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

        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            setAssignedTo(taskToEdit.assignedTo || '');
            setPriority(taskToEdit.priority || 'LOW');
        } else {
            setTitle('');
            setDescription('');
            setAssignedTo('');
            setPriority('LOW');
        }
    }, [taskToEdit]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (taskToEdit) {
            const updatedTask: Task = {
                ...taskToEdit,
                title,
                description,
                assignedTo: assignedTo || null,
                priority
            };
            await updateTask(updatedTask);
        } else {
            await addTask(title, description, 'TODO', assignedTo, priority);
        }

        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {!taskToEdit && (
            <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="w-[170px]">
                    ＋ Add New Task
                </Button>
            </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{taskToEdit ? 'Edit Task' : 'Add New Task'}</DialogTitle>
                    <DialogDescription>
                        {taskToEdit ? 'Edit your task details.' : 'What do you want to get done today?'}
                    </DialogDescription>
                </DialogHeader>
                <form
                    id="task-form"
                    className="grid gap-4 py-4"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                            id="title"
                            name="title"
                            placeholder="Task title..."
                            className="col-span-4"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Description..."
                            className="col-span-4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Select name="assignedTo" value={assignedTo} onValueChange={setAssignedTo}>
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Select name="priority" value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
                            <SelectTrigger className="col-span-4">
                                <SelectValue placeholder="Set priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="LOW">
                                    Low
                                </SelectItem>
                                <SelectItem value="MEDIUM">
                                    Medium
                                </SelectItem>
                                <SelectItem value="HIGH">
                                    High
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" size="sm" form="task-form">
                            {taskToEdit ? 'Update Task' : 'Add Task'}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}