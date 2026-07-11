# Goal-Wise (CS 100 Project)

[![Pages Deploy](https://github.com/this-salami/Goal-Wise/actions/workflows/main.yml/badge.svg)](https://github.com/this-salami/Goal-Wise/actions/workflows/main.yml)
[![Live Demo](https://img.shields.io/website?url=https%3A%2F%2Fthis-salami.github.io%2FGoal-Wise%2F&label=demo)](https://this-salami.github.io/Goal-Wise/)
[![License](https://img.shields.io/github/license/this-salami/Goal-Wise)](https://github.com/this-salami/Goal-Wise/blob/main/LICENSE)

Goal-Wise is a React frontend for tracking financial goals, accounts, subscriptions, and investment progress in a single dashboard-style experience.

Created for CS 100 final project (Fall 2025) at Illinois Tech. This project demonstrates the use of React for building a comprehensive financial tracking frontend.

This was my first major project using React and Tailwind CSS.

## Project Origin and Attribution
    
This project was initially developed as a collaborative class project. This repository is now maintained as an independent archival and portfolio version. Thanks to [Suproteek Banerjee](https://github.com/Suproteek-Banerjee) for collaboration and contributions.

## My Contributions

- Led the frontend implementation for the project and built most of the user-facing interface in React.
- Designed and implemented core dashboard views for goals, linked accounts, subscriptions, transactions, and investments.
- Built reusable UI components and interactive state-driven flows for adding, editing, and tracking financial items.
- Fixed numerous frontend bugs during development, including UI behavior issues and broken interactions across screens.
- Improved reliability of the delivery pipeline by setting up and validating a GitHub Actions + GitHub Pages deployment workflow.

The commit history provides a detailed trace of these changes and the evolution of the project over time.

## Tech Stack

- React
- Create React App (react-scripts)
- Tailwind CSS
- GitHub Actions for CI/CD
- GitHub Pages for hosting

## Local Development

Install dependencies:

```bash
npm ci
```

Start the dev server:

```bash
npm start
```

The app runs at `http://localhost:3000`.

## Build for Production

Standard build:

```bash
npm run build
```

GitHub Pages-style build (repo subpath):

```powershell
$env:PUBLIC_URL = "/Goal-Wise"
npm run build
```

This outputs static files into the `build` folder.

## Test GitHub Actions Locally with act

Dry run:

```bash
npm run act:build -- -n
```

Run the full build job locally:

```bash
npm run act:build
```

`act:build` uses the workflow in `.github/workflows/main.yml` and event payload in `act-push.json`.

## GitHub Pages Deployment

Deployment is handled by GitHub Actions in `.github/workflows/main.yml`.

On push to `main`:

1. The `build` job installs dependencies and builds the app.
2. The build output is uploaded as a Pages artifact.
3. The `deploy` job publishes it to GitHub Pages.

Live URL format:

`https://<your-username>.github.io/Goal-Wise/`

## Project Scripts

- `npm start` - run local dev server
- `npm run build` - create production build
- `npm test` - run tests
- `npm run act:build` - run workflow build job locally with act
