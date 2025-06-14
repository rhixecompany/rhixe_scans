# Minimal makefile for Python documentation
#

# You can set these variables from the command line, and also
# from the environment for the first two.

COMPOSEEXEC   ?= docker compose
COMPOSEFILE     = ./docker-compose.local.yml



compose_exec:
	$(COMPOSEEXEC) -f $(COMPOSEFILE) exec django

compose_daemon:
	$(COMPOSEEXEC) -f $(COMPOSEFILE) up -d postgres redis redis-slave

compose_build:
	$(COMPOSEEXEC) -f $(COMPOSEFILE) build postgres redis redis-slave

compose_logs:
	$(COMPOSEEXEC) -f $(COMPOSEFILE) logs -f postgres redis redis-slave

compose_down:
	$(COMPOSEEXEC) -f $(COMPOSEFILE) down --remove-orphans -t 0
