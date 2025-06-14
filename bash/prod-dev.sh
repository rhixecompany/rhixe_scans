#!/bin/bash

docker compose -f docker-compose.local.yml down --remove-orphans -t 0
# make clean

# sudo rm -r static volumes
# sudo chown -R $USER:$USER .
docker compose -f docker-compose.local.yml build --pull

docker compose -f docker-compose.local.yml up -d

docker compose -f docker-compose.local.yml logs -f
