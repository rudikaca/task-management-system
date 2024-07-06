import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Task = {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'doing' | 'done';
};

type TaskState = {
    tasks: Task[];
};

const initialState: TaskState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        moveTask: (state, action: PayloadAction<{ id: string; status: 'todo' | 'doing' | 'done' }>) => {
            const task = state.tasks.find(t => t.id === action.payload.id);
            if (task) {
                task.status = action.payload.status;
            }
        },
    },
});

export const { addTask, updateTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;