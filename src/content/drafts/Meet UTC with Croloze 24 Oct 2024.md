---
title: Meet with Croloze 24/10
description: Notes hasil meeting with Cloroze 24 Oktober 2024
published: false
publishedAt: 2024-10-24
tags:
  - work
---
New Initiative:
- Optimize URL Structure
- BE Config for Meta title, desc,dll

## Site Structure
- Sebagai eCommerce, catalog perlu ada di homepage
- Contoh: ![[assets/Pasted image 20241024102353.png]]
- Navbar berisi struktur dan fitur yang tersedia halaman (news, vids, dll)
- Recommended structure: ![[assets/Pasted image 20241024102440.png]]

## Blog Categories
- Article di utc banyak, bisa dibagi menjadi beberapa category
- Contoh pembagian kategori blog: ![[assets/Pasted image 20241024102717.png]]
- from `/news/blog/{id}` => `news/blog/{category}/{slug}`

## URL Structure
- Update structure identification dari UUID ke Slug
- Dibagi lagi berdasarkan brand atau kategori lain
- Contoh yang diberikan: ![[assets/Pasted image 20241024102924.png]]

## Konfigurasi HTML Meta 
- Update CMS to support input meta tittle, meta description, url slug, & OG image.
- Example: ![[assets/Pasted image 20241024103127.png]]

## Robots.txt Improvement
- Improve robots.txt dengan data sitemap terbaru
- Dikerjakan setelah update halaman sitemap
- Example ![[assets/Pasted image 20241024103326.png]]
