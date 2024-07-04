interface AppConfig {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfig = {
    name: "Task Management System",
    github: {
        title: "Task Management System",
        url: "https://github.com/rudikaca/task-management-system",
    },
    author: {
        name: "rudi",
        url: "https://github.com/rudikaca",
    }
}