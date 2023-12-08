# Loads a .env file by name (without extension)
define setup_env
    $(eval ENV_FILE := $(1).env)
    @echo " Setup env $(ENV_FILE)"
    $(eval include $(1).env)
    $(eval export)
endef

# Full rebuild of Docker
build:
	echo 'Building BLOC website Docker image'
	$(call setup_env, development)
	docker-compose -f docker-compose-dev.yml build --no-cache

run:
	echo 'Running BLOC website'
	$(call setup_env, development)
	docker-compose docker-compose-dev.yml up

docker:
	$(MAKE) build
	$(MAKE) run

# Creates a blank secrets.env file
secret_file:
	test -f secrets.env && echo 'Secret File Already Created' || echo "BEARER_TOKEN=Insert Twitter API bearer token here" > secrets.env

# Makes the virtual environment for local execution
virtualenv:
	cd bloc && rm -rf ./venv && python3 -m venv venv && . ./venv/bin/activate && pip3 install --upgrade pip && pip3 install -r requirements.txt

# Runs the frontend locally (no Docker)
frontend:
	$(call setup_env, development)
	cd agwagram && npm run dev

backend:
	$(call setup_env, development)
	$(MAKE) virtualenv
	cd bloc && python3 manage.py makemigrations && python3 manage.py migrate && python3 manage.py runserver 0.0.0.0:${PORT} &

# Runs the Django server locally (no Docker)
run_local:
	$(call setup_env, secrets)
	$(MAKE) backend
	$(MAKE) frontend
	

# Backend flake8 linting
lint_backend:
	cd bloc && flake8

# Frontend ESLint and Prettier formatting
lint_frontend:
	cd agwagram && npm run format