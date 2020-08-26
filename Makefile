# Makefile
install:
	npm install
gendiff-json:
	node --experimental-json-modules bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json
gendiff-yml:
	node --experimental-json-modules bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-watch:
	npm test -- --watch
test-coverage:
	npm test -- --coverage --coverageProvider=v
