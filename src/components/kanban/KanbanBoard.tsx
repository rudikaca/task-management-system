import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent, DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import {RootState} from "@/store";
import {Column, Status, Task, TaskPriority} from "@/models/types";
import {useTaskStore} from "@/hooks/useTaskStore";
import NewSectionDialog from "@/components/kanban/NewSectionDialog";
import {BoardColumn, BoardContainer} from "@/components/kanban/BoardColumn";
import {TaskCard} from "@/components/kanban/TaskCard";

interface KanbanBoardProps {
    searchTerm: string;
    priorityFilter: TaskPriority | 'ALL';
}

export function KanbanBoard({ searchTerm, priorityFilter }: KanbanBoardProps) {
    const {user} = useSelector((state: RootState) => state.auth);

    const {
        tasks,
        columns,
        fetchTasks,
        fetchColumns,
        updateTask,
        setCols,
        setTasks,
        getFilteredTasks
    } = useTaskStore();

    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const filteredTasks = useMemo(() => {
        const userTasks = getFilteredTasks(user?.role, user?.id);
        return userTasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (priorityFilter === 'ALL' || task.priority === priorityFilter)
        );
    }, [tasks, user, searchTerm, priorityFilter, getFilteredTasks]);

    useEffect(() => {
        fetchTasks();
        fetchColumns();
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );
    const handleDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task);
        } else if (event.active.data.current?.type === 'Column') {
            setActiveColumn(event.active.data.current.column);
        }
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (active.data.current?.type === 'Task' && over.data.current?.type === 'Column') {
            const activeTask = tasks.find(t => t.id === activeId);
            if (activeTask) {
                updateTask({ ...activeTask, status: overId as Status });
            }
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        if (active.data.current?.type === 'Column' && over.data.current?.type === 'Column') {
            const activeColumnIndex = columns.findIndex(col => col.id === active.id);
            const overColumnIndex = columns.findIndex(col => col.id === over.id);
            if (activeColumnIndex !== overColumnIndex) {
                const newColumns = arrayMove(columns, activeColumnIndex, overColumnIndex);
                setCols(newColumns);
            }
        } else if (active.data.current?.type === 'Task' && over.data.current?.type === 'Task') {
            const activeIndex = tasks.findIndex(t => t.id === active.id);
            const overIndex = tasks.findIndex(t => t.id === over.id);
            if (activeIndex !== overIndex) {
                const newTasks = arrayMove(tasks, activeIndex, overIndex);
                setTasks(newTasks);
            }
        }

        setActiveTask(null);
        setActiveColumn(null);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <BoardContainer>
                <SortableContext items={columns.map(col => col.id)}>
                    {columns.map((column) => (
                        <BoardColumn
                            key={column.id}
                            column={column}
                            tasks={filteredTasks.filter((task) => task.status === column.id)}
                        />
                    ))}
                </SortableContext>
                <div className="w-[200px]">
                    <NewSectionDialog />
                </div>
            </BoardContainer>
            <DragOverlay>
                {activeTask && <TaskCard task={activeTask} isOverlay />}
                {activeColumn && (
                    <BoardColumn
                        column={activeColumn}
                        tasks={filteredTasks.filter((task) => task.status === activeColumn.id)}
                        isOverlay
                    />
                )}
            </DragOverlay>
        </DndContext>
    );
}
