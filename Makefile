FEATUREAPPSSRC=feature-app-react feature-app-angular
SRC=integrator integrator-nextjs $(FEATUREAPPSSRC)

.PHONY: clean install build-amd build-federated start-amd start-federated

install: 
	@npm i && \
	for dir in $(SRC); do \
		echo "Installing dependencies for $$dir..."; \
		cd $$dir && npm install && cd ..; \
	done

clean: 
	@rm -rf node_modules && \
	for dir in $(SRC); do \
		echo "Cleaning project $$dir..."; \
		rm -rf $$dir/node_modules $$dir/dist;\
	done

build-amd: 
	@echo "Building project integrator-nextjs"; \
	cd integrator-nextjs && npm run build && cd ..; \
	for dir in $(FEATUREAPPSSRC); do \
		echo "Building project $$dir..."; \
		cd $$dir && npm run build:umd && cd ..; \
	done

build-federated: 
	@echo "Building project integrator"; \
	cd integrator && npm run build && cd ..; \
	for dir in $(FEATUREAPPSSRC); do \
		echo "Building project $$dir..."; \
		cd $$dir && npm run build:federated && cd ..; \
	done

start-amd: 
	@echo "Starting dev servers for AMD module loader" && \
	npx concurrently \
		"cd integrator-nextjs && npm run dev" \
		$(foreach dir, $(FEATUREAPPSSRC), "cd $(dir) && npm run start:umd")

start-federated: 
	@echo "Starting dev servers for AMD module loader" && \
	npx concurrently \
		"cd integrator && npm run start" \
		$(foreach dir, $(FEATUREAPPSSRC), "cd $(dir) && npm run start:federated")
        