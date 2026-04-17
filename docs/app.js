const RELEASE_ENDPOINT = "https://api.github.com/repos/medvestnik/juraui/releases/latest";
const RELEASES_PAGE = "https://github.com/medvestnik/juraui/releases";

function formatDate(value) {
  if (!value) return "Unknown publish date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown publish date";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function truncateText(text, maxLength = 700) {
  if (!text) return "Release notes are not provided for this version.";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

function renderFallback(container, message = "No published releases yet") {
  container.innerHTML = `
    <h3>${message}</h3>
    <p class="release-meta">Please check the releases page for updates.</p>
    <div class="release-actions">
      <a class="btn btn-secondary" href="${RELEASES_PAGE}" target="_blank" rel="noreferrer noopener">View releases</a>
    </div>
  `;
}

function renderRelease(container, release) {
  const title = release.name?.trim() || release.tag_name || "Untitled release";
  const published = formatDate(release.published_at);
  const body = truncateText(release.body);
  const htmlUrl = release.html_url || RELEASES_PAGE;
  const firstAsset = Array.isArray(release.assets) && release.assets.length > 0 ? release.assets[0] : null;

  const downloadButton = firstAsset
    ? `<a class="btn btn-secondary" href="${firstAsset.browser_download_url}" target="_blank" rel="noreferrer noopener">Download ${firstAsset.name || "asset"}</a>`
    : "";

  container.innerHTML = `
    <h3>${title}</h3>
    <p class="release-meta">Published: ${published}</p>
    <p class="release-body">${body}</p>
    <div class="release-actions">
      <a class="btn btn-primary" href="${htmlUrl}" target="_blank" rel="noreferrer noopener">Open release</a>
      ${downloadButton}
    </div>
  `;
}

async function loadLatestRelease() {
  const container = document.getElementById("release-card");
  if (!container) return;

  try {
    const response = await fetch(RELEASE_ENDPOINT, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (response.status === 404) {
      renderFallback(container, "No published releases yet");
      return;
    }

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data || (!data.name && !data.tag_name)) {
      renderFallback(container, "No published releases yet");
      return;
    }

    renderRelease(container, data);
  } catch (error) {
    console.error("Failed to load latest release", error);
    renderFallback(container, "Unable to load latest release right now");
  }
}

function updateYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

updateYear();
loadLatestRelease();
