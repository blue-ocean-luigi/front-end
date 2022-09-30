# blue-ocean

## Workflow

* Work from one of the forks ( [back-end](https://github.com/blue-ocean-luigi/back-end) or [front-end](https://github.com/blue-ocean-luigi/front-end): `git clone <pick a fork>`
* Set up the main project as upstream: `git remote add upstream https://github.com/blue-ocean-luigi/blue-ocean.git`
* Commit changes to origin for that fork: `git push origin <branch name>`
* When features are ready for full-stack integration, push your branch: `git push upstream <branch name>`
* Remember to always merge updates before making a pull request 😊
  1. Commit changes to your branch `git commit`
  2. Switch to your local main branch: `git switch main`
  3. Get the most current code from main: `git fetch origin main`
  4. Merge any new code from main to your branch `git switch <branch name>` then `git merge main`

## Front End Notes

* `eslint` has been configured with the AirBnB style guide
* `axios` and `chakra-ui` have been included

### Getting started: Developer Tools

* Front-end development server
  - Navigate into the `client/` directory and run `npm run dev`
* Before commits, run `npm run lint` and fix any discrepancies 🙏


