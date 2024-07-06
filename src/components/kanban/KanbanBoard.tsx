import {useEffect} from "react";
import {useTaskStore} from "@/hooks/useTaskStore";
import {BoardColumn, BoardContainer} from "@/components/kanban/BoardColumn";
import NewSectionDialog from "@/components/kanban/NewSectionDialog";

export function KanbanBoard() {
    const {
        tasks,
        columns,
        fetchTasks,
        fetchColumns,
    } = useTaskStore();

    useEffect(() => {
        fetchTasks();
        fetchColumns();
    }, []);

    return (
        <BoardContainer>
            {columns.map((column) => (
                <BoardColumn
                    key={column.id}
                    column={column}
                    tasks={tasks.filter((task) => task.status === column.id)}
                />
            ))}
            <div className="w-[350px]">
                <NewSectionDialog />
            </div>
        </BoardContainer>
    );
}
