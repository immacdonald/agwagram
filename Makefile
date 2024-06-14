# Loads a .env file by name (without extension)
define setup_env
    $(eval ENV_FILE := $(1).env)
    @echo " Setup env $(ENV_FILE)"
    $(eval include $(1).env)
    $(eval export)
endef

dev:
	$(call setup_env, development)
	docker-compose -f docker-compose-dev.yml up --build --renew-anon-volumes

dev-backend:
	$(call setup_env, development)
	docker-compose -f docker-compose-dev-backend.yml up --build

prod:
	docker-compose up --build

# Backend flake8 linting
lint_backend:
	cd bloc && flake8

# Frontend ESLint and Prettier formatting
lint_frontend:
	cd agwagram && npm run format