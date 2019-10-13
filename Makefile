run-flat:
	dist/bin/gendiff.js ./__tests__/__fixtures__/json/flat-before.json ./__tests__/__fixtures__/json/flat-after.json
	dist/bin/gendiff.js ./__tests__/__fixtures__/yaml/flat-before.yaml ./__tests__/__fixtures__/yaml/flat-after.yaml
	dist/bin/gendiff.js ./__tests__/__fixtures__/ini/flat-before.ini ./__tests__/__fixtures__/ini/flat-after.ini
run-nested:
	dist/bin/gendiff.js ./__tests__/__fixtures__/json/deep-before.json ./__tests__/__fixtures__/json/deep-after.json
build:
	rm -rf dist
	npm run build
prepublishOnly:
	npm run prepublishOnly
lint:
	./node_modules/.bin/eslint ./
test:
	npm run test
test-watch:
	npm test -- --watch
test-covegare:
	npx jest --coverage
