FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

COPY *.sln .
COPY ./src/Web/Web.csproj ./src/Web/
COPY ./src/Core/Core.csproj ./src/Core/
COPY ./src/Infrastructure/Infrastructure.csproj ./src/Infrastructure/
COPY ./tests/IntegrationTests/IntegrationTests.csproj ./tests/IntegrationTests/
COPY ./tests/UnitTests/UnitTests.csproj ./tests/UnitTests/
RUN dotnet restore

COPY ./tests ./tests
COPY ./src ./src

WORKDIR /app/src/Web

RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 as runtime
WORKDIR /app

ARG CLIENT_URL
ENV CLIENT_URL $CLIENT_URL

COPY --from=build-env /app/src/Web/out .
ENTRYPOINT ["dotnet", "Web.dll"]
