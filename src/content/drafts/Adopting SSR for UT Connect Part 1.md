---
title: Adopting SSR for UT Connect Part 1
description: Current state and preparation
published: true
publishedAt: 2024-10-12
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
### Comparison with CSR
On the other hand, In Client-Side Rendering (CSR), only the barebones HTML container for a page is rendered by the server. 
### Pros and Cons
### About Hydration

## Our Current Approach

## What's the Plan

## Follow Up
