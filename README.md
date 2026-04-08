# bookstore
An ASP.NET Core Blazor Bookstore app.

## Deploy Without Azure Permissions (Render)

This repository includes a `render.yaml` blueprint so you can deploy your fork without Azure access or GitHub Action secrets.

### One-time setup

1. Push this repository to your own GitHub account.
2. Sign in to Render and choose **New +** -> **Blueprint**.
3. Connect your forked repository.
4. Render reads `render.yaml` and creates the web service.
5. Deploy.

### Runtime notes

1. The app uses SQLite (`bookstore.db`) in development.
2. Without a persistent disk, data may reset on restarts/redeploys.
3. If you need persistent data, add a persistent disk in Render and point your DB file there.

### Local run

```bash
dotnet run
```
