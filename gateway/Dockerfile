FROM python:3

COPY ./ /app
WORKDIR /app

RUN chown -R :0 /app && \
    chmod -R g+rwx /app && \
    pip install -r /app/requirements.txt

ENV GUNICORN_WORKER_CLASS=sync \
    GUNICORN_WORKER_COUNT=4 \
    GUNICORN_PORT=5000

EXPOSE $GUNICORN_PORT

CMD ["/app/run.sh"]
