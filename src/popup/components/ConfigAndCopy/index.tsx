import React from 'react';
import { Copy } from './Copy';
import Rating from '@mui/material/Rating';
import { PullRequestData } from '../../../common/types';

export interface Props {}
export const ConfigAndCopy = ({
  title,
  linesAdded,
  linesRemoved,
  linesChanged,
  href,
}: Props & PullRequestData) => {
  const [size, setSize] = React.useState(getDefaultSize(linesChanged));
  const [urgency, setUrgency] = React.useState(1);

  const onChangeSize = React.useCallback(
    (event: React.SyntheticEvent, newSize: number | null) =>
      newSize && setSize(Math.max(1, newSize)),
    [setSize]
  );
  const onChangeUrgency = React.useCallback(
    (event: React.SyntheticEvent, newUrgency: number | null) =>
      newUrgency && setUrgency(Math.max(1, newUrgency)),
    [setUrgency]
  );

  const [_mainTitle, _subTitle] = title.split('·');
  const mainTitle = _mainTitle.replace(/by\s.*$/, '');
  const subTitle = `(PR ${_subTitle.replace(/Pull Request/, '').trim()})`;
  const lineChangeBlurb = `(+${(linesAdded ?? 0).toString()},-${(
    linesRemoved ?? 0
  ).toString()})`;

  return (
    <div>
      <div>
        <div style={styles.title}>
          {mainTitle}
          <span style={styles.subTitle}>{subTitle}</span>
        </div>
      </div>
      <div style={styles.ratingsContainer}>
        <div style={styles.rating}>
          <div>Size:</div>
          <Rating max={5} value={size} onChange={onChangeSize} />
          <span>{lineChangeBlurb}</span>
        </div>
        <div style={styles.rating}>
          <div>Urgency:</div>
          <Rating max={5} value={urgency} onChange={onChangeUrgency} />
        </div>
      </div>
      <Copy
        size={size}
        lineChangeSummary={lineChangeBlurb}
        title={`[${mainTitle} ${subTitle}](${href})`}
        urgency={urgency}
      />
    </div>
  );
};

// Lines | Stars
// < 5   | *
// < 30  | **
// < 60  | ***
// < 100 | ****
// > 100 | *****
function getDefaultSize(lines: number): number {
  if (lines <= 5) {
    return 1;
  } else if (lines <= 30) {
    return 2;
  } else if (lines <= 60) {
    return 3;
  } else if (lines <= 100) {
    return 4;
  } else {
    return 5;
  }
}

const styles: Record<string, React.CSSProperties> = {
  title: {
    fontSize: 14,
    lineHeight: 1.2,
    display: 'grid',
    gap: 4,
    alignItems: 'center',
    marginBottom: 4,
    gridTemplateColumns: 'auto min-content',
  },
  subTitle: {
    fontSize: 12,
    whiteSpace: 'nowrap',
  },
  ratingsContainer: {
    display: 'flex',
    gap: 30,
    marginTop: 10,
  },
  rating: {
    fontSize: 12,
    fontWeight: 'normal',
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    gap: 5,
  },
};
