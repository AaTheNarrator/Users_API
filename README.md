# User Service Specification

## User Model

The user model must contain the following fields:

- **Full name**
- **Date of birth**
- **Email** — must be a unique value
- **Password**
- **Role** — `admin` or `user`
- **User status** — `active` or `inactive`

---

## Required Endpoints

1. **User registration**
2. **User authorization**  
   Any authorization mechanism is allowed.
3. **Retrieve user by ID**  
   Accessible by:
   - an **admin**
   - the **user themselves**
4. **Retrieve list of users**  
   Accessible by:
   - **admin only**
5. **Block a user**  
   Can be performed by:
   - an **admin**
   - the **user themselves**

---

## Additional Requirements

- Pay attention to **project structure**
- Apply **best practices** in code organization and architecture

---

## Restrictions

### Prohibited
- NestJS

### Allowed
- Express or Koa
- Any DBMS
- Any ORM / ODM
- TypeScript (preferred), JavaScript is also allowed
