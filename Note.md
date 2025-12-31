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

## password hash

bcrypt (DT) which measn we need typescript. so
`npm i bcrypt`
`npm install -D @types/bcrypt`

# validation

--> database validation
@Column({
unique: true
})
declare username: string
` username should be unique`

## Fat model.....Thin contrller

`if validation done in Controller .i.e Application validation`
for this concept " Fat model, Thin contrller ". make sure validation should be done in database.i.e model

# for this concept `fat model, thin controller`

--> for registerUser -> for email-> To Check if email already exists-->

```
 @Column({
    type: DataType.STRING,
    unique: true
  })
  declare email: string
```

# Althernative fo controller .i.e registerUser

# Check if email already exists

```
const check = await User.findOne({
    email
})
if(check){
    return res.statuc(409).json({message: "Email already exists"})
}
```

## jsonwebtoken

# Token =-> identifier, who are you in the system, using token we can find his history,

`npm install jsonwebtoken`
`npm i -D @types/jsonwebtoken`
✅ Fix it (DO THIS)
` import jwt from "jsonwebtoken";`

## after finnaly solving all issues

token generated from postman
{
"message": "Login Successful!!",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY1NTlkODRjLWE2YTctNGM2Ny04MWZjLWZhNjYyYTVhNGNhYyIsImlhdCI6MTc2NjkxNzM1MywiZXhwIjoxNzY3MDAzNzUzfQ.3j7y-K2aIHVm-wp35QWfhvE7FVGFQp8ylNiUpVqz6FU"
}
const token = jwt.sign({id: user.id}, envJwt.secret, {
expiresIn: envJwt.expiresIn
})

## `{id : user.id} `--> yo maile lukauna khojeko kura ho example user ko unique id ani tesko lagi arko secret code ho `envJwt.secret`, ani expire date `expiresIn: envJwt.expiresIn`

## res.cookie(envJwt.cookieName, token, {

      httpOnly: true,
      sameSite: "strict",
    });

httpOnly: true - this flag means the cookie is not accessible via JavaScript (client-side scripts), which helps prevent XSS attacks.
sameSite: "strict" - this attribute controls whether the cookie is sent with cross-site requests.
"strict" means the cookie is only sent in a first-party context, i.e., when the site of the cookie matches the site in the browser's URL.

# i removed this httpOnly: true,

      sameSite: "strict",

## httpOnly: false, // to allow client-side access

## important

## **Security vs Convenience Trade-off:**

| **Setting**          | **Security Level**         | **Frontend Access**      |
| -------------------- | -------------------------- | ------------------------ |
| `httpOnly: true`     | High (prevents XSS)        | No direct JS access      |
| `httpOnly: false`    | Low (exposed to XSS)       | Full JS access           |
| `sameSite: "strict"` | High (prevents CSRF)       | Same domain only         |
| `sameSite: "lax"`    | Medium                     | Cross-origin GET allowed |
| `sameSite: "none"`   | Low (needs `secure: true`) | All cross-origin         |

## **Recommended for Development:**

```javascript
res.cookie("auth", token, {
  httpOnly: true, // KEEP THIS for security
  sameSite: "lax", // More permissive than "strict"
  secure: false, // false for localhost
  maxAge: 24 * 60 * 60 * 1000,
});
```

## instead of trycatch, utilze -->

```
import { Request, Response, NextFunction } from "express";
const errorHandler = (fn:Function) => {
  return (req:Request, res:Response, next:NextFunction) => {
    fn(req, res, next).catch((err:Error)=> {
      return res.status(500).json({message: "Internal Error", errorMessage: err.message})
    })
  }
}
export default errorHandler
```

## adminSeeder Importanat

Because **some data must exist before my app is usable**. That’s the entire reason.

## Why `adminSeeder.ts` is REQUIRED

Your backend usually needs:

- At least **one admin user**
- Correct role/permissions
- Known credentials for first login

Without a seeder:

- Admin has to be created manually ❌
- Prod setup becomes inconsistent ❌
- Deployments break ❌
- You risk having **no admin access at all** ❌

An `adminSeeder.ts`:

- Creates the **first admin**
- Ensures it exists exactly once
- Can safely run on every deploy
- Is repeatable and predictable

This is **basic backend hygiene**, not optional.

Put it under **`src/seeders`** (or `src/database/seeders`)

## Add product (process)

request--> middleware to check authenticated or not(eg. login or not) -->middleware to check the role of user hitting api("Admin" or"customer", "staff") --> finally --> add product
`next()` yo xa bhane tyo middleware ho

//jwt verify
jwt.verify(token as string, envJwt.secret, (err, result))
`(err, result)`--> yo callback function ho token verify bhayo ki bhayena k bhayo inform garxa.

## Middleware Rule (remember these)

If you internalize just these, your code quality jumps immediately:

1. **Middleware should not do business logic**
2. **Avoid callbacks when async/await is available**
3. **Never trust raw headers**
4. **Never attach sensitive data (password) to `req.user`**
5. **Return early, fail fast**
6. **Types should describe what you expose, not what exists in DB**

## for add prdoduct image

`npm install multer`
`npm install -D @tyeps/multer`

## important Note

Bottom line (remember this)

async → always returns a Promise

Promise<void> → “I return nothing useful”

Express controllers → should use Promise<void>

You don’t need it, but professionals use it to avoid stupid mistakes.

## Relationship of table

`User and Product`
User.hasMany(Prduct)
Product.belongsTo(User)

## Importanat

    // 1️⃣ Define relationships FIRST
    User.hasMany(Product, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Product.belongsTo(User, {
      foreignKey: "userId",
    });

    // 2️⃣ Then authenticate
    await sequelize.authenticate();
    console.log("Database authentication successful");

    // 3️⃣ Then sync
    await sequelize.sync({ alter: true }); // dev-only
    console.log("Database synced successfully");

# Final reality check

Sequelize is not magic

Order matters

Models + relationships + sync must be aligned

## product and user relationship made and productController updated for relaship worka and userID seen
