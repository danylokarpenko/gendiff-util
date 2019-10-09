start:
	npx ./__tests__/__fixtures__/compareFiles/before.json ./__tests__/__fixtures__/compareFiles/after.json
build:
	npx babel src --out-dir dist
prepublishOnly:
	npm run prepublishOnly
lint:
	./node_modules/.bin/eslint ./
test:
	npm run test
watch:
	npm test -- --watch
