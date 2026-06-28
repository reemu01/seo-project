const button = document.getElementById("analyzeBtn");

button.addEventListener("click", async () => {

    const url = document.getElementById("url").value;

    if (!url) {
        alert("Please enter a website URL");
        return;
    }
    document.getElementById("result").innerHTML = "<h3>Analyzing website...</h3>";

    const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    });

    const data = await response.json();

    document.getElementById("result").innerHTML = `
        <h2>Analysis Result</h2>

        <p><strong>Title:</strong> ${data.title}</p>

        <p><strong>Meta Description:</strong> ${data.metaDescription}</p>

        <p><strong>H1:</strong> ${data.h1.join(", ")}</p>

        <p><strong>Images:</strong> ${data.images}</p>

        <p><strong>Images Without Alt:</strong> ${data.imagesWithoutAlt}</p>

        <p><strong>Internal Links:</strong> ${data.internalLinks}</p>

        <p><strong>External Links:</strong> ${data.externalLinks}</p>

        <p><strong>SEO Score:</strong> ${data.seoScore}/100</p>

        <h3>Suggestions</h3>

        <ul>
            ${data.suggestions.map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;
});