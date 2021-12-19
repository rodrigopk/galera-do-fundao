const jsonUrl = chrome.runtime.getURL("data/votes.json");

const replaceTextByLink = ({ element, regex, url, title, style }) => {
  return element.innerHTML.replace(
    regex,
    `<a href="${url}" title="${title}" style="${style}">$1</a>`
  );
};

const searchAndHighlightText = ({ votes, styles, url, tooltips }) => {
  const regexNo = new RegExp("(" + votes.no + ")", "gi");
  const regexYes = new RegExp("(" + votes.yes + ")", "gi");

  for (const element of document.querySelectorAll(
    "a, p, small, span, strong, td, h1, h2, h3, h4, h5, h6"
  )) {
    if (regexNo.test(element.textContent)) {
      element.innerHTML = replaceTextByLink({
        element,
        url,
        regex: regexNo,
        title: tooltips.no,
        style: styles.no,
      });
    } else if (regexYes.test(element.textContent)) {
      element.innerHTML = replaceTextByLink({
        element,
        url,
        regex: regexYes,
        title: tooltips.yes,
        style: styles.yes,
      });
    }
  }
};

fetch(jsonUrl)
  .then((response) => response.json())
  .then((json) => searchAndHighlightText(json));
