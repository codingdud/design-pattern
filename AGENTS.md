# AGENTS

This repository is an mdBook project that documents design principles and patterns with TypeScript/JavaScript examples.

## First Steps

- Use `mdbook build` from the repository root to validate documentation changes.
- Treat `src/` as the documentation source of truth for published book content.
- Use links to existing docs instead of duplicating long explanations.

## Build, Test, and Validation

- Build docs: `mdbook build`
- Output directory: `book/`
- CI reference: [GitHub Pages workflow](.github/workflows/deploy.yml)
- There is no project-wide npm/tsc/lint/test pipeline in this repo.

## Repository Map

- Book config: [book.toml](book.toml)
- Book entry and overview: [src/README.md](src/README.md)
- Book table of contents: [src/SUMMARY.md](src/SUMMARY.md)
- SOLID overview page: [src/solid/README.md](src/solid/README.md)
- Pattern docs:
  - [Behavioral](src/patterns/behavioral.md)
  - [Structural](src/patterns/structural.md)
  - [Creational](src/patterns/creational.md)

## Code and Content Conventions

- Example implementations live in root folders such as `behavioral/`, `structural/`, `creational-ts/`, and `SOLID/`.
- Several folders include `objcode/` JavaScript files that mirror TypeScript examples.
- Preserve existing file and symbol names unless the user explicitly requests renaming. Some names intentionally match existing legacy typos (for example: `sigleton.ts`, `itrator.ts`, `fasade.ts`).
- Keep edits minimal and localized; avoid broad refactors in instructional examples.

## Pitfalls

- Do not assume Node package scripts exist; check files before proposing npm commands.
- For documentation changes, update pages under `src/` and verify chapter links in [src/SUMMARY.md](src/SUMMARY.md).
- If changes affect published docs, run `mdbook build` to confirm no broken structure.

## When Adding New Content

- Add or update the relevant page under `src/`.
- Add chapter links in [src/SUMMARY.md](src/SUMMARY.md) when creating new pages.
- Keep examples simple and educational; prefer readability over abstraction.