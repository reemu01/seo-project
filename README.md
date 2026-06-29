
SEO Analyzer API

A simple Node.js + Express backend that analyzes basic SEO elements of any given URL like title, meta description, and heading tags.

Live Demo
API URL: https://seo-project-nhur.onrender.com

Features
- REST API built with Node.js and Express
- Fetches HTML of any URL using Axios
- Parses SEO elements using Cheerio
- Returns structured JSON response
- Deployed on Render for free hosting

 Setup Locally

1.Clone the repository
 ```bash
 git clone https://github.com/reemu01/seo-project.git
 cd seo-project

2. *Install dependencies*

 npm install

3. *Run the server*

 node server.js

Server runs on `http://localhost:3000`

---

API Documentation

`GET /`
*Description*: Health check route to verify API is running
*Response*: `"Welcome to SEO Analyzer API"`

`POST /api/analyze`
*Description*: Analyzes SEO elements of the provided URL





SEO Scoring Explanation
The API currently returns raw SEO data. The scoring system will be implemented in v2 based on:

SEO Factor	Points	Reasoning
**Title tag exists**	25	Most critical on-page element for rankings
**Meta description 120-160 chars**	25	Optimal length improves click-through rate
**Exactly one H1 tag**	25	Google recommends single H1 per page
**HTTPS protocol used**	25	Confirmed Google ranking factor

*Total Score*: 100. Score < 50 = Poor, 50-75 = Good, 75+ = Excellent.

---

Backend Architecture

*Request Flow:*

Client → Render Server → Express Router → Controller → Axios Fetch → Cheerio Parse → JSON Response

*How it works:*
1. Client sends POST request with `url` to `/api/analyze`
2. Express middleware parses JSON body
3. Controller validates if URL is present
4. Axios fetches complete HTML of target URL
5. Cheerio loads HTML into virtual DOM for jQuery-like querying
6. We extract `<title>`, `<meta name="description">`, and count all `h1-h6` tags
7. Data is structured into JSON and sent back to client
8. Render auto-deploys on every `git push` to main branch

*Tech Stack:*
- *Node.js*: Non-blocking I/O perfect for multiple web scraping requests
- *Express*: Lightweight, minimal setup for REST APIs
- *Axios*: Promise-based HTTP client for fetching URLs
- *Cheerio*: 8x faster than Puppeteer for static HTML parsing
- *Render*: Free hosting with zero-config deploys from GitHub


---


