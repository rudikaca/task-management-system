import {ActionReducerMapBuilder, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchTasks, addTask, updateTask, deleteTask, fetchColumns, addColumn, updateColumn, deleteColumn } from '@/store/actions/taskActions';
import {Column, Task, TaskState} from "@/models/types";

const initialState: TaskState = {
    tasks: [],
    columns: [],
    draggedTask: null,
    loading: false,
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        dragTask: (state, action: PayloadAction<string | null>) => {
            state.draggedTask = action.payload;
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        setCols: (state, action: PayloadAction<Column[]>) => {
            state.columns = action.payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<TaskState>) => {
        // Fetch Tasks
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Add Task
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update Task
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = false;
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete Task
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Fetch Columns
            .addCase(fetchColumns.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchColumns.fulfilled, (state, action: PayloadAction<Column[]>) => {
                state.loading = false;
                state.columns = action.payload;
            })
            .addCase(fetchColumns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Add Column
            .addCase(addColumn.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(addColumn.fulfilled, (state, action: PayloadAction<Column>) => {
                state.loading = false;
                state.columns.push(action.payload);
            })
            .addCase(addColumn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update Column
            .addCase(updateColumn.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(updateColumn.fulfilled, (state, action: PayloadAction<Column>) => {
                state.loading = false;
                const index = state.columns.findIndex(col => col.id === action.payload.id);
                if (index !== -1) {
                    state.columns[index] = action.payload;
                }
            })
            .addCase(updateColumn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

        // Delete Column
            .addCase(deleteColumn.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(deleteColumn.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.columns = state.columns.filter(col => col.id !== action.payload);
            })
            .addCase(deleteColumn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { dragTask, setTasks, setCols } = taskSlice.actions;
export default taskSlice.reducer;