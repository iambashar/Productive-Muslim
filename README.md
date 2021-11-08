
<p align="center">
 <img width="100px" src="https://raw.githubusercontent.com/iambashar/Productive-Muslim/edffa8807b99036054b6545b8bdf26c6a6ced6dd/Client/src/Images/mainIcon.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">Productive Muslim</h2>
 <p align="center">Productive Muslim is a  productivity app for the adherents of the Islamic faith made as the Lab project for CSE 4508: RDBMS Programming Lab.</p>
</p>
  <p align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg">
      <img alt="Tests Passing" src="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg" />
    </a>
    <a href="https://img.shields.io/badge/Status-Work%20In%20Progress-yellow">
      <img src="https://img.shields.io/badge/Status-Work%20In%20Progress-yellow" />
    </a>
    <a href="https://img.shields.io/badge/license-MIT-orange.svg">
      <img alt="License" src="https://img.shields.io/badge/license-MIT-orange.svg" />
    </a>
    <br />
  <h3 align="center">Built With</h3>
  <h4 align="center">Frameworks and Dependencies</h4>
  <p align="center">
  <a href="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
      <img src="https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
    </a>
    <a href="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
      <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
    </a>
    <a href="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
      <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    </a>
    <a href="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
      <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
    </a>
    </p>
    <h4 align="center">APIs</h4>
    <p align='center'>
    <a href="https://aladhan.com/islamic-calendar-api">
      Aladhan - Islamic Calendar API
    </a>
    |
    <a href="https://alquran.cloud/api">
      Al Quran Cloud - Quran API
    </a>
    |
    <a href="https://prayertimes.date/api/docs/this_week#">
      Prayer Times API
    </a>
    |
    <a href="https://db-ip.com/api/doc.php">
      Geolocation - DB-IP
    </a>
    </p>
<h3 align="center">Production</h3>
    <p align="center">
    <a href="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white">
      <img src="https://img.shields.io/badge/herokuapp-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white"/>
    </a>
    </p>
    <p align='center'>
    We are hosting live! Visit <b>https://productive-muslim.herokuapp.com</b> and check it out!
   </p>
  </p>
  
  # Team Members
  * Syed Rifat Raiyan- 180041205
  * Samia Islam- 180041237
  * [M. K. Bashar](http://linktr.ee/mkbashar)- 180041238
  
  # Features
- [Signup](#signup)
- [Login](#login)
- [Home Page](#home-page)
- [Dua](#dua)
- [Salah](#salah)
- [Sawm](#sawm)
- [Ibadah Tracker](#ibadah-tracker)
- [Challenges](#challenges)
- [Forum](#forum)
- [Edit Profile](#edit-profile)

## Signup
Users can create a new account by registering with an email.
![Signup](demoImages/signup2.PNG)

## Login
Users can login to an already existing account. They can opt to login with their Google account as well. If they forget their password, a reset password link will be sent to their email.
![Login](demoImages/login.PNG)
![ResetPassword](demoImages/resetpassword.PNG)

## Home Page
This is the landing page. It will display the current Salah waqt and the time remaining for that waqt, the time of the next Salah waqt (according to the user's Madhab), user's tasks for that day, one of the user's favorite duas and a random ayat from the Holy Qur'an. Users can click on "Contact us" at the bottom right to report any bugs or suggest/recommend anything to us, the developers.
![Homepage](demoImages/homepage.PNG)
![ContactUs](demoImages/contactus.PNG)

## Dua
Users can view a wide variety of duas categorized based on emotions. They can select an emotion by clicking on the drop-down button and all duas relevant to that emotion will be filtered and shown. Users can choose to "Favourite" a dua by clicking on the thumbs-up button. Duas that have been deemed as "Favourite" by the user will be listed in the "Favourites" tab.
![AllDuas](demoImages/allduas.PNG)
![Emotions](demoImages/emotions.PNG)
![EmotionDua](demoImages/emotiondua.PNG)
![FavoriteDuas](demoImages/favoriteduas.PNG)

## Salah
Users can view a list of 5 Salah waqts along with optional prayers like, Tahajjud, Salat-al-Ishraq and Chasht. The table shows the starting time of the waqts (according to the user's Madhab), the user's completion status and the time remaining until the current waqt starts. The current waqt's row in the table will be highlighted with a Flash/Blinking animation.
![Salah](demoImages/salah.PNG)

## Sawm
Users can view a calendar in which all the dates for voluntary fasting are highlighted. For more information on the dates, [click here](https://en.wikipedia.org/wiki/Fasting_in_Islam#Days). Users can also choose to make an oath for fasting on any other particular day by stating the reason for doing so. Upon saving, that date will also be highlighted in the calendar. Users can delete any date by simply hovering their cursor over the entry in the list and clicking on the × icon.
![AllSawm](demoImages/allsawm.PNG)
![AddSawm](demoImages/addsawm.PNG)
![DeleteSawm](demoImages/deletesawm.PNG)

## Ibadah Tracker
Users can maintain a To-do list of all the tasks they have in mind. They can plan an event on a certain date and that event will be shifted to their "My Day" task-list on that day. They can also create multiple lists to fragment the different domains of their lives and keep track of them. Clicking on the "Recurring Task" button will make that task appear on the user's daily task list everyday. Users can choose to mark any task as "Done" by clicking on the checkbox or delete any task by clicking on the "Delete" button. They can also edit the task entries.
![Tracker1](demoImages/tracker1.PNG)
![NewTask](demoImages/newtask.PNG)
![UserListTask](demoImages/userlisttask.PNG)
![Planned](demoImages/planned.PNG)
![SelectDate](demoImages/selectdate.PNG)
![RedirectToAllTasks](demoImages/redirectedtoalltasks.PNG)

## Challenges
Users can choose to participate on a 30-days 30-deeds challenge mainly created for the Holy month of Ramadan. Each day constitutes a challenge of performing a good deed which the users can mark as "Done" after they complete it.
![Challenges1](demoImages/challenges.PNG)
![Challenges2](demoImages/challenges2.PNG)
![Challenges3](demoImages/challenges3.PNG)
![Challenges4](demoImages/challenges4.PNG)

## Forum
Users will be able to interact with each other in a discussion forum. They can ask questions or ask for suggestions on any matter relevant to Islam by creating a post and other users can comment on that post. Users will also be able to "Favourite" posts they find to be informative and helpful and those posts will show up on their "Favourites" tab. Apart from that, users can delete any posts or comments that they are the author of.
![AllPosts](demoImages/allposts.PNG)
![CommentSection](demoImages/commentsection.PNG)
![AddPost](demoImages/addpost.PNG)
![MyPosts](demoImages/myposts.PNG)

## Edit Profile
Users can update their profile credentials.
![UpdateProfile](demoImages/updateprofile.PNG)

# Resources
## Tutorials
* [PERN Stack Tutorial](https://www.youtube.com/watch?v=J01rYl9T3BU&t=10223s)

## Theme
* [Arabic Culture & Language Lesson PPT Theme](https://slidesgo.com/theme/arabic-culture-language-lesson)

## Inspirations
We were inspired by similar projects like:
* [Sujood.co](https://www.sujood.co/)
* [IslamicFinder](https://www.islamicfinder.org/)
* [Prayer Times](https://chrome.google.com/webstore/detail/namaz-vakitleri/ieelbggiidmnfbkjcjceknbhjgnhkjnf)
* [Islam Stack Exchange](https://islam.stackexchange.com/)
