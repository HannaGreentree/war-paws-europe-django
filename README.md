# War Paws Europe (WPE) – Full Stack Django Application

---

##  Project Overview

War Paws Europe is a full-stack web application developed as part of the Web Programming Essentials module.

The application allows users to:

- Share blog updates about animals affected by war
- Store and manage information about animal shelters and rescues
- Access organised and structured data in one central system

This project demonstrates my ability to design, build, deploy and document a full relational database web application using Django.

---

##  Project Purpose and Rationale

The war in Ukraine has created serious risks for animals. Many volunteers and organisations help animals, but information is often scattered.

This project was created to:

- Centralise information about shelters and rescues
- Allow volunteers to publish blog updates
- Provide structured and reliable information
- Demonstrate full-stack development skills

### Target Audience

- Animal rescue volunteers  
- NGOs  
- Donors  
- International adopters  
- People interested in animal welfare  

The application allows users to contribute data and benefit from shared community information.

---

##  Technologies Used

### Frontend
- HTML5 (semantic structure)
- CSS3 (custom styling and responsiveness)
- JavaScript (interactive elements)

### Backend
- Python 3
- Django 4.2

### Database
- SQLite (development)
- PostgreSQL (production on Render)

### Deployment
- Render (cloud hosting)
- Gunicorn (WSGI server)
- WhiteNoise (static file handling)

### Version Control
- Git
- GitHub

---

##  Database Design

The application uses a relational database.

### Blog Model (Post)

Fields:
- `title` (CharField, unique)
- `slug` (SlugField, unique)
- `author` (ForeignKey to User)
- `content` (TextField)
- `image` (ImageField)
- `created_on` (DateTimeField)
- `status` (Draft / Published)

Relationship:
- One User → Many Posts

---

### Shelter Model

Fields:
- `name`
- `city`
- `country` (choice field)
- `org_type` (choice field)
- `website`
- `description`
- `added_by` (ForeignKey to User)

Relationship:
- One User → Many Shelters

---

##  CRUD Functionality

The project implements full CRUD functionality.

### Blog
- Create posts (admin panel)
- Read posts (list and detail views)
- Update posts (admin edit)
- Delete posts (admin delete)

### Shelters
- Create shelter records
- Read shelter list
- Update shelter data
- Delete shelter records

All changes are immediately reflected in the user interface.

---

##  Frontend Design & UX

The application follows UX principles:

- Clear navigation menu
- Logical page structure
- Consistent styling
- Responsive layout
- Accessible image alt text
- Mobile-friendly design

The purpose of each page is clear to new users.

---

##  Security Features

Security measures implemented:

- SECRET_KEY stored in environment variables
- DEBUG disabled in production
- ALLOWED_HOSTS configured
- No passwords stored in repository
- DATABASE_URL stored securely in Render
- Admin restricted to superusers
- CSRF protection enabled
- Form validation handled by Django

---

##  Deployment

The application is deployed on Render.

### Deployment Steps

1. Code pushed to GitHub
2. PostgreSQL database created on Render
3. Web service created on Render
4. Environment variables configured:
   - SECRET_KEY
   - DEBUG
   - ALLOWED_HOSTS
   - DATABASE_URL
5. Start command configured:

6. 6. Migrations applied
7. Static files collected

The deployed version matches the development version.

---

## Testing

Manual testing was performed.

### Blog Testing
- Created new blog post
- Verified it appears on blog page
- Edited post and confirmed updates
- Deleted post and confirmed removal
- Uploaded image and verified display

### Shelter Testing
- Added new shelter
- Edited shelter information
- Deleted shelter
- Verified changes reflect immediately

### Authentication Testing
- Created superuser
- Tested login and logout
- Verified admin access restriction

### Responsive Testing
Tested using browser developer tools:

- Desktop view
- Tablet view
- Mobile view

Confirmed layout, readability and navigation functionality.

---

##  Use of Artificial Intelligence

AI (ChatGPT) was used as a study and debugging support tool.

AI helped with:

- Understanding Django configuration
- Debugging deployment errors
- Explaining relational database relationships
- Reviewing project requirements
- Improving documentation clarity

All implementation, configuration and testing were completed by me.  
AI was used as a learning assistant, not as an automatic code generator.

---

##  Project Structure

war_paws_europe/
│
├── backend/
│ ├── blog/
│ ├── shelters/
│ ├── main/
│ ├── core/
│ ├── static/
│ ├── templates/
│ ├── manage.py
│ └── requirements.txt
│
├── README.md
└── Procfile


---

##  Version Control

- Regular commits made throughout development
- Clear and descriptive commit messages
- .gitignore configured properly
- No secret keys stored in repository

---

##  Evaluation

This project meets the full-stack project requirements:

- Relational database implemented
- Models and relationships designed
- CRUD functionality working
- Secure deployment
- Responsive frontend design
- Environment variables used
- Testing documented
- Deployment documented
- Data schema described
- Clear project rationale provided

---

##  Author

Hanna Greentree  
Web Programming Essentials  
2026  

---

##  License

This project is created for educational purposes only.
