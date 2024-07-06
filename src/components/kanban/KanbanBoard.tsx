import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {addTask, deleteTask, moveTask, Task, updateTask} from "@/store/slices/taskSlice";

export function KanbanBoard() {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const handleAddTask = (task: Task) => {
        dispatch(addTask(task));
    };

    const handleUpdateTask = (task: Task) => {
        dispatch(updateTask(task));
    };

    const handleDeleteTask = (id: string) => {
        dispatch(deleteTask(id));
    };

    const handleMoveTask = (id: string, status: 'todo' | 'doing' | 'done') => {
        dispatch(moveTask({ id, status }));
    };

    const renderTasks = (status: 'todo' | 'doing' | 'done') => {
        return tasks
            .filter(task => task.status === status)
            .map(task => (
                <div key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    <button onClick={() => handleMoveTask(task.id, 'todo')}>Move to Todo</button>
                    <button onClick={() => handleMoveTask(task.id, 'doing')}>Move to Doing</button>
                    <button onClick={() => handleMoveTask(task.id, 'done')}>Move to Done</button>
                </div>
            ));
    };

    return (
        <div>
            <div>
                <h2>Todo</h2>
                {renderTasks('todo')}
            </div>
            <div>
                <h2>Doing</h2>
                {renderTasks('doing')}
            </div>
            <div>
                <h2>Done</h2>
                {renderTasks('done')}
            </div>
        </div>
    );
}
