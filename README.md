# Bookstore

A beginner-friendly web app where users can browse books, add items to a cart, and place orders.

This project is mainly a learning project for building a full web application with C# and .NET.

## What This Project Does

- Shows a list of books
- Lets users view book details
- Supports a shopping cart experience
- Allows users to place and review orders

## Tech Stack (Simple Explanation)

- C# and .NET 10: the main programming language and app platform
- Blazor Server: builds the website UI using C# instead of JavaScript-heavy frameworks
- ASP.NET Core: runs the web app and handles routing/server behavior
- Entity Framework Core: reads and writes data using C# classes
- SQLite: lightweight local database used in development
- SQL Server: supported for production-style database setups
- Render: cloud platform used for deployment

## Who This Is For

- Students learning modern C# web development
- Beginners who want to understand how frontend, backend, and database pieces connect

## Run Locally

1. Install the .NET 10 SDK.
2. In the project folder, run:

```bash
dotnet run
```

3. Open the local URL shown in the terminal.

## Deploy Without Azure Permissions (Render)

This repository includes a `render.yaml` blueprint so you can deploy your own fork without Azure access or GitHub Action secrets.

### One-Time Setup

1. Push this repository to your own GitHub account.
2. Sign in to Render and choose New + -> Blueprint.
3. Connect your forked repository.
4. Render reads `render.yaml` and creates the web service.
5. Deploy.

### Runtime Notes

1. The app uses SQLite (`bookstore.db`) in development.
2. Without a persistent disk, data may reset on restarts or redeploys.
3. If you need persistent data, add a persistent disk in Render and point your DB file there.
