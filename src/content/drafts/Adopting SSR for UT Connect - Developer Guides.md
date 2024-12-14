---
title: Adopting SSR for UT Connect - Developer Guides
description: Guides to help developers with the migration
tags:
  - work
  - research
  - frontend
  - guides
published: false
publishedAt: 2024-11-01
---
## Adjusting the mental model
For easier migration, we need to adjust our mental model. As a frontend developer, our code usually only run on the browser. This include our previous model. 

We write our code using React & Typescript, we then built & bundled it using Vite, we made it available to 

### What is Remix
### Few more difference


Prev: All code run in the client, with some run on build time.
Now: There are code running in the server, client, and also some on build time.

## Updated Directory Structure


## Where Does This Code Run On?

## Other Additional Rules

---
# 🚀 SSR Implementation

## Server-side rendering

Server-side rendering (SSR) is the process of rendering the initial HTML of a web page on the server and sending it to the client. This is done to improve the initial load time of the web page, and to improve the SEO.

## Difference with our previous model

Previously, we use CSR (Client-side rendering). We write our application in React & Typescript, then we use Vite to build & bundle the application, and finally we use Express server to serve the application to the client. In This model, our entire application code is running on the client browser. The Express server is only used to serve the static files (& generate the sitemap).

With SSR, our code is running on both the client browser and the server.