# Refactor to Clean Code

(difficulty: 🔥🔥🔥)

`inv` in `src/invoice.ts` renders an invoice as text. It works and the tests are green, but nobody wants to touch it. Your job is to refactor it without changing what it does.

## Put the project on GitHub

The folder you downloaded has to be the **root** of your repository (the `.github` folder has to be at the top level, `ls -a` shows it).

1. Run `git init -b main` in the project folder.
2. Create a new **public** repository on GitHub. Do not add a README, `.gitignore` or license.
3. Connect and push:
   ```sh
   git add .
   git commit -m "Initial commit"
   git remote add origin <url-of-your-repository>
   git push -u origin main
   ```

## Tasks

1. Run `npm run test:run` (green) and `npm run lint` (red). Read the lint message. It is the same kind of finding that SonarQube Cloud reports as "Cognitive Complexity".
2. The tests are your safety net. Read them first. They describe how the invoice looks. Do not change the expected texts while you refactor. Run the tests after **every** small step.
3. Refactor step by step. Each step should leave the tests green:
   - Rename `inv` and its parameters so that the code explains itself.
   - Replace the magic numbers (`0.15`, `200`, ...) with named constants or a table.
   - Remove the deeply nested `if` blocks (guard clauses, a lookup table, small functions).
   - Replace the repeated string building with template literals and small helper functions.
   - Find the duplicated code and remove it.
   - Look at what `inv` does to the array it receives. Write a test that shows the problem, then fix it.
4. When you are done, `npm run lint`, `npm run check`, `npm run test:run` and `npm run format:check` pass.
5. **Bonus:** The tax rate is printed with `t * 100`. Try the rate `0.07`. What do you see, and how would you fix it? Write a test first.

### Clean code checklist

- Does every name say what it is? (`r`, `s`, `l`, `d` are not names.)
- Does every function do one thing, and fit on one screen?
- Is there a number or a text that you have to guess the meaning of?
- Can you read the happy path without scrolling through nested conditions?
- Does a function change something it was only supposed to read?

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run coverage` runs the tests and writes a coverage report to `coverage` (`coverage/lcov.info` is the file SonarQube Cloud reads)
- `npm run check` checks the types
- `npm run lint` runs ESLint, including rules from `eslint-plugin-sonarjs` that are similar to SonarQube rules
- `npm run format` formats the code with Prettier, `npm run format:check` only checks it
