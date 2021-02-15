# Golden Path

An online marketplace app that fills the niche in creating a marketplace purely for profitable ideas, side-hustles, and knowledge that is all stored in one easily web application. 

## Purpose of this application

Golden Path is created to give entrepreneurs and teachers the ability to sell knowledge, trade secrets, data, and lessons on profitable ideas like Digital Arbitage, Dropshipping, Options trading, web developement courses or even accelerated online coding bootcamps. This application's target audience is anyone willing to purchase knowledge and learn at their convience. It also attempts to enlighten people to the multiple paths of knowledge and ideas to increase their monthly income. All courses and products on the site will be vetted to ensure quality and to expose scams and MLMs. Like many online marketplaces user reviews will tell a convincing story if a course is right for you. This is the GP guarentee. 

## Models 

USERS
-------------------
PRIMARY KEY ID - INTEGER
username - STRING
firstName - STRING
lastName - STRING
emailAddress - STRING
password - STRING
profilePicture - STRING
Purchases - [] - STRING

SELLERS
-------------------
PRIMARY KEY ID - INTEGER
PRIMARY KEY ID - INTEGER
username - STRING
firstName - STRING
lastName - STRING
emailAddress - STRING
password - STRING
profilePicture - STRING
courseId - [] - INTEGER

COURSES
-------------------
PRIMARY KEY ID - INTEGER
name - STRING
content - STRING 
category - STRING
sellerId - INTEGER

REVIEWS
-------------------
PRIMARY KEY ID - INTEGER
userId - INTEGER
content - STRING
rating - INTEGER

COURSESREVIEWS
-------------------
PRIMARY KEY ID - INTEGER
courseId -
reviewId -

## USER STORIES
### As a user
- User signs up and creates a profile - later functionality will include figuring out the user's interest and tailoring courses for that user in the future. This is an extra option. 
- User searches for courses in the search bar
- Relevant keywords will populate the search page that either matches the input catagory or if the name or content summary includes searched keywords
- User reads summary of course, reviews, and decided if they want to take this course. 
- User purchases a course, redirects to a checkout page.
- User sucessfully pays 
- User will either be redirected to a new page with the course content, depending on how the lesson is set up.
- User begings their golden path to knowledge
- User reviews the course and takes the knowledge to become wealthy or for personal satisfaction.
### As a seller
- Seller signs up and fills out their seller form
- Seller connects a way to get paid 
- Seller will create a course that they are knowlegable at
- Maybe include a video api that the user can connect their private youtube playlist on
- Course will be posted up
- A user should be allowed to message the seller for questions and more details of the course
- Seller gets paid when a user signs up 
- Seller can respond to feedback. 

## NOTES
Things to note 
- This will be a quality over quantity site - or at least you get what you pay for. 
- An unsigned user will be able to search and see a preview of courses
- Implement a complex review system as this is the heart and soul of why people trust GP
- Only allow verified purchasers the ability to comment and review 
- The course content should vary and be very customizable for the seller 
- Different profiles and permissions for a user and a seller
- Thinking about categories and population of courses
- Design and functionality will be inspired by apps like Udemy, Fiver, Ebay, Etsy, and Amazon. 
- Using a payment API and Oauth. 
- Will work on more wireframes. 


