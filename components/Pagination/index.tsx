import React, { useState, useEffect } from 'react';
import { Button, Input } from '@moai/core';
import {
  HiOutlineChevronLeft as PrevIcon,
  HiOutlineChevronRight as NextIcon,
  HiOutlineChevronDoubleLeft as FirstIcon,
  HiOutlineChevronDoubleRight as LastIcon,
  HiOutlineCheck as CheckIcon
} from 'react-icons/hi';
import styles from './Pagination.module.css';

const buttonArrowTypes = {
  prev: {
    icon: PrevIcon,
    label: 'Tới trang trước'
  },
  next: {
    icon: NextIcon,
    label: 'Tới trang sau'
  },
  first: {
    icon: FirstIcon,
    label: 'Tới trang đầu'
  },
  last: {
    icon: LastIcon,
    label: 'Tới trang cuối'
  }
};

const ButtonArrow = ({ direction, onClick }) => {
  return (
    <Button
      icon={buttonArrowTypes[direction].icon}
      iconLabel={buttonArrowTypes[direction].label}
      onClick={() => onClick(direction)}
    />
  );
};

const ArrowContainer = ({ show, direction, onClick }) => {
  return (
    <div className={styles.arrowContainer}>
      {show && <ButtonArrow direction={direction} onClick={onClick} />}
    </div>
  );
};

// Validate number-converted value of input in NavigateSection
const isValidPage = (
  val: number,
  totalPages: number,
  currentPage: number
): boolean => {
  if (
    typeof val !== 'number' || // should be number
    val === currentPage || // should not equal current page
    val < 1 ||
    val > totalPages // should be in correct range of pages
  ) {
    return false;
  }
  return true;
};

const NavigateSection = ({ onSelect, currentPage, totalPages }) => {
  const [inputVal, setInputVal] = useState<string>(currentPage);
  const [focusInput, setFocusInput] = useState<boolean>(false);

  useEffect(() => {
    setInputVal(String(currentPage));
  }, [currentPage]);

  const submit = () => {
    const submitValue = Number(inputVal.trim());
    // TODO: show warning invalid value
    if (!isValidPage(submitValue, totalPages, currentPage)) return;
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
  const allowSwitchPage =
    focusInput && isValidPage(Number(inputVal.trim()), totalPages, currentPage);
  return (
    <div className={styles.navigateSection}>
      <b>Trang</b>
      <div className={styles.inputContainer}>
        <Input
          onFocus={() => setFocusInput(true)}
          onBlur={() => setFocusInput(false)}
          value={inputVal}
          setValue={setInputVal}
          onKeyDown={onKeyDownHandler}
        />
      </div>
      <b> / {totalPages}</b>
      <Button
        onClick={onClickHandler}
        icon={CheckIcon}
        iconLabel=""
        disabled={!allowSwitchPage}
      />
    </div>
  );
};

type SelectDirection = 'prev' | 'next' | 'first' | 'last';

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
    let select: number;
    switch (direction) {
      case 'next':
        select = currentPage + 1;
        break;
      case 'prev':
        select = currentPage - 1;
        break;
      case 'first':
        select = 1;
        break;
      case 'last':
        select = totalPages;
      default:
    }
    props?.onSelect(select);
  };

  return (
    <div className={styles.container}>
      <div className={[styles.buttonGroup, styles.arrow1].join(' ')}>
        <ArrowContainer
          show={shouldShowLeftArrow}
          direction={'first'}
          onClick={onClickButtonArrow}
        />
        <ArrowContainer
          show={shouldShowLeftArrow}
          direction={'prev'}
          onClick={onClickButtonArrow}
        />
      </div>
      <NavigateSection
        currentPage={currentPage}
        totalPages={totalPages}
        onSelect={props?.onSelect}
      />
      <div className={[styles.buttonGroup, styles.arrow2].join(' ')}>
        <ArrowContainer
          show={shouldShowRightArrow}
          direction={'next'}
          onClick={onClickButtonArrow}
        />
        <ArrowContainer
          show={shouldShowRightArrow}
          direction={'last'}
          onClick={onClickButtonArrow}
        />
      </div>
    </div>
  );
};

export default Pagination;
