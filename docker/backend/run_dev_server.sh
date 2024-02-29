#!/bin/sh

until cd /app/backend
do
    echo "Waiting for server volume..."
done

until python3 manage.py migrate
do
    echo "Waiting for database to be ready..."
    sleep 2
done

python manage.py runserver 0.0.0.0:8000