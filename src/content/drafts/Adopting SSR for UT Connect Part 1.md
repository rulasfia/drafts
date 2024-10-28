---
title: Adopting SSR for UT Connect (Part 1)
description: Current state and preparation
published: true
publishedAt: 2024-10-12
tags:
  - work
  - research
  - frontend
---
- [[#What is Server Side Rendering]]
- [[#Comparison with CSR]]
- [[#Pros and Cons]]
- [[#Our Current Approach]]
- [[#What's the Plan]]
- [[#References]]
## What is Server Side Rendering
Server-side rendering (SSR) is one of the oldest methods of rendering web content. SSR generates the full HTML for the page content to be rendered in response to a user request. 

The content may include data from a datastore or external API. This avoids additional round trips for data fetching and templating on the client, because the renderer handles them before the browser gets a response.

With SSR every request is treated independently and will be processed as a new request by the server. Even if the output of two consecutive requests is not very different, the server will process and generate it from scratch. Since the server is common to multiple users, the processing capability is shared by all active users at a given time.
## Comparison with CSR
Server-side rendering isn't the best solution for everything, because its dynamic nature can have significant compute overhead costs. Also, it showing content sooner doesn't necessarily give you less work to do.

On the other hand, In Client-Side Rendering (CSR), only the barebones HTML container for a page is rendered by the server. All logic, data fetching, templating, and routing are handled with JavaScript on the client instead of on the server. It can helped to blur the difference between websites and installed applications.

The primary downside to client-side rendering is that the amount of JavaScript required tends to grow as an application grows, which can impact a page's [INP](https://web.dev/articles/inp).
## Pros and Cons
### Pros
- **Good for SEO**: Search engine crawlers are easily able to crawl the content of an SSR application because it's already there in the HTML, thus ensuring higher search engine optimization on the page.
- **Good initial load performance**:  with impact on metric such as ([FCP](https://web.dev/articles/fcp) and [TTI](https://web.dev/articles/tti)). This happen because with SSR, only resource needed for specific page are loaded. Aside from that, because the content already embedded within the HTML, user don't need to wait for JavaScript to be executed to see the content of the page.
- **Better Security**: Because the apps now have access to a server, it can be better and more precise at managing what data need to send to the client and what is not. 
### Cons
- **Slow Time to First Byte**: ([TTFB](https://web.dev/articles/ttfb)) is a metric that measure time between user click enter on URL bar and the first data received by the user. This can be slow because every client send a request to the same sever, and the server need to response to each one of it. 
- **Network request on each navigation**: Because the server only response with the resource of the requested page, when client want to navigate to other page, they need to make request to the server first. This can feel slow, especially for apps that need a lot of navigation for interaction.
## Our Current Approach
Currently, our frontend consist of Client Side Rendering React app powered by [Create React App](https://create-react-app.dev/) (which is now deprecated).

## What's the Plan
Our initial plan was simply to migrate from a legacy Create React App and class-based React application to a more modern Vite setup, while also adopting newer React features like hooks and standardizing our development process. However, when SEO concerns arose and after several discussions, we decided to implement server-side rendering (SSR) in our project.

In the ecosystem, there are several option to implement SSR with React. We can use modern framework that has this feature build in like [Next.js](https://nextjs.org/), [Remix](https://remix.run/), [TanStack Start](https://tanstack.com/start/latest) or even [Astro](https://astro.build/).

We need to carefully choose our approach here. As this decision comes near the end of our refactor to a Vite-based app, we need to find an implementation that requires minimal code changes. Next.js and Astro would demand significant changes to our app's structure to fit their model, and TanStack Start is still in alpha at the time of writing. Considering these constraints, Remix stands out as our most viable option.

Another consideration is that Remix is built on React Router (developed by the same team), which is the router we already use in our project. This alignment will facilitate an easier and quicker migration, as we can reuse much of our existing code with only minor adjustments.

Not long ago, the Remix team announced that they will be [Merging Remix v3 with React Router v7](https://remix.run/blog/merging-remix-and-react-router). This mean we can simply upgrade to React Router v7 when it's finally ready.

![[assets/Pasted image 20241028161753.png]]

So, our strategy right now is to migrate from **React Router v6 > Remix > React Router v7**. We need to migrate to remix first to get the SSR and all the included benefits with reasonably minimal changes. And then when React Router v7 (the next version of Remix) is ready, we will upgrade to that.  

## References
- https://web.dev/articles/rendering-on-the-web
- https://web.dev/explore/learn-core-web-vitals
- https://www.patterns.dev/react/server-side-rendering
- https://www.patterns.dev/react/client-side-rendering
