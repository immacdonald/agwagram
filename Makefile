# Loads a .env file by name (without extension)
define setup_env
    $(eval ENV_FILE := $(1).env)
    @echo " Setup env $(ENV_FILE)"
    $(eval include $(1).env)
    $(eval export)
endef

dev:
	$(call setup_env, development)
	docker-compose -f docker-compose-dev.yml up --build

# Creates a built version of frontend/backend using dev settings
qa:
	docker-compose up --build

prod:
	docker-compose -f docker-compose-prod.yml up --build
	

# Backend flake8 linting
lint_backend:
	cd bloc && flake8

# Frontend ESLint and Prettier formatting
lint_frontend:
	cd agwagram && npm run format