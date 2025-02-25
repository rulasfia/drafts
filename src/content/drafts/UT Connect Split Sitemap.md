---
title: UT Connect Split Sitemap
description: Implementation of Split sitemap in UT Connect POT
tags:
  - work
  - frontend
  - seo
author:
  - rulasfia
published: true
publishedAt: 2025-02-25
---
Sitemap adalah sebuah file XML yang berisi daftar halaman dan konten penting dalam sebuah website. Tujuan utama dari sitemap adalah untuk membantu mesin pencari seperti Google, Bing, dan lainnya untuk memahami struktur sebuah website dengan lebih baik saat mereka melakukan *indexing* konten.
## Plan
Saat ini, Kita telah mengimplementasikan sitemap untuk halaman-halaman yang bisa diakses secara public. Implementasi ini berupa sebuah file `sitemap.xml` yang berisi semua halaman tersebut, yang kemudian didaftarkan pada file `robots.txt` agar bisa terbaca oleh mesin pencari.

Implementasi tersebut telah berjalan dengan baik, namun bukan berarti tidak ada peningkatan yang bisa dilakukan. Salah satu peningkatan yang dapat dilakukan adalah dengan **membagi daftar halaman pada `sitemap.xml` menjadi beberapa file** dengan tujuan spesifik masing-masing. Seperti sitemap untuk product, sitemap untuk artikel, dll.
## Pros and Cons
| Feature              | Single Sitemap File                                        | Multiple Sitemap Files                                |
| -------------------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| **Complexity**       | Simpler to manage initially.                               | More complex to manage, requires organization.        |
| **Scalability**      | Limited to 50,000 URLs and 50MB file size.                 | Can handle virtually unlimited URLs by splitting.     |
| **Organization**     | All URLs in one place, potentially harder to navigate.     | URLs can be grouped logically by category/section.    |
| **Update Frequency** | Updating one large file can be slower.                     | Smaller files can be updated more frequently.         |
| **Error Handling**   | One error can affect the entire sitemap.                   | Errors are isolated to specific files.                |
| **Performance**      | Can be slower for search engine crawlers with large sites. | Faster crawling for large sites due to smaller files. |
| **Implementation**   | Easier to implement initially.                             | Requires more planning and setup.                     |
| **Maintenance**      | Easier for small websites.                                 | Easier for large, complex websites                    |
## Implementation Detail
Berikut ini kurang lebih struktur file di server untuk *handling* sitemap setelah update split sitemap. 
- `sitemap.manager.js` digunakan untuk me-request data ke backend server untuk list halaman valid pada tiap kategori. 
- `sitemap.route.js` berisi halaman alamat sitemap baru yang telah dipisahkan per kategori. 
- `sitemap.store.js` berisi implementasi *cache* sederhana sehingga tidak perlu re-generate ulang sitemap tiap request.
![[assets/Pasted image 20250225103512.png]]
Implementasi split sitemap tidak jauh berbeda dengan single sitemap. Pertama-tama adalah membuat *endpoint* baru untuk tiap sitemap berdasarkan kategori masing-masing.
![[assets/Pasted image 20250225102753.png]]
Perlu dipisah juga implementasi cache & method untuk *sitemap generation* yang akan digunakan oleh masing-masing kategori. Endpoint-endpoint sitemap baru tersebut lalu didaftarkan pada `robots.txt` untuk menggantikan endpoint sitemap yang sebelumnya.
![[assets/Pasted image 20250225104009.png]]
Step terakhir yang perlu dilakukan adalah *handling content update*, sehingga ketika ada konten baru yang ditambahkan, alamat dari konten tersebut akan langsung masuk ke daftar sitemap yang sudah ada sesuai kategori masing-masing.
![[assets/Pasted image 20250225103345.png]]
## Result
Hasil dari implementasi Split Sitemap akan terlihat seperti berikut.
![[assets/Pasted image 20250225104747.png]]
![[assets/Pasted image 20250225104831.png]]
## References
- Implementasi di Blibli: https://www.blibli.com/robots.txt
- Implementasi di Tokopedia: https://www.tokopedia.com/robots.txt