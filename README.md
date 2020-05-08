## Train-Scheduler
A train schedule application that incorporates Firebase to host arrival and departure data. The app will retrieve and manipulate this information with Moment.js. It then will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.


## Getting Started
Download the "images" folder to visualize how Train Scheduler works!


## Demo:
A real-time updated clock is in the header, and the arrival times are updated every minute. (Specifically when the client's computer clock changes minute, as calculated using the time functions in JS.) New trains can be submitted through the form at the bottom of the page. Trains can be deleted using the icon next to them in the train listing table.

![Screen shot](assets\images\DEMO.gif)


## Back-End:
Firebase - stores train name, train frequency, and train start time With Moment.js - This pulls the data from Firebase and manipulates the data to give next train arrival time and minutes away.

![Screen shot](assets\images\Backend.png)


## Technologies Used:
* HTML5
* CSS3
* JavaScript
* Bootstrap Framework
* jQuery
* Firebase Database
* Moment.js

# Project Made by Muhammad Ali