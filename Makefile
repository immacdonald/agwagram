# Full rebuild
clean:
	echo 'Building BLOC website Docker image'
	docker rm -f bloc_website
	docker-compose build
	echo 'Running BLOC website'
	docker-compose up

secret_file:
	test -f secrets.env && echo 'Secret File Already Created' || echo "BEARER_TOKEN='Insert Twitter API bearer token here.'" > secrets.env