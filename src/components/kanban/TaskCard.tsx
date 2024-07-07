import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';
import {Badge} from "@/components/ui/badge";
import {UniqueIdentifier} from "@dnd-kit/core";
import {useUserEmail} from "@/hooks/useUserEmail";

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
    id: UniqueIdentifier;
    title: string;
    description?: string;
    status: Status;
    assignedTo: string | null;
};

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
    );
}