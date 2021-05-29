import React from 'react';
import { Footer, FooterProps } from '@elements';

export function FooterContainer({ children }: FooterProps): JSX.Element {
  return <Footer className='flex justify-between py-4 px-8'>{children}</Footer>;
}
