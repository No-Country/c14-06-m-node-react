# c14-06-m-node-react project

There are separate projects for the frontend and backend.

## Project layout

```
        
│
│   package.json        Root project metadata.
│   pnpm-lock.yaml      Dependencies lockfile.
│   pnpm-workspace.yaml Pnpm workspace configuration.
│
├───backend                The backend example project.
│   ├───src                    Source code.
│   └───test                Test files.
└───frontend            The frontend example project.
    └───src                    Source code.

```

## Setup

Install dependencies:

```bash
pnpm install
```

## Run in production

Run the fullstack application in production mode (well, simulating production):

```bash
pnpm start
```

## Run in development

Run the fullstack application in development mode (with live reload enabled in the backend):

```bash
pnpm run start:dev
```

Point your browser at http://localhost:3000 to see the frontend, or http://localhost:3001 to access the backend API.

