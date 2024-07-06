# React Shadcn Starter

React + Vite + TypeScript template for building apps with shadcn/ui.

## Getting Started

```
git clone https://github.com/rudikaca/task-management-system.git
cd new-project
npm install
npm run dev

Start JSON Server:
json-server --watch db.json --port 3001
```

## Getting Done

- [x] Single page app with navigation and responsive layout

- [x] Customizable configuration `/config`

- [x] Simple starting page/feature `/pages`

- [x] Github action deploy github pages


### Auto Deploy
- change file `.github/workflows/build-and-deploy.yml`
- Comment on `workflow_dispatch`
- Uncomment on `push`
```yaml
# on:
#   workflow_dispatch:
on:
  push:
    branches: ["main"]
```

## Features

- React + Vite + TypeScript
- Tailwind CSS
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [shadcn-ui](https://github.com/shadcn-ui/ui/)
- [radix-ui/icons](https://www.radix-ui.com/icons)

## Project Structure

```
react-shadcn-starter/
├── public/            # Public assets
├── src/               # Application source code
│   ├── components/    # React components
│   │   └── ui/        # shadc/ui components
│   │   └── layouts/   # layouts components
│   ├── context/       # contexts components
│   ├── config/        # Config data
│   ├── hook/          # Custom hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # pages/features components
│   ├── App.tsx        # Application entry point
│   ├── index.tsx      # Main rendering file
│   └── Router.tsx     # Routes component
├── index.html         # HTML entry point
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```