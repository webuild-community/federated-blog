import React, { useState } from 'react';
import { ButtonGroup, Button, Popover, Input } from '@moai/core';
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

const ButtonMore = (props) => {
  const { currentPage, totalPages } = props;
  return (
    <Popover
      TargetWrapper={Popover.targetWrappers.block}
      placement="top"
      target={(popover) => (
        <Button
          fill
          highlight={isInMiddle(currentPage, totalPages)}
          onClick={() => popover.toggle()}
          selected={popover.opened}
        >
          ...
        </Button>
      )}
      content={() => <GoToPagePopOver {...props} />}
    />
  );
};

const isInMiddle = (currentPage, totalPages): boolean => {
  return currentPage > 2 && currentPage < totalPages - 2;
};

const Center = ({ onSelect, items, currentPage, totalPages }) => {
  return (
    <div className={styles.buttonGroupCenter}>
      <ButtonGroup skipChildTypeCheck fill>
        {items.map((item) => {
          return item === 'opt' ? (
            <ButtonMore
              key={item}
              onSelect={onSelect}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          ) : (
            <Button
              fill
              key={item}
              highlight={currentPage === item}
              onClick={() => onSelect(item)}
            >
              {item}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
};

const GoToPagePopOver = ({ onSelect, totalPages }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const submit = () => {
    const submitValue = Number(inputVal.trim());
    if (typeof submitValue !== 'number') {
      // TODO: show warning invalid value
      return;
    }
    if (submitValue < 1 || submitValue > totalPages) {
      // TODO: show warning invalid value
      return;
    }
    onSelect(submitValue);
  };
  const onClickHandler = () => {
    submit();
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
    }
  };
  return (
    <ButtonGroup skipChildTypeCheck>
      {[
        {
          fill: true,
          element: (
            <Input
              placeholder="Page number"
              value={inputVal}
              setValue={setInputVal}
              onKeyDown={onKeyDownHandler}
            />
          )
        },
        {
          fill: false,
          element: <Button onClick={onClickHandler}>Go</Button>
        }
      ]}
    </ButtonGroup>
  );
};

const ArrowContainer = ({ show, direction, onClick }) => {
  return (
    <div className={styles.arrowContainer}>
      {show && <ButtonArrow direction={direction} onClick={onClick} />}
    </div>
  );
};

const generateCenterItems = (totalPages: number): (string | number)[] => {
  return [1, 2, 'opt', totalPages - 1, totalPages];
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
      <div className={styles.numberGroup}>
        <b>Trang {currentPage}</b> / {totalPages}
      </div>
      <div className={styles.buttonGroup}>
        <ArrowContainer
          show={shouldShowLeftArrow}
          direction={'prev'}
          onClick={() => onClickButtonArrow('prev')}
        />
        <Center
          items={generateCenterItems(totalPages)}
          onSelect={props.onSelect}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <ArrowContainer
          show={shouldShowRightArrow}
          direction={'next'}
          onClick={() => onClickButtonArrow('next')}
        />
      </div>
    </div>
  );
};

export default Pagination;
