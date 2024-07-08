import {useState} from "react";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import {GripVertical, MoreVertical} from 'lucide-react';
import { cva } from 'class-variance-authority';
import {useUserEmail} from "@/hooks/useUserEmail";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {Badge} from "@/components/ui/badge";
import {Task} from "@/models/types";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useTaskStore} from "@/hooks/useTaskStore";
import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface TaskCardProps {
    task: Task;
    isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
    type: TaskType;
    task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
    const { userEmail, loading } = useUserEmail(task?.assignedTo || null);
    const {deleteTask} = useTaskStore();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task
        } satisfies TaskDragData,
        attributes: {
            roleDescription: 'Task'
        }
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform)
    };

    const variants = cva('', {
        variants: {
            dragging: {
                over: 'ring-2 opacity-30',
                overlay: 'ring-2 ring-primary'
            }
        }
    });

    return (
        <>
            <Card
                ref={setNodeRef}
                style={style}
                className={variants({
                    dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
                })}
            >
                <CardHeader className="space-between relative flex flex-row border-b-2 border-secondary px-3 py-3">
                    <Button
                        variant={'ghost'}
                        {...attributes}
                        {...listeners}
                        className="-ml-2 h-auto cursor-grab p-1 text-secondary-foreground/50"
                    >
                        <span className="sr-only">Move task</span>
                        <GripVertical />
                    </Button>
                    <Badge variant={'outline'} className="ml-auto font-semibold">
                        Task
                    </Badge>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} className="text-red-600">
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="whitespace-pre-wrap px-3 pb-6 pt-3 text-left">
                    <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                    {task.description && (
                        <p className="text-sm">{task.description}</p>
                    )}
                    {task.assignedTo === null ? (
                        <p className="text-sm text-gray-500 mb-2">Not assigned</p>
                    ) : loading ? (
                        <p className="text-sm text-gray-500">Loading...</p>
                    ) : userEmail ? (
                        <p className="text-sm text-gray-500 mb-2">
                            <b>Assigned to:</b> {userEmail}
                        </p>
                    ) : null}
                </CardContent>
            </Card>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this task?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                deleteTask(task.id);
                                setShowDeleteDialog(false);
                            }}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
