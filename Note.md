project start

## npm init-y

## installed express nodemon

# package.json "type" : "module"

- "start":"nodomon app.ts"

## npm installed --save-dev typescript

## npm install @types/express --save-dev

## npm i @types/node --save-dev

## npx tsc --init

after coding app.ts
Terminal
-npx tsc
-node build/app.js

## "scripts": {

    "start": "npx tsc && node build/app.js"

}

## npm start //work perfectly

## install sequelize mysql2

# npm i --save-dev @types/sequelize

## to work nodemon

- npm i tsc-node
  -> made nodeomon.json ->
  {
  "watch":["src"],
  "ext": ".ts, .js",
  "ignore": [],
  "exec": "npx tsc-node ./src/app.ts"
  }

--> package.json //changed
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "npx nodemon"
},

## rimraf package install to remove unnecessary file

`npm i rimraf --save-dev`

## again changed package.json

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "npx nodemon",
"build": "rimraf ./build && tsc"
},

## run command `npm run build`

# npm uninstall tsc-node

2️⃣ Install the correct tools
`npm install -D ts-node nodemon`
