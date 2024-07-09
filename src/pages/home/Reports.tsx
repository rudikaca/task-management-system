import {useEffect, useMemo} from 'react';
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { useTaskStore } from "@/hooks/useTaskStore";
import { useUsers } from "@/hooks/useUsers";
import { UserRole, TaskPriority } from "@/models/types";
import styles from './Reports.module.scss';
import {useTranslation} from "react-i18next";

interface UserReport {
    id: string;
    email: string;
    role: UserRole;
    tasks: {
        [K in TaskPriority]: number;
    };
}

export default function Reports() {
    const { t } = useTranslation();
    const { tasks, loading: tasksLoading } = useTaskStore();
    const { users, loading: usersLoading } = useUsers();
    const {fetchTasks} = useTaskStore();

    useEffect(() => {
        if (tasks.length === 0 && !tasksLoading) {
            fetchTasks();
        }
    }, [tasks, tasksLoading]);

    const userReports = useMemo(() => {
        const reports: UserReport[] = users.map(user => ({
            id: user.id,
            email: user.email,
            role: user.role,
            tasks: {
                LOW: 0,
                MEDIUM: 0,
                HIGH: 0
            }
        }));

        tasks.forEach(task => {
            if (task.assignedTo && task.priority) {
                const userReport = reports.find(report => report.id === task.assignedTo);
                if (userReport) {
                    userReport.tasks[task.priority]++;
                }
            }
        });

        return reports;
    }, [users, tasks]);

    if (tasksLoading || usersLoading) {
        return <div className={styles.loading}>{t('reports.loading')}</div>;
    }

    return (
        <div className={styles.reportsContainer}>
            <PageHeader>
                <PageHeaderHeading>{t('reports.title')}</PageHeaderHeading>
            </PageHeader>

            <div className={styles.tableContainer}>
                <h3 className={styles.tableTitle}>{t('reports.allMembers')}</h3>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>{t('reports.email')}</th>
                            <th>{t('reports.role')}</th>
                            <th>{t('reports.lowPriority')}</th>
                            <th>{t('reports.mediumPriority')}</th>
                            <th>{t('reports.highPriority')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userReports.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`${styles.role} ${styles[user.role.toLowerCase()]}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>{user.tasks.LOW}</td>
                                <td>{user.tasks.MEDIUM}</td>
                                <td>{user.tasks.HIGH}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}