![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-30 Project 4 - CONTENT

Whilst studying to become a developer I found that I was missing out on loads of great content on Netflix, at the cinema etc. I wanted to create a todo list so that I wouldn't miss out on all this great stuff. It evolved quickly into a platform where users could share content and compete by ticking off content to get badges.

The app is a RESTful MERN application that makes use of the Spotify, and TMDB APIs.

##### [Visit website](https://wdi-content.herokuapp.com/)

*Please be aware that Heroku apps go to sleep after 30 mins of inactivity and may take a little time to load*

---

<p align="center"><img src="https://imgur.com/J9SDcxI.jpg" width="700"></p>

###### During the planning process I always had a good idea of what the MVP should contain. I wanted to set up basic user profiles, import and display data from a media/CONTENT API, and enable a badge logic. Once this had been set up it would be relatively straightforward to add more content types, display additional meta data, and store more information for users. I created detailed wireframes with Sketch so that I would have a useful reference when structuring my site, and although the finished product differed in places it was largely true to my initial wireframes.

<p align="center"><img src="https://imgur.com/komgoSe.pngg" width="700"></p>

###### Once a user has logged in they can browse the top 50 spotify tracks, and top 20 Films and TV shows from TMDB. If they don't find what they are looking for their, each tab has a search function. When a user taps on the content a show page is displayed with artwork, and additional meta data, and for tracks, a short preview. Once a user has added a track, film, or show to their todo list it will appear on their profile, where they can tick it off to work toward Music, Film, and TV lover badges. Users can also follow others and suggest content to them. Suggested content is listed on the profile page.

---

The Vince Grid was the most complex development project I have tackled to date and I am delighted with what I was able to achieve. Working with WebSockets for the first time opened up massive new functionality but brought challenges with it as well. Coordinating the game logic, affecting state and updating my database in a real-time, multi-user environment was really challenging but a lot of fun.

This app was a real challenge. A lot of research went into simply achieving MVP - which made achieving MVP all the more satisfying. I was pleased to be able to integrate multiple APIs on the backend, and I am glad that I have built an expandable site that can be built upon. Although I am pleased with what I have managed to achieve in 7 days, I plan to add more functionality and polish in future.
- For example I would like to implement the YouTube API so that a user can preview film and tv content as well as Music.
- It would also be useful to split the app into additional components and work on refactoring too.
