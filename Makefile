start:
	dist/bin/gendiff.js ./__tests__/__fixtures__/compareFiles/before.json ./__tests__/__fixtures__/compareFiles/after.json
	dist/bin/gendiff.js ./__tests__/__fixtures__/compareFiles/before.yaml ./__tests__/__fixtures__/compareFiles/after.yaml
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
