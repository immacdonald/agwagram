# docker/backend/Dockerfile
FROM docker.io/library/python:3.10

WORKDIR /app
COPY ./server/requirements.txt /app/backend/

RUN pip install --upgrade pip \
    && pip install -r backend/requirements.txt

COPY ./server /app/backend
COPY docker/backend/run_dev_server.sh /app/backend

WORKDIR /app/backend

CMD ["gunicorn", "blocservices.wsgi", "--bind", "0.0.0.0:8000", "--workers", "4", "--threads", "4", "--log-config", "gunicorn-logging.conf"]
