import React from 'react';
import {
  ButtonGroup,
  Button,
  DivPx,
  ButtonMenu,
  Popover,
  Input
} from '@moai/core';
import {
  HiOutlineChevronLeft as PrevIcon,
  HiOutlineChevronRight as NextIcon
} from 'react-icons/hi';
import styles from './Pagination.module.css';

const ButtonArrow = ({ direction, onClick }) => {
  return (
    <Button
      icon={direction == 'prev' ? PrevIcon : NextIcon}
      iconLabel={direction === 'prev' ? 'Previous' : 'Next'}
      onClick={onClick}
    />
  );
};

const ButtonMore = ({}) => {
  return (
    <Popover
      placement="top"
      target={(popover) => (
        <Button onClick={() => popover.toggle()} selected={popover.opened}>
          ...
        </Button>
      )}
      content={() => <GoToPagePopOver />}
    />
  );
};

const GoToPagePopOver = () => {
  return (
    <ButtonGroup skipChildTypeCheck>
      {[
        {
          fill: true,
          element: <Input placeholder="Page number" />
        },
        {
          fill: false,
          element: <Button>Go</Button>
        }
      ]}
    </ButtonGroup>
  );
};

const Pagination = ({ page, totalPages }) => {
  return (
    <div className={styles.container}>
      <ButtonArrow direction="prev" onClick={() => {}} />
      <DivPx size={30} />
      <ButtonGroup skipChildTypeCheck>
        {[
          {
            fill: false,
            element: <ButtonMore />
          }
        ]}
      </ButtonGroup>
      <DivPx size={30} />
      <ButtonArrow direction="next" onClick={() => {}} />
    </div>
  );
};

export default Pagination;
