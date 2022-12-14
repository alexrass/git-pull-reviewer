import React from 'react';
import { Color } from '../../../common/styles';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingSpinner = () => {
  const [fade, enableFadeIn] = React.useState(false);
  const delayTimer = React.useRef<number>();

  React.useEffect(() => {
    delayTimer.current = setTimeout(() => enableFadeIn(true), 250);
    return () => clearTimeout(delayTimer.current);
  }, []);

  return (
    <span style={styles.loadingContainer(fade)}>
      <CircularProgress style={styles.spinner} />
    </span>
  );
};

const styles = {
  loadingContainer: (fadeIn: boolean): React.CSSProperties => ({
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    opacity: fadeIn ? 1 : 0,
    transition: `opacity 0.5s ease-in`,
    minHeight: fadeIn ? 100 : 0,
  }),
  spinner: {
    color: Color.purple_80,
  },
};
