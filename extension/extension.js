const jsonUrl = chrome.runtime.getURL("data/votes.json");

const searchAndHighlightText = ({ votes, styles, url, tooltips }) => {
  const regexNo = new RegExp("(" + votes.no.join("|") + ")", "gi");
  const regexYes = new RegExp("(" + votes.yes.join("|") + ")", "gi");

  for (const element of document.querySelectorAll(
    "a, p, small, span, strong, td, h1, h2, h3, h4, h5, h6"
  )) {
    if (regexNo.test(element.textContent)) {
      element.innerHTML = element.innerHTML.replace(
        regexNo,
        `<a href="${url}" title="${tooltips.no}" style="${styles.no}">$1</a>`
      );
    } else if (regexYes.test(element.textContent)) {
      element.innerHTML = element.innerHTML.replace(
        regexYes,
        `<a href="${url}" title="${tooltips.yes}" style="${styles.yes}">$1</a>`
      );
    }
  }
};

fetch(jsonUrl)
  .then((response) => response.json())
  .then((json) => searchAndHighlightText(json));
