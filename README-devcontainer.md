# Dev Container Setup

This project uses the TypeScript/Node.js Dev Container configuration in `.devcontainer/devcontainer.json`.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- The **Dev Containers** extension for Visual Studio Code

## Open the project

1. Start Docker Desktop and wait for Docker to be ready.
2. In VS Code, open the assignment's main folder (the folder containing this README and `.devcontainer`).
3. When prompted, select **Reopen in Container**. If no prompt appears, open the Command Palette and run **Dev Containers: Reopen in Container**.
4. Wait for the container to finish building. Its setup installs the dependencies from `code/start/package.json`.
5. Open a terminal in VS Code and run:

   ```bash
   cd code/start
   export PORT=3001
   npm run dev
   ```

The API runs on port 3001. The container forwards that port to your host machine. Open [http://localhost:3001/api-docs](http://localhost:3001/api-docs) for Swagger UI, and select the **Local** environment in Bruno.

If you are not using a Dev Container, follow the local setup instructions in [README.md](./README.md).
