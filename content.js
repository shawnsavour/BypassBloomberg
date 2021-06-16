function removeDOMElement (...elements) {
  for (const element of elements) {
      if (element) { element.remove(); }
  }
}

function blockElement (selector, blockAlways = false) {
  new window.MutationObserver(function (mutations) {
      for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
              if (node instanceof window.HTMLElement) {
                  if (node.matches(selector)) {
                      removeDOMElement(node);
                      if (!blockAlways) {
                          this.disconnect();
                      }
                  }
              }
          }
      }
  }).observe(document, { subtree: true, childList: true });
}

blockElement('#graphics-paywall-overlay', true);