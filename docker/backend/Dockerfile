# docker/backend/Dockerfile
FROM python:3.10

WORKDIR /app
ADD ./bloc/requirements.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./bloc /app/backend