#!/usr/bin/env bash

rm src/index.js
rm dist/main.js

npm install npx webpack webpack-cli babel-core babel-plugin-transform-react-jsx babel-preset-env --save-dev
npx babel --plugins transform-react-jsx src/dashboard.js --out-file src/index.js
npx webpack

rm src/index.js
rm -r -f ./node_modules
rm package-lock.json

