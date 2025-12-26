## package instellation

`npm init -y`
`npm install express dotenv `
`npm install -D typescript ts-node`
// same as "npm i --save-dev typescript"
##-- npm i ts-node
It ts-node transforms TypeScript into JavaScript

`npm install -D @types/express`
`npm install -D nodemon`

`npx tsc --init`
`npm install -D ts-node typescript nodemon @types/node`

## Deleted current tsconfig file and update like this

{
"compilerOptions": {
"target": "ES2020",
"module": "NodeNext",
"moduleResolution": "NodeNext",

    "rootDir": ".",
    "outDir": "dist",

    "types": ["node"],
    "esModuleInterop": true,

    "strict": true,
    "skipLibCheck": true

}
}

## Supabase.com -> id and project created

`npm i sequelize-typescript mysql2` for postgress || mysql2

## Day 2

# i added this below in tsccongig.json to remove @Table @Column Decorator issur or error

"experimentalDecorators": true,
"emitDecoratorMetadata": true

## migration or Table created in phpmyadmin successfully
