FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY Bookstore.csproj ./
RUN dotnet restore Bookstore.csproj

COPY . ./
RUN dotnet publish Bookstore.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish ./

ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 10000

ENTRYPOINT ["sh", "-c", "dotnet Bookstore.dll --urls http://0.0.0.0:${PORT:-10000}"]
