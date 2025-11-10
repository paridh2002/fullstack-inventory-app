# Inventory Management Full Stack App

A simple and extraordinary inventory management system with authentication, role-based access, CRUD, and clean UI.

## Features

- JWT authentication, only registered users can login
- Role-based (user/admin): Only admins can add/edit/delete inventory
- Inventory CRUD (Create, Read, Update, Delete)
- Protected routes (can't see dashboard without login)
- React frontend (Material UI), Node.js/Express backend, MongoDB database

## Setup

### Backend

```bash
cd backend
npm install
npm run dev
```
(Create a `.env` as shown in the code above)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Usage

- Register ("Sign up") → Login
- Use Dashboard: view or (if admin) manage inventory  
- To make admin: manually update user `role` in MongoDB or add admin on registration

## Folder Structure

See code above for the exact folder hierarchy.
