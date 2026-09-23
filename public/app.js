async function generateContent() {
  const type = document.getElementById("type").value;
  const business = document.getElementById("business").value;
  const product = document.getElementById("product").value;
  const audience = document.getElementById("audience").value;
  const tone = document.getElementById("tone").value;

  const button = document.getElementById("generateBtn");
  const loading = document.getElementById("loading");
  const resultBox = document.getElementById("resultBox");
  const result = document.getElementById("result");

  if (!product.trim()) {
    alert("Please enter your product or service details.");
    return;
  }

  button.disabled = true;
  button.textContent = "✨ Creating...";
  loading.classList.remove("hidden");
  resultBox.classList.add("hidden");

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        business,
        product,
        audience,
        tone
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    result.textContent = data.result;
    resultBox.classList.remove("hidden");

  } catch (error) {
    alert(error.message);
  } finally {
    button.disabled = false;
    button.textContent = "✨ Generate with AKVora AI";
    loading.classList.add("hidden");
  }
}

function copyResult() {
  const text = document.getElementById("result").textContent;

  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Content copied successfully! ✅");
    })
    .catch(() => {
      alert("Copy failed. Please copy the text manually.");
    });
}
