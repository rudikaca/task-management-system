import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {KanbanBoard} from "@/components/kanban/KanbanBoard";

export default function Dashboard() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Dashboard</PageHeaderHeading>
            </PageHeader>
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <div className="flex items-start justify-between">
                    {/*TODO this will be accessed only from admin users*/}
                    {/*add new task to board (add button)*/}
                </div>
                <KanbanBoard />
            </div>
        </>
    )
}
