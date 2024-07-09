# Task Management System

## Getting Started

To get the frontend running locally:

* Clone this repo
* `npm install` to install all required dependencies
* `npm install json-server` to install JSON Server (nvm install v18.20.4)
* `npm run dev` to start the local server (this project uses [https://vitejs.dev/](https://vitejs.dev))
* `json-server --watch db.json --port 3001` to start JSON Server

## Packages used

- React + Vite + TypeScript
- [Redux(toolkit)](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/docs/intro)
- [tailwind CSS](https://tailwindcss.com/docs/configuration)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [shadcn-ui](https://github.com/shadcn-ui/ui/)
- [radix-ui/icons](https://www.radix-ui.com/icons)
- [@dnd-kit/core](https://dndkit.com/)

## Functionalities:

* Authentication with firebase
* Register like Admin or User
* When user login can see his own tasks assigned by admin
* An admin can create tasks and assign the task to all users and can see on the dashboard all tasks that exist
* The tasks are stored on the project file db.json simulated by json-server mock backend
* Admin and User can edit and delete the tasks showed on dashboard
* User can move the task from one column to the other (TODO -> IN PROGRESS -> DONE)
* On dashboard the user can search for any task by title and also can filter by priority