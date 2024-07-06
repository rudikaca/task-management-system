import { api } from './api';
import {Task} from "@/store/slices/taskSlice";
import {UniqueIdentifier} from "@dnd-kit/core";

export type ApiError = {
    code: number,
    message: string
}

export const fetchTasks = async (rejectWithValue: any) => {
    try {
        return await api.getTasks();
    } catch (err) {
        return rejectWithValue((err as ApiError).message as string);
    }
}

export const addTask = async (task: Omit<Task, 'id'>, rejectWithValue: any) => {
    try {
        return await api.addTask(task);
    } catch (err) {
        return rejectWithValue((err as ApiError).message as string);
    }
}

export const updateTask = async (task: Task, rejectWithValue: any) => {
    try {
        return await api.updateTask(task);
    } catch (err) {
        return rejectWithValue((err as ApiError).message as string);
    }
}

export const deleteTask = async (id: UniqueIdentifier, rejectWithValue: any) => {
    try {
        await api.deleteTask(id as string);
        return id;
    } catch (err) {
        return rejectWithValue((err as ApiError).message as string);
    }
}

export const fetchColumns = async (rejectWithValue: any) => {
    try {
        return await api.getColumns();
    } catch (err) {
        return rejectWithValue((err as ApiError).message as string);
    }
}

export const addColumn = async (title: string, rejectWithValue: any) => {
    try {
        return await api.addColumn({ title });
    } catch (err) {
        return rejectWithValue((err as ApiError).message as string);
    }
}

export const updateColumn = async ({ id, newName }: { id: UniqueIdentifier; newName: string }, rejectWithValue: any) => {
    try {
        return await api.updateColumn({ id, title: newName });
    } catch (err) {
        return rejectWithValue((err as ApiError).message as string);
    }
}

export const deleteColumn = async (id: UniqueIdentifier, rejectWithValue: any) => {
    try {
        await api.deleteColumn(id as string);
        return id;
    } catch (err) {
        return rejectWithValue((err as ApiError).message as string);
    }
}