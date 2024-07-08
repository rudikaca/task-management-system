import {useCallback, useState} from "react";
import { useSelector } from "react-redux";
import debounce from 'lodash/debounce';
import { RootState } from "@/store";
import { TaskPriority } from "@/models/types";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import NewTaskDialog from "@/components/kanban/NewTaskDialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Dashboard() {
    const {user} = useSelector((state: RootState) => state.auth);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'ALL'>('ALL');

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearchTerm(value)
        }, 300), []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handlePriorityChange = (value: string) => {
        setPriorityFilter(value as TaskPriority | 'ALL');
    };

    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <div className="flex flex-col items-start justify-center space-y-4">
                <PageHeader>
                    <PageHeaderHeading>Dashboard</PageHeaderHeading>
                </PageHeader>
                <div className="flex items-center justify-between space-x-4 w-full">
                    <Input
                        placeholder="Search tasks..."
                        className="w-64"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Select
                        value={priorityFilter}
                        onValueChange={handlePriorityChange}
                    >
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Tasks</SelectItem>
                            <SelectItem value="LOW">Low</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="HIGH">High</SelectItem>
                        </SelectContent>
                    </Select>
                    {user && user.role === 'ADMIN' && (
                        <NewTaskDialog />
                    )}
                </div>
            </div>
            <KanbanBoard searchTerm={debouncedSearchTerm} priorityFilter={priorityFilter} />
        </div>
    )
}