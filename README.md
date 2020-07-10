<!-- ---
title: MERN todo list
excerpt: A slight overkill version of typical todo list app  
project_url: https://mern-todo-list.netlify.app 
--- -->

![MERN todo](/mern-todo.png)
## Project URL
<https://mern-todo-list.netlify.app>

## Introduction

Todo list has been one the most popular learning project for a learner that is picking up new technology but lack of imagination at the time. In addition to the basic CRUD (create, read, update and delete) operations that are necessary for almost all applications, I've implemented basic a user registration system, and a page for users to view tasks they have accomplished given the period they choose.

## Technologies

### Frontend

- React JS : SPA app.
- React router : Page routing for SPA app.
- Redux : State management.
- SCSS : Styling.
- Netlify : Deployment of static assets.

### Backend (API)

- Express JS : Lightweight backend framework.
- JSON web token : For stateless authentication.
- Mongoose : Object relational mapper ( Provide an easier interface for CRUD operations on MongoDB).
- MongoDB : Document database.
- Digital ocean : For server deployment. (Using Nginx as reverse proxy).

## What I have learned from the project

The purpose of this project is for me to gain a high-level understanding of how a basic full stack single-page app operates. Some of the most important topics I have learned throughout the project are:

1. Understand how API authentication work under the hood.
    - High-level frameworks like Django,Laravel, and Rails they all have some sort of scaffolding functionally that generate authentication system out of the box.
2. Tricky aspects of communications between frontend and backend using AJAX.
    - AJAX calls are asynchronous (well... that's that the "A" stands for  ). The implication of that is that one cannot simply put asynchronous code in redux action generator.  Redux middleware like redux-thunk is required.
    - To access any protected routes, one has to configure request header properly with the token received from the previous request.
