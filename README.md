Tea by IOWA

Introduction
Finding groups for projects has always been an issue for UCSD students. There have been too many times students take
classes without knowing others in the class and end up blindly posting on piazza looking for groups to join. Tea aims to ease that group finding process by allowing users to search for projects as well as invite or request to join
projects. It also allows for the group projects to proceed smoothly by having project dashboards where users can pin announcements and add group milestones to complete.

Login Credentials
For testing purposes we provide two accounts, one basic freshly created account and one preloaded with their own
projects and projects that they have joined
User 1: Bare minimum account
Username: cse110test@ucsd.edu
Password: cse110
User2: Pre-populated
Username: cse110test2@ucsd.edu
Password: cse110

Requirements: 
This web app is meant to be used on a desktop on a computer. Due to the layout of the web app at the moment,
using the web app on a device with smaller screens such as a mobile device will layout the information in 
a not user friendly way.

Installation Instruction:
No installation necessary, works best on desktop using chrome or safari. Go to http://tea-ucsd.herokuapp.com
As the app is bootstrapped with create-react-app, if cloned from the repo and want to run locally, 
use "npm install" to download the dependencies of the web app and "npm install [package_name]" if a 
specific package is still not installed. Use "npm start to run the app on localhost:3000.

How to Run:
Create an account using an email that contains @ucsd.edu and login with that email. 

Known Issues:
1. In create project form, typing in values for deadline rather than clicking on a date will crash the app.
2. Must put a valid public calendar id or no id at all in the calendar id section of create project.
3. The menu in the navbar only redirects when you click on the text themselves (they are not buttons).
4. Requesting to join a project that was already requested to join will alert an error in joining the project.
5. Sending recovery emails does not work at the moment.

