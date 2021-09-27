# Fegg App – Final Report

Nijat Behbudov (nib86)  
Jared Frank (jaf216)  
Grant Gittes (gbg2)  
Frank Lu (shl183)

### Introduction

Fegg web application is developed by Nijat Behbudov (nib86), Jared Frank (jaf216), Grant Gittes (gbg2) and Frank Lu (shl183). You can think of Fegg as a Q&A forum where students enroll in different courses, and they ask questions about their homework and assignments. Other students can answer and upvote other people’s answers. Other than regular users, there is an admin who has access to create new classes, delete questions and comments. Users need to be logged in – either signing up or logging via GitHub account - in order to view courses and post questions & answers.

### Objective

Objectives for our project is to create an easy-to-use platform for students to find answers to their questions about school homework & assignments. We are aiming to do this with a simple looking and mobile responsive website. Furthermore, our personal goal as a team, was to create a functioning platform with all of the web development technologies we have studied and implement them in a platform with enough complexity. Another objective for our team was to learn about working as a team on a software project – for some of us it was the first time, some of us it wasn’t. It was interesting how we went from ideation to planning to coding and implementation.

We also wanted to learn how CRUD, REST concepts, JavaScript, Node, MongoDB, APIs and Front-end all fit together in a project that we started from scratch and build it from ground up.

We have included complex features inside the app beyond the ones mentioned in the assignment requirements – some of which we discussed in the working session in our last lecture:

- Upvoting downvoting answers require specific JavaScript tricks and data structure change to accommodate

- Having a complex relationship between data collections of users, courses, questions, answers and running mongoose queries to have different data displayed at various pages

- There are many pages in our app that includes different information. Other than Main Page, Login and Sign-up page, we have “All Courses”, “Single Course” , “Single Question” , “Profile” page etc. Also, these pages might look different for each user depending on what course they are enrolled in.

- We are using different packages to include more functionality inside the app. We use BCrypt for password encryption, Random Avatar Generator for creating random avatars and Font Awesome for icons for each registered user that displays in their profile page.

### Team member’s contributions

**Jared Frank** – Jared was our strong back-end guy. He set up the MongoDB instance, connected our app with Mongoose and made sure the connection is running correctly. Also, he was able to write up complex routes to display important information in our pages. He also contributed a lot on debugging our routes.js and server.js functions. He worked closely with Frank and Nijat together on creating a proper data structures on Mongo DB for users, courses, questions and other data collections so that all the data could be best sent from the database to the EJS front-end.

**Grant Gittes** – Grant primarily started working with writing the middleware functions, making sure the data we need is rendered into specific EJS. He was also able to convert our vanilla HTML & CSS pages into fully functioning EJS templates and views. Grant also helped a lot on working with routes to get the website running in the initial phase and continued to add in additional functionality such as adding new questions/courses/answers, as well as implementing the voting mechanism. Grant also had a role in implementing the admin functionality of deletion, and dynamically updating home and all course pages based on the user's enrolled courses.

**Frank Lu** – Frank focused mainly on the User and Authentication part. His contributions are both front-end EJS and backend routers of sign up, log in, log in with Github, basic security functions of login & password, random-avatar-generator API, profile page, ability to change profile data and helped a lot on running session management features.

**Nijat Behbudov** – Nijat’s role was working on the front-end, design, color scheme, logo, icons etc. He contributed with HTML, CSS and JavaScript to make the website mobile responsive and made sure data fed from our routes are displayed correctly. Together with Jared and Frank, he also worked on the initial data structure of our MongoDB collections and worked on routing for home page. Nijat also performed management roles – meetings, notes, assigning/writing deliverables etc.

### Technical Architecture

**Models**: We chose NoSQL MongoDB Atlas free tier as a persistent storage to host all the class, question and user data in JSON format. Using mongoose schemas, we have declared our data models inside /models/ folder of our root directory. We use these models to display and edit our data via routing in our Node JS app. We have many POST and GET requests writing data to MongoDB this way.

