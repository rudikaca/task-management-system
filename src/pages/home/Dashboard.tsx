import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {KanbanBoard} from "@/components/kanban/KanbanBoard";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import NewTaskDialog from "@/components/kanban/NewTaskDialog";

export default function Dashboard() {
    const {user} = useSelector((state: RootState) => state.auth);

    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <div className="flex items-center justify-between">
                <PageHeader>
                    <PageHeaderHeading>Dashboard</PageHeaderHeading>
                </PageHeader>
                {user && user.role === 'ADMIN' && (
                    <NewTaskDialog />
                )}
            </div>
            <KanbanBoard />
        </div>
    )
}
