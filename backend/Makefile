# Minimal makefile for Python documentation
#

# You can set these variables from the command line, and also
# from the environment for the first two.
PYTHONEXEC   ?= python
# PYTHONEXEC   ?= ../myvenv/Scripts/python
FIXTUREDIR     = ./fixtures/db.json

python:
	$(PYTHONEXEC)

server:
	$(PYTHONEXEC) manage.py runserver

loadone:
	$(PYTHONEXEC) manage.py loadone

loadall:
	$(PYTHONEXEC) manage.py loadall

download:
	$(PYTHONEXEC) manage.py download
crawl:
	$(PYTHONEXEC) manage.py crawl

crawls:
	$(PYTHONEXEC) manage.py crawls

generate:
	$(PYTHONEXEC) manage.py generate

shell:
	$(PYTHONEXEC) manage.py shell_plus

migrate:
	$(PYTHONEXEC) manage.py migrate

migrate_social:
	$(PYTHONEXEC) manage.py migrate socialaccount

makemigrations:
	$(PYTHONEXEC) manage.py makemigrations

collectstatic:
	$(PYTHONEXEC) manage.py collectstatic --noinput

flush:
	$(PYTHONEXEC) manage.py flush --noinput

celery_beat:
	$(PYTHONEXEC) -m celery -A config.celery_app beat -l info

celery_worker:
	$(PYTHONEXEC)  -m celery -A config.celery_app worker -l INFO --pool solo

dumpdata:
	$(PYTHONEXEC) -Xutf8 manage.py dumpdata  --indent 4 -o $(FIXTUREDIR)

loaddata:
	$(PYTHONEXEC) manage.py loaddata --ignorenonexistent --force-color $(FIXTUREDIR)

script:
	$(PYTHONEXEC) manage.py runscript orm_script

compilemessages:
	$(PYTHONEXEC) manage.py compilemessages

makemessages:
	$(PYTHONEXEC) manage.py makemessages --all --no-location
