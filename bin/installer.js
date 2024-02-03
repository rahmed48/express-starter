#!/usr/bin/env node

const { execSync } = require("child_process");
const { copySync } = require("fs-extra");
const { join } = require("path");
const inquirer = require("inquirer");
const fs = require("fs-extra");

async function runInstaller() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "appName",
      message: "What is your project name?",
      default: "my-express-app",
    },
    {
      type: "list",
      name: "database",
      message: "What database do you want to use?",
      choices: [
        {
          name: "MySQL",
        },
        {
          name: "SqlServer",
        },
        {
          name: "PostgreSQL",
        },
      ],
      default: "MySQL",
    },
    {
      type: "input",
      name: "databaseUrl",
      message: "What is your database url?",
      default: `mysql://root:@localhost:3306/mydb`,
    },
    // {
    //   type: "checkbox",
    //   name: "features",
    //   message: "Select additional features",
    //   choices: [
    //     {
    //       name: "Prisma",
    //     },
    //     {
    //       name: "Multer",
    //     },
    //     {
    //       name: "JWT",
    //     },
    //   ],
    // },
    // {
    //   type: "input",
    //   name: "databaseUrl",
    //   message: "What is your database url?",
    //   default: "postgresql://localhost:5432/mydb",
    // }
  ]);

  const templatePath = join(__dirname, "..", "template");
  const destinationPath = join(process.cwd(), answers.appName);

  // Buat direktori tujuan
  fs.mkdirSync(destinationPath);

  // Copy template to destination
  copySync(templatePath, destinationPath);

  // Install dependencies based on user choices
  const dependencies = [
    "express",
    "cors",
    "bcrypt",
    "dotenv",
    "nodemon",
    "body-parser",
    "cookie-parser",
    "fs-extra",
    "http-errors",
    "method-override",
    "jsonwebtoken",
    "morgan",
    "prisma",
    "@prisma/client",
    "ejs",
    "multer",
  ];

  execSync(`npm init`, { cwd: destinationPath, stdio: "inherit" });

  execSync(`npm install ${dependencies.join(" ")}`, {
    cwd: destinationPath,
    stdio: "inherit",
  });

  const packageJsonPath = join(destinationPath, "package.json");
  const packageJson = require(packageJsonPath);

  packageJson.scripts["dev"] = "nodemon index.js";

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  const schemaPrisma = join(destinationPath, "prisma", "schema.prisma");
  const schemaPrismaContent = `
  generator client {
    provider = "prisma-client-js"
  }
  
  datasource db {
    provider = "${answers.database.toLowerCase()}"
    url      = "${answers.databaseUrl}"
  }
  
  model User {
    id       String  @id @default(uuid())
    email    String  @unique
    name     String?
    password String
  }
  `;
  fs.writeFileSync(schemaPrisma, schemaPrismaContent);

  execSync(`npx prisma generate`, {
    cwd: destinationPath,
  });

  console.log("This starter is created by @rahmed48");
  console.log("===================================");
  console.log(`Project ${answers.appName} is ready!`);
  console.log(`cd ${answers.appName}`);
  console.log("npm run dev");
  console.log("===================================");
  console.log("Happy coding !");
}

runInstaller();
