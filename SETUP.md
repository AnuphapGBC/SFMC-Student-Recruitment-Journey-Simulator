# Setup Guide

This guide explains how to run, test, customize, and publish the **SFMC Student Recruitment Journey Simulator — Personal Portfolio Project**.

You do not need a Salesforce account, an SFMC licence, API credentials, or a database. The application runs entirely with synthetic local data.

## 1. Install the prerequisites

Install:

- [Node.js](https://nodejs.org/) version 22.13 or newer. The current Node.js 22 LTS release is suitable.
- npm, which is included with Node.js.
- [Git](https://git-scm.com/downloads) only if you want to publish the project to GitHub.

Confirm that Node.js and npm are available:

```bash
node --version
npm --version
```

The Node.js result must be `v22.13.0` or newer.

## 2. Get the project files

### If you downloaded the ZIP

1. Extract `SFMC_Student_Recruitment_Journey_Simulator.zip`.
2. Open Terminal, PowerShell, or the terminal in Visual Studio Code.
3. Change into the extracted project folder.

Example:

```bash
cd SFMC_Student_Recruitment_Journey_Simulator
```

### If the project is already on GitHub

Replace `<your-username>` with your GitHub username:

```bash
git clone https://github.com/<your-username>/sfmc-student-recruitment-journey-simulator.git
cd sfmc-student-recruitment-journey-simulator
```

## 3. Install the project packages

From the project root—the folder containing `package.json`—run:

```bash
npm ci
```

`npm ci` installs the exact package versions recorded in `package-lock.json`. The first installation can take several minutes.

## 4. Start the simulator

```bash
npm run dev
```

Open the local address printed in the terminal, normally something similar to `http://localhost:5173`.

The supplied project scripts are cross-platform and work in Windows PowerShell, Windows Command Prompt, macOS Terminal, and Linux shells.

Keep the terminal window open while using the simulator. To stop it, press `Ctrl+C`.

## 5. Run the checks

Run the automated build and tests:

```bash
npm test
```

Run the code-quality checks:

```bash
npm run lint
```

Both commands should finish without errors before you publish the repository.

## 6. Create and run a production build

```bash
npm run build
npm start
```

Open the URL printed by the production server. Press `Ctrl+C` to stop it.

## 7. Customize the portfolio project

The most useful files to edit are:

| File | Purpose |
| --- | --- |
| `README.md` | Project story, transparency statement, evidence, and live-demo link |
| `lib/recruitment-data.ts` | Simulator records, metrics, events, and journey logic |
| `public/sample-data/students.csv` | Downloadable synthetic sample dataset |
| `sql/*.sql` | Segmentation, monitoring, and engagement-query examples |
| `email/program-event-invite.html` | AMPscript personalized email example |
| `docs/*.md` | Data dictionary and SFMC implementation mapping |

If you change the student records, keep `lib/recruitment-data.ts` and `public/sample-data/students.csv` aligned so the dashboard and downloadable evidence tell the same story. Never add real student or applicant data.

## 8. Publish the project to GitHub

### Create the repository

1. Sign in to GitHub and choose **New repository**.
2. Name it `sfmc-student-recruitment-journey-simulator`.
3. Set it to **Public** if recruiters should be able to view it.
4. Do not initialize it with another README, `.gitignore`, or licence when uploading this existing project.
5. Create the repository.

### Upload with Git

Run these commands inside the extracted project folder. Replace `<your-username>` with your GitHub username:

```bash
git init
git add .
git commit -m "Add SFMC student recruitment journey simulator"
git branch -M main
git remote add origin https://github.com/<your-username>/sfmc-student-recruitment-journey-simulator.git
git push -u origin main
```

If the project is already a Git repository, skip `git init`. If an `origin` remote already exists, inspect it with `git remote -v` instead of adding it again.

Upload the extracted project contents, not the ZIP as a single repository file. `README.md`, `package.json`, `app`, `lib`, `sql`, and the other project folders should be visible at the repository root.

### Finish the GitHub page

In the repository's **About** section:

- Description: `Consent-aware SFMC student recruitment journey simulator — personal portfolio project.`
- Suggested topics: `salesforce`, `sfmc`, `marketing-automation`, `sql`, `ampscript`, `crm`, `student-recruitment`, `portfolio-project`.

Leave the Website field blank unless you later deploy the project to a public host you want recruiters to use. Pin the repository on your GitHub profile after confirming it is visible to people who are not signed in to your account.

## 9. Portfolio publishing checklist

Before adding the project to LinkedIn:

- Keep the personal-project disclaimer in `README.md` and in the simulator.
- Confirm `npm test` and `npm run lint` pass.
- Open the GitHub repository in a private/incognito browser window.
- Check the interface on desktop and mobile widths.
- Confirm the AMPscript example, SQL queries, sample data, README, and technical documentation are visible in GitHub.
- Add the GitHub repository, case-study PDF, and PowerPoint guide to LinkedIn Featured.
- Describe the work as a simulator demonstrating transferable logic—not as a production Salesforce deployment.

## Troubleshooting

### Windows says `'WRANGLER_LOG_PATH' is not recognized`

This means you have the original package script, which used Unix environment-variable syntax. Download the corrected project package, or open `package.json` and change:

```json
"dev": "WRANGLER_LOG_PATH=.wrangler/wrangler.log vite"
```

to:

```json
"dev": "vite"
```

Also change the `start` script to `"start": "vinext start"`. Save `package.json`, then run:

```bash
npm run dev
```

No Salesforce setting or credential is involved in this error.

### `npm ci` reports an unsupported Node.js version

Install Node.js 22.13 or newer, reopen the terminal, and check `node --version` again.

### The terminal says the port is already in use

Stop the other local development server, or run this project on another port:

```bash
npm run dev -- --port 5174
```

Then open `http://localhost:5174`.

### `git remote add origin` says that `origin` already exists

Inspect the existing destination:

```bash
git remote -v
```

Only change it if it points to the wrong repository:

```bash
git remote set-url origin https://github.com/<your-username>/sfmc-student-recruitment-journey-simulator.git
```

## Useful links

- [Node.js downloads](https://nodejs.org/)
- [Git downloads](https://git-scm.com/downloads)
- [GitHub: Add an existing project to GitHub](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
