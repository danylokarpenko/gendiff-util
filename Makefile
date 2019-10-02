start:
	npx babel-node src/bin/gendiff.js /home/danylo/Documents/jsonFiles/before.json /home/danylo/Documents/jsonFiles/after.json
build:
	npx babel src --out-dir dist
