import { EventType, PageEvent, TabUpdateEvent } from '../common/types';
import { isValidUrl } from '../common/url-check';

chrome.runtime.onMessage.addListener(function (event: PageEvent) {
  if (event.type === EventType.TabUpdate) {
    if (isValidUrl((event as TabUpdateEvent).data.href)) {
      chrome.action.setIcon({ path: "icons/128px.png" })
    } else {
      chrome.action.setIcon({ path: "icons/128px-disabled.png" })    }
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (isValidUrl(tab.url)) {
    chrome.action.setIcon({ path: "icons/128px.png" })
  } else {
    chrome.action.setIcon({ path: "icons/128px-disabled.png" })
  }
});
