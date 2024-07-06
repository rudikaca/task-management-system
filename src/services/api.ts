import axios from 'axios';
import { Task } from '@/store/slices/taskSlice';
import {Column} from "@/components/kanban/BoardColumn";

const API_URL = 'http://localhost:3001';

export const api = {
    getTasks: async () => {
        const response = await axios.get<Task[]>(`${API_URL}/tasks`);
        return response.data;
    },
    addTask: async (task: Omit<Task, 'id'>) => {
        const response = await axios.post<Task>(`${API_URL}/tasks`, task);
        return response.data;
    },
    updateTask: async (task: Task) => {
        const response = await axios.put<Task>(`${API_URL}/tasks/${task.id}`, task);
        return response.data;
    },
    deleteTask: async (id: string) => {
        await axios.delete(`${API_URL}/tasks/${id}`);
    },
    getColumns: async () => {
        const response = await axios.get<Column[]>(`${API_URL}/columns`);
        return response.data;
    },
    addColumn: async (column: Omit<Column, 'id'>) => {
        const response = await axios.post<Column>(`${API_URL}/columns`, column);
        return response.data;
    },
    updateColumn: async (column: Column) => {
        const response = await axios.put<Column>(`${API_URL}/columns/${column.id}`, column);
        return response.data;
    },
    deleteColumn: async (id: string) => {
        await axios.delete(`${API_URL}/columns/${id}`);
    },
};