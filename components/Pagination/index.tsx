import React from 'react';
import { ButtonGroup, Button, DivPx, Popover, Input } from '@moai/core';
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

type SelectDirection = 'prev' | 'next';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onSelect: (chosenPage: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages } = props;
  const shouldShowLeftArrow = currentPage > 1;
  const shouldShowRightArrow = currentPage < totalPages;

  const onClickButtonArrow = (direction: SelectDirection) => {
    const select = direction === 'next' ? currentPage + 1 : currentPage - 1;
    props?.onSelect(select);
  };

  return (
    <div className={styles.container}>
      {shouldShowLeftArrow && (
        <ButtonArrow
          direction="prev"
          onClick={() => onClickButtonArrow('prev')}
        />
      )}
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
      {shouldShowRightArrow && (
        <ButtonArrow
          direction="next"
          onClick={() => onClickButtonArrow('next')}
        />
      )}
    </div>
  );
};

export default Pagination;
