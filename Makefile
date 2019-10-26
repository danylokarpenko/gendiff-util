install: install-deps
run:
	npx babel-node 'src/bin/gendiff.js' ./__tests__/__fixtures__/json/deep-before.json ./__tests__/__fixtures__/json/deep-after.json
build:
	rm -rf dist
	npm run build
prepublishOnly:
	npm run prepublishOnly
lint:
	npx eslint .
test:
	npm test
test-watch:
	npx jest --watch
test-covegare:
	npx jest --coverage
