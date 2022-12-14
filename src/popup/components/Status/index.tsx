import React from 'react';
import { LoadingSpinner } from './Loading';

export interface Props {
  isLoading?: boolean;
}
export const Status = ({ isLoading }: Props) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return null;
};
