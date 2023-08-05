# Loads a .env file by name (without extension)
define setup_env
    $(eval ENV_FILE := $(1).env)
    @echo " - setup env $(ENV_FILE)"
    $(eval include $(1).env)
    $(eval export)
endef

# Full rebuild of Docker
build:
	echo 'Building BLOC website Docker image'
	$(call setup_env, development)
	docker-compose build --no-cache

run:
	echo 'Running BLOC website'
	$(call setup_env, development)
	docker-compose up

docker:
	$(MAKE) build
	$(MAKE) run

# Creates a blank secrets.env file
secret_file:
	test -f secrets.env && echo 'Secret File Already Created' || echo "BEARER_TOKEN=Insert Twitter API bearer token here" > secrets.env

# Makes the virtual environment for local execution
virtualenv:
	python3 -m venv venv
	. ./venv/bin/activate
	pip3 install --upgrade pip
	pip3 install -r requirements.txt

remove_virtualenv:
	rm -rf venv

# Runs the Django server locally (no Docker)
run_local:
	test -d venv || $(MAKE) virtualenv
	. ./venv/bin/activate
	$(call setup_env, secrets)
	$(call setup_env, development)
	python3 manage.py makemigrations
	python3 manage.py migrate
	python3 manage.py runserver 0.0.0.0:${PORT}

# flake8 linter
run_flake8:
	flake8