**Views**: We are using EJS as a templating language – it lets us generate pages with HTML markup and plain JavaScript. It provides us a capability to keep pages dynamic depending on user’s enrolled courses. The app also uses Bootstrap as a CSS framework together with vanilla JavaScript. Furthermore, we have integrated icons from Font Awesome and profile photos from Random Avatar generator. There are around 10 different pages – all written with EJS templates.

**Controller:** Finally, as a controller, we are using Express together with NodeJS. Express allowed us to set up middleware functions to respond to certain HTTP Requests. Our team also defined a routing table which is used to perform different actions based on HTTP Method and URL. We use this on our home page, courses page and questions page to send POST and GET requests and display proper data. Lastly, Express allowed us dynamically render HTML Pages based on passing arguments to templates.

### Challenges

**Ideation to implementation:** At the beginning, we started off by brainstorming ideas of what we can build. Af*ter deciding what we want to build, it was challenging to break the idea down to different pieces and turn it into an executable software. We started off by sketching initial design ideas on “Paint” and then we found challenging questions - Who is going to create what part? What parts do we even need to create? Should we start from building a draft HTML/CSS page first? How will the database look like?

**Data structure:** We had to understand what kind AND in what form we will store our data in MongoDB. Deciding on what kind of variables and data points each of our models will have was challenging. For e.g. - each student will have an ID and each course they have enrolled in will be a JSON array within the “user” model. Or should we store this enrollment information within “courses” model as an array of user_id’s who have enrolled in the course?

**Complex routing:** As mentioned earlier, we have around 10 different pages that display different information like “Question title and author”, “Answer’s author and date”, “Enrolled courses of the logged in students” etc. The team did a great job identifying these data requirements and built the right number of routers to render data into

**Responsiveness:** After getting everything done, the team spent many hours trying to fix all pages to be fully responsive for mobile screens. We solved this difficulty by playing with our CSS parameters and researching over the internet on best solutions to show responsive tables, div containers and texts.

### Future Work

We would like to integrate richer media into the website. E.g. let students pick their own profile photo and provide an ability to attach photos and graphs into comments and questions. We believe at this initial stage; our app is pretty text heavy. We need to implement more visual points: logos, icons, photos, graphs, etc. If we had more time, we would probably work on this to provide richer experience.

Another feature we’d love to add is the ability to add other students as friends and maybe form a virtual study room in the app. They can share their own articles, questions and answers within our app’s interface without the need for other 3rd party chats, shared storage solutions etc.

We also like to improve the data structure later in the future. Instead of having different "questions", "answers" collecitons within MongoDB, we can store data within nested JSON objects. Improved structure would have 1 big "courses" collection with nested "questions" array and "answers" array nested within that. 

### Conclusion

When it comes to INFSCI 2560 course as a whole, it was great how we started with basic concepts – HTML, CSS, JavaScript and DOM and then we went to more complex technologies like Security, Sessions, REST and CRUD operations etc. Our team is satisfied with the result of our app and how we implemented everything we learned in the class into a live app from scratch. Some of us had experience in coding and web development while for some it was something new.

As a feedback for the course, it is great that we are using Glitch to isolate our app and not worry about the underlying infrastructure – we directly get into coding and designing.

However, we believe having less slides, less “lectury” talks and more conversations about use cases and live examples would be better for the class.

### Resources

Text BoxHere are the resources we have used to research:

[https://stackoverflow.com/](https://stackoverflow.com/).

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous

https://www.w3schools.com/

https://getbootstrap.com/docs/5.0/getting-started/introduction/

https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw

### How to test functionality of our application:

1. Signup and login: first sign up with login and password and then start enrolling/unenrolling into courses. You can also log in with GitHub account.

2. Try adding a question: after enrolling in a class, go ahead and try posting a question

3. Try answering a question: you can try answering some of the questions already posted. Try also upvoting an answer. Upvoted answers are displayed at the top.

4. Visit your and other students' profile pages: go to your profile page and add more details about yourself.

### Admin user details to test functionality:

* Username: nijat.b
* Password: 123456

Try:
Adding a new class

Deleting a class

Deleting a question

Deleting an answer