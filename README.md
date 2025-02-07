# Community Crossing
*An online community for communitites*\
<img src="https://raw.githubusercontent.com/blue-ocean-luigi/front-end/main/client/dist/static/logo2.png" width="200" height="200">

## Introduction

This project was a one week challenge to complete a full-stack web application with a team of engineers while utilizing agile workflow.

  * As a team of 6, we built out a fully functional front to back application in 7 days.
  * Our external user wanted an application that was secure and included features like geolocation, live chat, and user authentication. Our goal was to deliver all of this along with a sleek UI.

## Description

### The problem and the client
  - Our external user was lacking a way for his community to communicate in a secure environment; a place where they could connect and help one another without outsiders gaining access to private information
  - Our primary market for this application was large communities, such as neightborhoods and apartment complexes.
### The Purpose
  - Our user wanted an app for the purpose of neighborhood communication and community building.
  - Per our user's request, our app places importance on exclusivity.
### User Inputs and Outputs - Users create and join groups to connect with their local communities.  - User can request to join groups and friends, and can accept or deny friends or members within the groups they create.
  - Users can post comments or events in the groups they are a part of.
  - Users can live chat with their own friends and send them invites to join groups they are a member of.
  - Users can interact with other user post and events by RSVPing, liking, or commenting on events and posts.
  - Users can personalize their profiles with bios, profile pics, and banners.

## Technical Challenges and research that you anticipated

  * Why, what was the plan to overcome those challenges?
    - The overall technical challenges we faced was providing such a large application in such a short time while also making it look professional. Our team solved this by utilizing ChakraUI very early on to implement basic functionality while also drastically reducing the amount of time spent writting css. In addition, integrating the backend with the frontend was difficult to property finalize before deployment due to the complexity of the data flow. We solved this by constantly testing the final application locally to make sure every component was revised to function properly before deploying to run the exact same tests.
  * What did you learn?
    - the planning phase is key to poject success, with proper planning the time boxes your team gives are significantly more accurate which is good for the team and good for client expectations.

## Challenges that were unexpected

  * Why was it a challenge
    - One challenge that isn't unique to any large team is organizing the codebase and optimizing workflow
    - The environment can get very hectic and disorganize when there are so many moving parts and a tight time constraint.
    - We avoided confusion and disorganization by planning out everything we could forsee in the project planning phase.
  * What did we learn?
    - Rigorously planning out the architecure of both our codebase and our UI as a team from the very beginning ensured that everyone knew what their responsibilites were and what the end product would be.
    - Preplanning, whiteboarding, and tracking tickets was a tedious process, but it really paid off for our team to keep everyone on the same page and workflow moving.

## Video Demo
<details><summary>Profile</summary>

