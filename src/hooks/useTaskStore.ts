import { UniqueIdentifier } from '@dnd-kit/core';
import {RootState, useAppDispatch, useAppSelector} from '@/store';
import {
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    fetchColumns,
    addColumn,
    updateColumn,
    deleteColumn,
} from '@/store/actions/taskActions';
import {dragTask, setCols, setTasks} from "@/store/slices/taskSlice";
import {Column, Status, Task, UserRole} from "@/models/types";

export const useTaskStore = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
    const columns = useAppSelector((state: RootState) => state.tasks.columns);
    const draggedTask = useAppSelector((state: RootState) => state.tasks.draggedTask);
    const loading = useAppSelector((state: RootState) => state.tasks.loading);
    const error = useAppSelector((state: RootState) => state.tasks.error);

    const getFilteredTasks = (userRole: UserRole | undefined, userId: string | undefined) => {
        if (userRole === 'ADMIN') {
            return tasks;
        } else {
            return tasks.filter(task => task.assignedTo === userId);
        }
    }

    return {
        tasks,
        columns,
        draggedTask,
        loading,
        error,
        getFilteredTasks,
        fetchTasks: () => dispatch(fetchTasks()),
        addTask: (title: string, description?: string, status: Status = 'TODO', assignedTo: string | null = null) =>
            dispatch(addTask({ title, description, status, assignedTo: assignedTo || null })),
        updateTask: (task: Task) => dispatch(updateTask(task)),
        deleteTask: (id: UniqueIdentifier) => dispatch(deleteTask(id)),
        fetchColumns: () => dispatch(fetchColumns()),
        addColumn: (title: string) => dispatch(addColumn(title)),
        updateColumn: (id: UniqueIdentifier, newName: string) => dispatch(updateColumn({ id, newName })),
        deleteColumn: (id: UniqueIdentifier) => dispatch(deleteColumn(id)),
        // Synchronous actions
        dragTask: (id: UniqueIdentifier | null) => dispatch(dragTask(id as string)),
        setTasks: (updatedTasks: Task[]) => dispatch(setTasks(updatedTasks)),
        setCols: (cols: Column[]) => dispatch(setCols(cols)),
    };
};