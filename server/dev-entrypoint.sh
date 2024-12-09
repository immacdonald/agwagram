#!/bin/sh

until python3 manage.py migrate
do
    echo "Waiting for database to be ready..."
    sleep 2
done

python3 manage.py runserver 0.0.0.0:${PORT}