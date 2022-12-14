import 'reset-css';
import '../common/common.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Color } from '../common/styles';
import {
  DiffErrorEvent,
  DiffStatEvent,
  EventType,
  PageEvent,
  PullRequestData,
} from '../common/types';
import { isValidUrl } from '../common/url-check';
import { App } from './components/App';
import { InvalidURL } from './components/App/InvalidURL';
import { Status } from './components/Status';

console.log(`Loading ${new Date().toJSON()}`);
function Boot() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [prData, setPrData] = React.useState<PullRequestData>(null);

  async function requestPullRequestData() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab?.id && isValidUrl(tab.url)) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ['inject.js'],
        },
        function () {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            window.close();
          }
        }
      );
    } else {
      window.close();
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
    requestPullRequestData().then();

    const listener = (event: PageEvent) => {
      if (event.type === EventType.DiffError) {
        console.error(
          'Error reported from tab:',
          (event as DiffErrorEvent).data.message
        );
      } else if (event.type === EventType.DiffStat) {
        setPrData((event as DiffStatEvent).data);
      }

      setIsLoading(false);
    };

    chrome.runtime.onMessage.addListener(listener);
  }, []);

  return (
    <div style={styles.root}>
      <Status isLoading={isLoading} />
      {!isLoading && prData && <App data={prData} />}
      {!isLoading && !prData && <InvalidURL />}
    </div>
  );
}

const styles = {
  root: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    backgroundColor: Color.purple_5,
    width: '600px',
    height: 100,
    padding: '10px 30px 0',
    transition: 'height 0.5s ease-in',
    display: 'grid',
    alignItems: 'center',
  },
};
const rootEl = document.getElementById('popup-root');

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<Boot />);
} else {
  console.error('Root DOM element not found (#popup-root)');
}
