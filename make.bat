@ECHO OFF


@REM set COMPOSEEXEC=docker compose
@REM set COMPOSEFILE=./docker-compose.local.yml


@REM :compose_daemon:
@REM %COMPOSEEXEC% -f %COMPOSEFILE% up -d

@REM :compose_build:
@REM %COMPOSEEXEC% -f %COMPOSEFILE% build

@REM :compose_logs:
@REM %COMPOSEEXEC% -f %COMPOSEFILE% logs -f

@REM :compose_down:
@REM %COMPOSEEXEC% -f %COMPOSEFILE% down --remove-orphans -t 0
docker stop $(docker ps -aq)
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -q)
docker system prune -a -f --volumes
