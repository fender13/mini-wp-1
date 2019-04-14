# mini-wp
---
User Table\
firstName: REQUIRED\
lastName: REQUIRED\
username: REQUIRED\
email: REQUIRED\
password: REQUIRED\

User Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | POST | /register | | firstName, lastName, username, email, password | Manual Registration | Object { _id, firstName, lastName, username, email, password } | Object { message: ... } 500 (Internal Server Error) |
2 | POST | /login | | username, password | Manual Login | 200 (token) | Object { message: ... } 500 (Internal Server Error) |
3 | POST | /google || Google Id_Token | Google Sign In | 200 (token) | Object { message: ... } 500 (Internal Server Error) |
---
Article Table\
title: REQUIRED\
tags: ARRAY\
createdAt: AUTOMATIC\
author: REQUIRED\
featured_image: REQUIRED\
content: REQUIRED\

Tag Table\
tagName: \
ArticleId: ARRAY\

User Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | POST | /articles/upload | token, Content-Type | image, title, content, tags (in array) | Post an Article | 201 Object { _id, title, tags, createdAt, author, featured_image, content } | Object { message: ... } 500 (Internal Server Error) |
2 | GET | /articles | | | Get All Articles | 200 Object [{ _id, title, tags, createdAt, author, featured_image, content }] | Object { message: ... } 500 (Internal Server Error) |
3 | GET | /articles/user | | | Get All Articles Owned by User | 200 Object [{ _id, title, tags, createdAt, author, featured_image, content }] | Object { message: ... } 500 (Internal Server Error) |
4 | GET | /articles/:id | | | Get single Articles | 200 Object { _id, title, tags, createdAt, author, featured_image, content } | Object { message: ... } 500 (Internal Server Error) |
5 | PUT | /articles/:id | token | title, tags, content | Update Single Article | 200 Object { _id, title, tags, createdAt, author, featured_image, content } | Object { message: ... } 500 (Internal Server Error) |
6 | PUT | /articles/image/:id | token | image | Update Image Article | 200 Object { _id, title, tags, createdAt, author, featured_image, content } | Object { message: ... } 500 (Internal Server Error) |
7 | DELETE | /articles/:id | token | | Delete an Article | 200 Object { _id, title, tags, createdAt, author, featured_image, content } | Object { message: ... } 500 (Internal Server Error) |
8 | GET | /articles/set-tag/:tag | | | Get Article by Tags | 200 Object [{ _id, tagName, [ ArticleId ] }] | Object { message: ... } 500 (Internal Server Error) |
