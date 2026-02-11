War Paws Europe – Full Stack Django Application
Project Overview
War Paws Europe is a full-stack web application developed as part of my Web Programming Essentials project.
The purpose of this project is to create a database-driven web application that allows users to:
Share information about animal shelters and rescues
Publish blog updates about animals affected by war
Access structured and reliable information in one place
This project demonstrates my ability to design, build, deploy, and document a complete full-stack application using Django and relational databases.

CSS3 (custom styling and responsive layout)
JavaScript
Back End
Python 3
Django Framework
Database
PostgreSQL (production)
Django ORM for data modelling and queries
Tools and Deployment
Git & GitHub (version control)
Render (cloud hosting)
Gunicorn (production server)
WhiteNoise (static file handling)
Application Features
Multi-page Django website
Database-driven blog section
Database-driven shelter listings
Responsive design for desktop, tablet, and mobile
Navigation menu on all pages
Static files (CSS, images, JavaScript) served correctly in production
Database Design and Schema
The application uses a relational database designed to fit the project domain.
Blog Post Model
title
slug
author (ForeignKey → User)
content
image (optional)
created_on
status (Draft / Published)
Relationship:
One user can create many blog posts, but each post has one author.
Shelter Model
name
city
country
org_type (shelter, veterinary clinic, transport company)
website
description
added_by (ForeignKey → User)
Relationship:
One user can add many shelters, but each shelter is added by one user.
CRUD Functionality
The application implements full CRUD functionality:
Create: New blog posts and shelters can be added via the Django admin panel
Read: Blog posts and shelter data are displayed on the website
Update: Existing records can be edited in the admin panel
Delete: Records can be removed from the database
All changes are saved to the database and are immediately reflected in the user interface.
User Experience, Accessibility, and Responsiveness
Clear navigation structure across all pages
Consistent layout and styling
Responsive design using CSS
Semantic HTML elements for accessibility
Content organised in a clear and readable way
Security Features
Secret key stored using environment variables
Debug mode disabled in production
Database credentials hidden using environment variables
No sensitive information committed to GitHub
Allowed hosts restricted for production deployment
Testing
Testing was carried out manually and included:
Navigation testing across all pages
Blog and shelter CRUD testing
Database connection testing
Responsive layout testing using browser developer tools
Deployment testing to ensure the live site matches local development
Any issues found during testing were fixed before final submission.
Deployment
The project is deployed using Render.
Deployment Process
Project pushed to GitHub
PostgreSQL database created on Render
Environment variables configured (SECRET_KEY, DATABASE_URL, DEBUG, ALLOWED_HOSTS)
Static files collected using collectstatic
Application deployed using Gunicorn
Live Application
👉 https://war-paws-europe-django.onrender.com
Project Structure (Simplified)
backend/
├── manage.py
├── war_paws_europe/
├── blog/
├── shelters/
├── main/
├── templates/
├── static/
├── media/
Attribution
All code was written by the author for this project
Images are used for educational purposes only
External libraries are listed in requirements.txt
Author
Hanna Greentree
Web Programming Essentials / Full Stack Development
2025
License
This project was created for educational purposes only.
