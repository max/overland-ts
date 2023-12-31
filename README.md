# 📍 Overland TS

[![Tests](https://github.com/max/overland-ts/actions/workflows/tests.yaml/badge.svg)](https://github.com/max/overland-ts/actions/workflows/tests.yaml)

Overland TS is an API written in TypeScript for the [Overland iOS](https://github.com/aaronpk/Overland-iOS) location tracker. It uses [ElysiaJS](https://elysiajs.com/), [Bun](https://bun.sh/), and [SQLite](https://www.sqlite.org/).

## Development

To start the development server run:

```bash
bun install
cp .env.example .env
bun db:migrate
bun run dev
```

Open http://localhost:3000/swagger with your browser to see the API documentation.

---

## TODO

- [x] Set up CI with GitHub Actions
- [x] Store locations in SQLite
- [x] Fix the Overland schema
- [ ] Add deployment to Fly
