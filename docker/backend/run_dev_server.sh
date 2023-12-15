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

# Options to DEBUG Django server
# Optional commands to replace abouve gunicorn command

# Option 1:
# Run gunicorn with debug log level
# gunicorn server.wsgi --bind 0.0.0.0:8000 --workers 1 --threads 1 --log-level debug

# Option 2:
# Run development server
# DEBUG=True ./manage.py runserver 0.0.0.0:8000