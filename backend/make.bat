@ECHO OFF

set PYTHONEXEC=../myvenv/Scripts/python
set FIXTUREDIR=./fixtures


:python:
%PYTHONEXEC%

:server:
%PYTHONEXEC% ./manage.py runserver
