GIT_BRANCH = $(shell git rev-parse --abbrev-ref HEAD)

dev:
	npm run dev

deploy:
	gh workflow run 'Deploy' --ref "$(GIT_BRANCH)"

.PHONY: dev deploy