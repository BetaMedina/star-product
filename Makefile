#run the application and all it's dependencies with docker
dev:
	docker build -t star-product -f docker/dockerfile.dev  .
	docker-compose -f docker/docker-compose.yml up 

# #turn off docker container related to the application
dev-off:
	docker-compose -f docker/docker-compose.yml down