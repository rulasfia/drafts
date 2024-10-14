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
- [[#About Hydration]]
- [[#Our Current Approach]]
- [[#What's the Plan]]
- [[#Follow Up]]
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
1. **Good for SEO**: Search engine crawlers are easily able to crawl the content of an SSR application because it's already there in the HTML, thus ensuring higher search engine optimization on the page.
2. **Good initial load performance**:  with impact on metric such as ([FCP](https://web.dev/articles/fcp) and [TTI](https://web.dev/articles/tti)). This happen because with SSR, only resource needed for specific page are loaded. Aside from that, because the content already embedded within the HTML, user don't need to wait for JavaScript to be executed to see the content of the page.
### Cons
- **Slow Time to First Byte**: ([TTFB](https://web.dev/articles/ttfb)) is a metric that measure time between user click enter on URL bar and the first data received by the user. This can be slow because every client send a request to the same sever, and the server need to response to each one of it. 
- Network request to server on each navigation (can be slow)
## Our Current Approach
CSR with Create React App.

## What's the Plan
Migrate to SSR powered by Vite and React Router v7.

## References
- https://web.dev/articles/rendering-on-the-web
- https://web.dev/explore/learn-core-web-vitals
- https://www.patterns.dev/react/server-side-rendering
- https://www.patterns.dev/react/client-side-rendering
