const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("SEO Analyzer is Running 🚀");
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { url } = req.body;
    console.log("New code is running", url);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $("title").text();
   const metaDescription =
  $('meta[name="description"]').attr("content") || "Meta description not found";
    const h1 = [];

    $("h1").each((i, el) => {
      h1.push($(el).text());
    });
    const images = $("img").length;

let imagesWithoutAlt = 0;

$("img").each((i, el) => {
  if (!$(el).attr("alt")) {
    imagesWithoutAlt++;
  }
});
const links = $("a");

let internalLinks = 0;
let externalLinks = 0;

links.each((i, el) => {
  const href = $(el).attr("href");

  if (href) {
    if (href.startsWith("http")) {
      externalLinks++;
    } else {
      internalLinks++;
    }
  }
});
let seoScore = 100;

if (!title) seoScore -= 20;
if (!metaDescription || metaDescription === "Meta description not found") seoScore -= 20;
if (h1.length === 0) seoScore -= 20;
if (imagesWithoutAlt > 0) seoScore -= 20;
if (internalLinks === 0) seoScore -= 20;
const suggestions = [];

if (!title) {
  suggestions.push("Add a page title.");
}

if (!metaDescription || metaDescription === "Meta description not found") {
  suggestions.push("Add a meta description.");
}

if (h1.length === 0) {
  suggestions.push("Add at least one H1 tag.");
}

if (imagesWithoutAlt > 0) {
  suggestions.push("Add alt text to all images.");
}

if (internalLinks === 0) {
  suggestions.push("Add internal links.");
}

    res.json({
      title,
      metaDescription,
      h1,
      images,
      imagesWithoutAlt,
      internalLinks,
      externalLinks,
      seoScore,
      suggestions,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to analyze website",
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});