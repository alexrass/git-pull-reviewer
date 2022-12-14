import React from 'react';
import { ConfigAndCopy } from '../ConfigAndCopy';
import type { PullRequestData } from '../../../common/types';

export interface Props {
  data: PullRequestData
}
export const App = ({ data }: Props) => {
  return (
    <ConfigAndCopy
      title={data.title}
      linesChanged={data.linesChanged}
      linesAdded={data.linesAdded}
      linesRemoved={data.linesRemoved}
      href={data.href}
    />
  );
}
