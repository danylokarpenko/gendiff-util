start:
	npx ./dist/bin/gendiff.js /home/danylo/Documents/jsonFiles/before.json /home/danylo/Documents/jsonFiles/after.json
build:
	npx babel src --out-dir dist
prepublishOnly:
	npm run prepublishOnly
lint:
	./node_modules/.bin/eslint ./
