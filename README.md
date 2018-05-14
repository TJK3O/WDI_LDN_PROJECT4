# ![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-32 Project 4 -  c o n t e n t  React Web Application

Individual MERN stack project

Whilst studying a General Assembly I continued to receive recommendations from friends about TV shows and films I should watch, music I should listen to, video games I needed to play etc. I was worried about missing out on all this great content, and so I decided to create a todo list where users could find and recommend different kinds of media to one another. I decided to add achievements so that the ‘watch list’ would have a competitive aspect. Users are rewarded for watching a certain number of TV shows, films, or ticking off a certain number of tracks.

c o n t e n t is a fully RESTful MERN stack application. React proved a valuable asset as I was drawing in content from a number of different sources. It enabled me to manipulate the DOM and display and store pertinent information without reloading the browser. To obtain the necessary metadata for my app I integrated Spotify and TMDB’s web APIs.

##### The app utilises the following technologies:

- axios
- bcrypt
- bluebird
- body-parser
- bulma
- chai
- express
- filestack-js
- filestack-React
- jsonwebtoken
- mocha
- mongoose
- react
- react-dom
- react-router-dom
- request-promise


##### The app is fully responsive, so please [click here](https://wdi-content.herokuapp.com/) if you would like to visit c o n t e n t.

*Please be aware that Heroku apps go to sleep after 30 mins of inactivity and may take a little time to load*

---

<p align="center"><img src="https://i.imgur.com/5NItUyD.png" width="700"></p>

</br>

###### During the planning process I always had a good idea of what the MVP should contain. I wanted to set up basic user profiles, import and display data from a media/CONTENT API, and enable a badge logic. Once this had been set up it would be relatively straightforward to add more content types, display additional meta data, and store more information for users. I created detailed wireframes with Sketch so that I would have a useful reference when structuring my site, and although the finished product differed in places it was largely true to my initial wireframes.

</br>

<p align="center"><img src="https://i.imgur.com/rjHNboN.png" width="700"></p>

</br>

###### Once a user has logged in they can browse the top 50 spotify tracks, and top 20 Films and TV shows from TMDB. If they don't find what they are looking for there, each tab has a search function. When a user taps on the content a show page is displayed with artwork, and additional meta data, and for tracks, a short preview. Once a user has added a track, film, or show to their todo list it will appear on their profile, where they can tick it off to work toward Music, Film, and TV lover badges. Users can also follow others and suggest content to them. Suggested content is listed on the profile page.

</br>

<p align="center"><img src="https://i.imgur.com/G5WuupX.jpg" width="700"></p>

---

This project was my first real chance to use React and while there was a learning curve around the use of state, and props I found it to be both intuitive and useful for my application. As I was making requests to multiple APIs it was invaluable to be able to store information in state and update the user without reloading the page.

Before I even got started with my wireframes I made sure to check the feasibility of my idea. I used Insomnia to see what meta data I was able to get from the various APIs I hoped to use and to ensure that I could successfully authenticate my requests. An initial challenge was successfully authenticating myself when making Spotify requests. I was able to obtain a token that I sent with my requests which responded with the correct information, however my token was expiring once an hour. I thankfully found an alternative authorisation flow that negated this problem.

This app was a real challenge. A lot of research went into simply achieving MVP - which made achieving MVP all the more satisfying. I was pleased to be able to integrate multiple APIs on the backend, and I am glad that I have built an expandable site that can be built upon. Although I am pleased with what I have managed to achieve in 7 days, I plan to add more functionality and polish in future.
- For example I would like to implement the YouTube API so that a user can preview film and tv content as well as Music.
- It would also be useful to split the app into additional components and work on refactoring too.

---

###### Installation Instructions
- You'll need run your  package manager, for example yarn, to install the necessary dependencies which are already listed in the package.json.
