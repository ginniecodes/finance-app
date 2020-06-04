M = $(shell printf "\033[34;1m▶\033[0m")

include .env
export
build:  ; $(info $(M) Building project...)
	cd ui && yarn build

clean: ; $(info $(M) [TODO] Removing generated files... )
	$(RM -RF) client/build/

#schema:  ; $(info $(M) Embedding schema files into binary...)
#	go generate ./schema

database: ; $(info $(M) Running db container...)
	docker run --rm --name pg --volume "${PWD}/data:/var/lib/postgresql/data" -p "5432:5432" -e POSTGRES_DB=${DATABASE_NAME} -e POSTGRES_USER=${DATABASE_USER} -e POSTGRES_PASSWORD=${DATABASE_PASSWORD} -e POSTGRES_ROOT_PASSWORD=${DATABASE_PASSWORD} postgres:10.1-alpine

tests: ; $(info $(M) [TODO] Removing generated files... )
	NODE_ENV=testing yarn test --coverage

dependencies: ; $(info $(M) Insalling dependencies [TODO] Removing generated files... )
	yarn && cd client && yarn


server: ; $(info $(M) Starting development server...)
	yarn start

client: ; $(info $(M) Starting development client...)
	cd client && yarn start


.PHONY: build clean database server client test
