import { IconBtn } from '../icon.btn';
import { styled } from '@app/lib/styled';

export const Container = styled<{ align?: 'left' | 'right' }, typeof IconBtn>(
  IconBtn,
  (_, props) => [
    props.align === 'left' && {
      position: 'absolute',
      left: 0,
      zIndex: 1,
    },
    props.align === 'right' && {
      position: 'absolute',
      right: 0,
      zIndex: 1,
    },
  ],
);
