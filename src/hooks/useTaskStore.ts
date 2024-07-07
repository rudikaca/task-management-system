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
import { UniqueIdentifier } from '@dnd-kit/core';
import {Column} from "@/components/kanban/BoardColumn";
import {dragTask, setCols, setTasks, Status, Task} from "@/store/slices/taskSlice";

export const useTaskStore = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
    const columns = useAppSelector((state: RootState) => state.tasks.columns);
    const draggedTask = useAppSelector((state: RootState) => state.tasks.draggedTask);
    const loading = useAppSelector((state: RootState) => state.tasks.loading);
    const error = useAppSelector((state: RootState) => state.tasks.error);

    return {
        tasks,
        columns,
        draggedTask,
        loading,
        error,
        fetchTasks: () => dispatch(fetchTasks()),
        addTask: (title: string, description?: string, status: Status = 'TODO', assignedTo: string | null = null) => dispatch(addTask({ title, description, status, assignedTo: assignedTo || null })),
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