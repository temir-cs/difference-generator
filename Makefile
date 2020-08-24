# Makefile
install:
	npm install
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx -n --experimental-vm-modules jest
test-watch:
	npx -n --experimental-vm-modules jest --watch
