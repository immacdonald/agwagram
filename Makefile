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
lint-backend:
	cd server && flake8

# Frontend ESLint and Prettier formatting
lint-frontend:
	cd app && npm run format

version-patch:
	bump2version patch

version-minor:
	bump2version minor

version-major:
	bump2version major

.PHONY: dev dev-backend prod lint-backend lint-frontend version-patch version-minor version-major