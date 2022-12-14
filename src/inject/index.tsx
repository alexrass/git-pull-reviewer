import type { PageEvent } from '../common/types';
import { EventType } from '../common/types';

(async () => {
  try {
    await chrome.runtime.sendMessage<PageEvent>({
      type: EventType.TabUpdate,
      data: {
        href: window.location.href
      }
    })
    const diffStatEl = document.getElementById('diffstat');

    if (!diffStatEl) {
      return chrome.runtime.sendMessage<PageEvent>({
        type: EventType.DiffError,
        data: {
          message:`Missing data on page ${window.location.href}`
        }
      });
    }

    const [linesAdded, linesRemoved] = Array.from(diffStatEl.querySelectorAll('span'))
      .map((el) => Math.abs(Number(el.innerText.replace(/\D+/g, ''))));

    return chrome.runtime.sendMessage<PageEvent>({
      type: EventType.DiffStat,
      data: {
        title: document.title,
        linesChanged: linesAdded + linesRemoved,
        linesAdded,
        linesRemoved,
        href: window.location.href,
      }
    });
  } catch (error) {
    return chrome.runtime.sendMessage<PageEvent>({
      type: EventType.DiffError,
      data: error,
    });
  }
})();
