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
9. Install Docker Desktop: https://www.docker.com/products/docker-desktop
10. docker build . -t client
11. docker run -it -p 3000:3000 client
12. npm start if you don't want to use docker
13. open up a new terminal
14. cd into the other client folder
15. npm start
16. you act like an employee and click the button when you finish making a bowl
17. this will effect delivery / pickup times on the other client (they will know when the order is ready to be picked up or delivered)
18. try out our website
