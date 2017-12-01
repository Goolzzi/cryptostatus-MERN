dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

prod:
	npm i
	pm2 start src/index.js --name="api" -f

prod-docker:
	docker-compose build --no-cache
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --force-recreate -d

