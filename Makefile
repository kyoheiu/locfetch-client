all: deploy
.PHONY: deploy

deploy:
	yarn build
	gcloud app deploy