![biobannerswap](https://user-images.githubusercontent.com/107714292/194730545-0e92e99a-bde6-44d1-b39b-7cd140bc0f98.gif)

</details>
 
<details><summary>Friends</summary>
  
![acc frnd req](https://user-images.githubusercontent.com/107714292/194730796-83ed73f5-3f11-47d9-9a6f-d3a78a1fcc8e.gif)

</details>

<details><summary>Groups</summary>

![acc grp req](https://user-images.githubusercontent.com/107714292/194730569-eba4f8d3-5338-41d4-b68a-94c21d83bbfd.gif)
![joingroup](https://user-images.githubusercontent.com/107714292/194730571-945092d7-9f7e-4166-bd26-8443fdd4e862.gif)

</details>

<details><summary>Chat</summary>

![chat](https://user-images.githubusercontent.com/107714292/194730557-7d8b75f0-57ac-4dfd-b2c5-c72fd6a99b1c.gif)

</details>
 
<details><summary>Posts/Comments</summary>
  
![likepostcomment](https://user-images.githubusercontent.com/107714292/194730799-c75427b6-18a8-467f-adeb-303f445a2107.gif)

</details>

<details><summary>Events</summary>
  
![newevent](https://user-images.githubusercontent.com/107714292/194730576-8057fe30-2d4a-43a3-bea0-d7e312b19d94.gif)
![rsvptoevent](https://user-images.githubusercontent.com/107714292/194730578-f0dd9853-1111-4aa2-8317-738e58f1a38d.gif)

</details>
 
  * User story and MVP
    - Our minimal viable product would ensure that users could login securely and be able to navigate from a home page, to a profile page, and to group pages.
    - MVP would include the ability for users to add groups, add friends, post events and news within their groups, as well as chat with friends in their circle.
    - Additional features we wanted to add included a functional search component, administrative control panel for groups, integrated map functionality, and engagement abilities such as RSVP, commenting, and up-voting posts.
    - Our finished product included all of these MVP features as well as many other final features, like the ability to send clickable invites to groups in instant chat, conditional rendering of profile pages dependent on friendship status, and the ability for users to customize their own profiles by editing profile pictures, bios, and banners.

## How does the app work?

  * Behind the scenes
    - Authentication is handled through Firebase, with user data being stored on a local server. Email and Google account based authentication were implemented. We separated authentication and account management logic as a way to mitigate the risk of data breaches on the server.
    - Upon initial rendering of the page, the users information is pulled from the database utilizing axios, express, and postgreSQL queries
    - The users data is utilized to conditional render their homepage, profile, and group pages
    - React state is leveraged to render initial settings and update the display as the user makes changes, with data being updated in the backend simultaneously.
    - Common data shared by components is held in React-context. Data unique to a rendered page is held in state, then sent to the database via axios when appropriate.
    - On the backend, the data is organized and stored on the database server using Postgres as the database management system
  * How does the tech stack come together?
    - Components of our tech stack communicate seemlessly: React directing rendering and axios request to the backend, the backend recieving those request with express.js and processing them with node.js to store them in a postgreSQL database.

## Developer Workflow

  * Work from one of the forks ( [back-end](https://github.com/blue-ocean-luigi/back-end) or [front-end](https://github.com/blue-ocean-luigi/front-end): `git clone <pick a fork>`
  * Set up the main project as upstream: `git remote add upstream https://github.com/blue-ocean-luigi/blue-ocean.git`
  * Commit changes to origin for that fork: `git push origin <branch name>`
  * When features are ready for full-stack integration, push your branch: `git push upstream <branch name>`
  * Remember to always merge updates before making a pull request 😊
    1. Commit changes to your branch `git commit`
    2. Switch to your local main branch: `git switch main`
    3. Get the most current code from main: `git fetch < origin OR upstream > main`
    4. Merge any new code from main to your branch `git switch <branch name>` then `git merge main`


### Front End Notes

* `eslint` has been configured with the AirBnB style guide
* `axios` and `chakra-ui` have been included

### Getting started: Developer Tools

* Front-end development server
  - Navigate into the `client/` directory and run `npm run dev`
* Before commits, run `npm run lint` and fix any discrepancies 🙏

## Contributors

Amberly Malone\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/amberly-n-malone/)](https://www.linkedin.com/in/amberly-n-malone/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/amberlyM)](https://github.com/amberlyM)

James Stolhammer\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/james-stolhammer/)](https://www.linkedin.com/in/james-stolhammer/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/stolinator)](https://github.com/stolinator)

Jessie Zhao\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/jessiezhao8/)](https://www.linkedin.com/in/jessiezhao8/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/jzthacoder)](https://github.com/jzthacoder)

Matthew Waelder\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/mattwaelder/)](https://www.linkedin.com/in/mattwaelder/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/mattwaelder)](https://github.com/mattwaelder)

Kevin Pho\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/kevinpho/)](https://www.linkedin.com/in/kevinpho/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/phok1012)](https://github.com/phok1012)

Brian Pham\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/lbrian-phaml/)](https://www.linkedin.com/in/lbrian-phaml/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/brianpham97)](https://github.com/brianpham97)

## Technology Used

**Front-end:** &emsp;&nbsp;&nbsp;
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Axios](https://img.shields.io/badge/axios-5a29e4.svg?style=for-the-badge&logo=axios&logoColor=white)![Chakra-UI](https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

**[Back-end](https://github.com/blue-ocean-luigi/Server):** &emsp;&nbsp; &nbsp;
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)![Socket.IO](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)![GoogleMaps](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

## Thanks for Reading!
If you've made it all the way down here, we thank you for reading and we hope you enjoy our application.
