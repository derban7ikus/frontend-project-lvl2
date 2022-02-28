publish:
		npm publish --dry-run

lint:
		npx eslint .

install: install-deps

install-deps:
	npm ci

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
