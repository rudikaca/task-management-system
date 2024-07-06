import { createAsyncThunk } from '@reduxjs/toolkit';
import * as taskService from '@/services/taskService';
import {Task} from "@/store/slices/taskSlice";
import {UniqueIdentifier} from "@dnd-kit/core";

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, { rejectWithValue }) => {
        return await taskService.fetchTasks(rejectWithValue);
    }
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (task: Omit<Task, 'id'>, { rejectWithValue }) => {
        return await taskService.addTask(task, rejectWithValue);
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (task: Task, { rejectWithValue }) => {
        return await taskService.updateTask(task, rejectWithValue);
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id: UniqueIdentifier, { rejectWithValue }) => {
        return await taskService.deleteTask(id, rejectWithValue);
    }
);

export const fetchColumns = createAsyncThunk(
    'tasks/fetchColumns',
    async (_, { rejectWithValue }) => {
        return await taskService.fetchColumns(rejectWithValue);
    }
);

export const addColumn = createAsyncThunk(
    'tasks/addColumn',
    async (title: string, { rejectWithValue }) => {
        return await taskService.addColumn(title, rejectWithValue);
    }
);

export const updateColumn = createAsyncThunk(
    'tasks/updateColumn',
    async ({ id, newName }: { id: UniqueIdentifier; newName: string }, { rejectWithValue }) => {
        return await taskService.updateColumn({ id, newName }, rejectWithValue);
    }
);

export const deleteColumn = createAsyncThunk(
    'tasks/deleteColumn',
    async (id: UniqueIdentifier, { rejectWithValue }) => {
        return await taskService.deleteColumn(id, rejectWithValue);
    }
);