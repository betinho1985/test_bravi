#!/bin/sh

umask 002

#python /app/manage.py makemigrations
python /app/chess/manage.py migrate
python /app/chess/manage.py collectstatic --noinput
pip install -r /app/chess/requirements.txt
gunicorn --worker-class=$GUNICORN_WORKER_CLASS --workers=$GUNICORN_WORKER_COUNT --reload --log-level info --log-file=- --access-logfile=- chess.wsgi --chdir /app/chess -b 0.0.0.0:$GUNICORN_PORT
