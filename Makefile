build-prod:
	git pull origin main
	docker build -t asia-southeast1-docker.pkg.dev/durable-cursor-409309/open-campus/fe:$(TAG) .
	docker push asia-southeast1-docker.pkg.dev/durable-cursor-409309/open-campus/fe:$(TAG)