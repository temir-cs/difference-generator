# Makefile
install:
	npm install
gendiff-json:
	node --experimental-json-modules bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json
gendiff-json-flat-plain:
	node --experimental-json-modules bin/gendiff.js --format plain ./__fixtures__/before-flat.json ./__fixtures__/after-flat.json
gendiff-yml:
	node --experimental-json-modules bin/gendiff.js ./__fixtures__/before-flat.yml ./__fixtures__/after-flat.yml
gendiff-ini:
	node --experimental-json-modules bin/gendiff.js ./__fixtures__/before-flat.ini ./__fixtures__/after-flat.ini
gendiff-stylish:
	node --experimental-json-modules bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json
gendiff-plain:
	node --experimental-json-modules bin/gendiff.js -f plain ./__fixtures__/before.json ./__fixtures__/after.json
gendiff-jsonish:
	node --experimental-json-modules bin/gendiff.js -f json ./__fixtures__/before.json ./__fixtures__/after.json
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-watch:
	npm test -- --watch
test-coverage:
	npm test -- --coverage --coverageProvider=v8
