import React from 'react';
import Clip from 'copy-to-clipboard';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarOrigin } from '@mui/material/Snackbar/Snackbar';

export interface Props {
  title: string;
  size: number;
  lineChangeSummary: string;
  urgency: number;
}
export const Copy = ({ title, size, urgency, lineChangeSummary }: Props) => {
  const [showToast, setShowToast] = React.useState(false);

  const onCopy = React.useCallback(
    (showToast: boolean) => {
      const sizeStars = [
        ...new Array(size).fill('★'),
        ...new Array(5 - size).fill('☆'),
      ];
      const urgencyStars = [
        ...new Array(urgency).fill('★'),
        ...new Array(5 - urgency).fill('☆'),
      ];
      Clip(
        `${title}\n\nSize:${sizeStars.join(
          ''
        )} ${lineChangeSummary}\tUrgency: ${urgencyStars.join('')}`,
        {
          format: 'text/plain',
        }
      );
      setShowToast(showToast);
    },
    [size, urgency, lineChangeSummary, setShowToast]
  );

  const onAutoCopy = React.useCallback(() => onCopy(false), [onCopy]);
  const onManualCopy = React.useCallback(() => onCopy(true), [onCopy]);
  const onCloseToast = React.useCallback(
    () => setShowToast(false),
    [setShowToast]
  );

  React.useEffect(() => onAutoCopy(), [onAutoCopy]);

  return (
    <React.Fragment>
      <Button size="small" style={styles.button} onClick={onManualCopy}>
        Copy
      </Button>
      <Snackbar
        open={showToast}
        autoHideDuration={1000}
        message="Copied"
        onClose={onCloseToast}
        anchorOrigin={toastLocation}

      />
    </React.Fragment>
  );
};

const styles = {
  button: {
    marginTop: 10,
    width: '100%',
  },
};

const toastLocation: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};
