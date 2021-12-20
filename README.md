# CS554-Project

This is an academic project created to simulate our restaurant site "Rice to Meet You".

Getting started:

1. Look at our updated technical plan (it's the pdf in this repo). We created some changes based on new technologies learned in the course after the original documentation was made and we changed some stuff in the original plan due to lack of time, different priorities, choosing to make the application more robust and complex in other ways, etc.
2. Download Elasticsearch here: https://www.elastic.co/start
3. Unzip the file, open up command line, and cd to the folder where you unzipped it then cd into bin
4. type elasticsearch and press enter in command line to start up the database
5. seed the database with npm run seed
6. npm start to start up the express server
7. open up a new terminal
8. cd into the client folder
9. Need to do npm i before using docker
10. Install Docker Desktop: https://www.docker.com/products/docker-desktop
11. docker build . -t client
12. docker run -it -p 3000:3000 client
13. npm start if you don't want to use docker
14. open up a new terminal
15. cd into the other client folder
16. npm start
17. you act like an employee and click the button when you finish making a bowl
18. this will effect delivery / pickup times on the other client (they will know when the order is ready to be picked up or delivered)
19. try out our website
