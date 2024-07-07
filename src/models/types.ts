import {UniqueIdentifier} from "@dnd-kit/core";

export type UserRole = 'ADMIN' | 'USER';

export type UserAuth = {
    email: string,
    password: string,
    role?: UserRole
}

export type AuthState = {
    loggedIn: boolean,
    loading: boolean,
    error?: string,
    user?: {
        id: string,
        email: string,
        role?: UserRole
    } | null
}

export type FirebaseAuthResponse = {
    id: string,
    displayName?: "ADMIN" | "USER",
    email: string,
    role?: UserRole
}


export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

const defaultCols = [
    {
        id: 'TODO' as const,
        title: 'Todo'
    }
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]['id'];

export type Task = {
    id: UniqueIdentifier;
    title: string;
    description: string | undefined;
    status: Status;
    assignedTo: string | null;
};

export type TaskState = {
    tasks: Task[];
    columns: Column[];
    draggedTask: string | null;
    loading: boolean;
    error?: string;
};

export interface Column {
    id: UniqueIdentifier;
    title: string;
}

export type ColumnType = 'Column';

export interface ColumnDragData {
    type: ColumnType;
    column: Column;
}

export interface BoardColumnProps {
    column: Column;
    tasks: Task[];
    isOverlay?: boolean;
}