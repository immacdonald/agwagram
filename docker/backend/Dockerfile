# docker/backend/Dockerfile
FROM docker.io/library/python:3.10

WORKDIR /app
COPY ./bloc/requirements.txt /app/backend/

RUN pip install --upgrade pip \
    && pip install -r backend/requirements.txt

COPY ./bloc /app/backend
COPY docker/backend/run_dev_server.sh /app/backend

WORKDIR /app/backend

RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "blocservices.wsgi", "--bind", "0.0.0.0:8000", "--workers", "4", "--threads", "4"]