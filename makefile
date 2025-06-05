.PHONY: services-up services-down migrate-all

services-up:
	@docker-compose -f docker-compose.yml up -d
	@docker-compose -f ./invoices/docker-compose.yml up -d
	@docker-compose -f ./orders/docker-compose.yml up -d

services-down:
	@docker-compose -f docker-compose.yml down --remove-orphans
	@docker-compose -f ./invoices/docker-compose.yml down --remove-orphans
	@docker-compose -f ./orders/docker-compose.yml down --remove-orphans

migrate-all:
	@cd ./invoices && \
	npx drizzle-kit generate && \
	npx drizzle-kit migrate
	@cd ./orders && \
	npx drizzle-kit generate && \
	npx drizzle-kit migrate