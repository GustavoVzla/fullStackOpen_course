# Full Stack Open - course exercises

My exercise submissions for [Full Stack Open](https://fullstackopen.com/) (University of Helsinki), a free online course on modern web development with JavaScript. This is course work, not an original product.

## Contents

| Part | Topic | Folder |
|---|---|---|
| 0 | Fundamentals of web apps (exercise write-ups) | `parte_0/` |
| 1 | Introduction to React (exercises 1.1-1.14) | `parte_1/` |
| 2 | Communicating with the server (country data, course information, notes and phonebook frontends, axios) | `parte_2/` |
| 3 | Programming a server with Node.js and Express (notes and phonebook backends and frontends) | `parte_3/` |

Stack used: React 18, Vite, axios, Node.js, Express.

## Live deployment

- Notes app: https://notas-nodejs.fly.dev/

A previously linked phonebook deployment (vzlaphonebook.fly.dev) no longer responds and was removed from this README.

## Running an exercise

Each exercise folder is an independent project:

```bash
cd parte_2/part2-phonebook-frontend
npm install
npm run dev
```

Part 3 backends are run with `npm start` or `node index.js` inside the backend folder.
