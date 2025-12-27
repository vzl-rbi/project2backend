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

## migration or Table created in phpmyadmin successfully

for Table id

# used UUID so that uuid become like this 1289abc-e240-11f0-b969-9840bb22da22

safe-------

//logical code lekhne
/\*
auth.controller.ts or authController.ts or auth-controller.ts je lekhda bhayo

//logic
Resgister
LOGIN
wrong password or email
reset password
otp send
welcome message tp registered email
otp expired
login message
logot

/// first choose only one feature only and make logic like  
// RESGISTER {
// --> incomming Data --> username, email, password;
processing/checking--> email valid, password;
db query --> table ma insert/edit/delete/update

import { Request, Response } from "express"
const authController = (req: Request, res: Response) => {
//

}

function authcontroller() {
//
}

// function or class ma base bhayera backend garda bhayo
//class name sadhai PascalCase ma hunxa AuthController
class AuthController {  
registerUser(){
}

}
// class bhitra registeruser(){} -> method bhanne ...function bhanna paidaina

function authcontroller() {
name = "Ram" // variable bhanna milena attribute or property bhanne
}

// let name = "Hari" // variable bhanne function or class bahira xa

// jason data haru sadhai --> req,body ma aauxa
// files haru eg. picture, video, pdf --> req.file tir aauxa

--> incomming data haru accecpt garne tarika-->
const {username, password, email } = req.body

---

if(!username || !email || !password) {
res.status(400).json(message:"provide username, email, password")
} else {
await User.create({
username: username,
email: email,
password
})
res.status(200).json({message: "user registered success"})
}

---

## importanat

if matra lekhne else lekhne man lagena bhane yasto garne `return` use garne
if(!username || !email || !password) {
return res.status(400).json(message:"provide username, email, password")
}
const registerdUser = await User.create({
username: username,
email: email,
password
})
res.status(200).json({message: "user registered success"})
}

## if class use garera garda

class AuthController {
async registerUser(req:Request, res: Response) => {
const {username, email, password } = req.body
if(!username || !email || !password) {
return res.status(400).json({message: "Please provide username, email, and password!!"})
}
await User.create({
username: username,
email: email,
password: password

})
res.status(200).json({message: "Registerd Successfully!!"})
}
}

## aut.controller registerUser code lekhesi

# Route ma route post /register and export pax

# app.ts or main file ma import garni

import authRouter from "./routes/globals/auth/auth.route.js";
const app = express()
`app.use(express.json())` // yo garni nabhai json file bujdaina postman bat send garda or register garda like this
{
"username" : "heroBoy",
"email" : "email@emai.com",
"password" : "Test@54321"

}
app.use("/api", authRouter)
