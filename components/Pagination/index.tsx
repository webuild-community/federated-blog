import React, { useState, useEffect, useMemo } from 'react';
import { Button, Input } from '@moai/core';
import {
  HiOutlineChevronLeft as PrevIcon,
  HiOutlineChevronRight as NextIcon,
  HiOutlineChevronDoubleLeft as FirstIcon,
  HiOutlineChevronDoubleRight as LastIcon,
  HiOutlineCheck as CheckIcon
} from 'react-icons/hi';
import { RoundedPanel } from '../RoundedPane';

import styles from './Pagination.module.css';

type SelectDirection = 'prev' | 'next' | 'first' | 'last';

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

interface ButtonArrowProps {
  disabled: boolean;
  direction: SelectDirection;
  onClick: (direction: SelectDirection) => void;
}
const ButtonArrow = ({ disabled, direction, onClick }: ButtonArrowProps) => {
  return (
    <Button
      disabled={disabled}
      icon={buttonArrowTypes[direction].icon}
      iconLabel={buttonArrowTypes[direction].label}
      onClick={() => onClick(direction)}
    />
  );
};

const ArrowContainer = ({ disabled, direction, onClick }: ButtonArrowProps) => {
  return (
    <div className={styles.arrowContainer}>
      <ButtonArrow
        direction={direction}
        onClick={onClick}
        disabled={disabled}
      />
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

interface NavigateSectionProps {
  currentPage: number;
  totalPages: number;
  onSelect: (chosenPage: number) => void;
}
const NavigateSection = ({
  onSelect,
  currentPage,
  totalPages
}: NavigateSectionProps) => {
  const [inputVal, setInputVal] = useState<string>(currentPage.toString());
  const [focus, setFocus] = useState<boolean>(false);
  const [mouseOn, setMouseOn] = useState<boolean>(false);

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
    (mouseOn || focus) &&
    isValidPage(Number(inputVal.trim()), totalPages, currentPage);
  return (
    <div
      className={styles.navigateSection}
      onMouseEnter={() => setMouseOn(true)}
      onMouseLeave={() => setMouseOn(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <b>Trang</b>
      <div className={styles.inputContainer}>
        <Input
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
        highlight={allowSwitchPage}
      />
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onSelect: (chosenPage: number) => void;
}
const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onSelect } = props;
  const directions = useMemo(() => {
    const shouldShowLeftArrow = currentPage > 1;
    const shouldShowRightArrow = currentPage < totalPages;

    return {
      first: {
        direction: 'first' as SelectDirection,
        disabled: !shouldShowLeftArrow,
        onClick: () => onSelect(1)
      },
      prev: {
        direction: 'prev' as SelectDirection,
        disabled: !shouldShowLeftArrow,
        onClick: () => onSelect(currentPage + 1)
      },
      next: {
        direction: 'next' as SelectDirection,
        disabled: !shouldShowRightArrow,
        onClick: () => onSelect(currentPage + 1)
      },
      last: {
        direction: 'last' as SelectDirection,
        disabled: !shouldShowRightArrow,
        onClick: () => onSelect(totalPages)
      }
    };
  }, [currentPage, totalPages, onSelect]);

  return (
    <RoundedPanel transparent={true}>
      <div className={styles.container}>
        <div className={[styles.buttonGroup, styles.arrow1].join(' ')}>
          <ArrowContainer {...directions.first} />
          <ArrowContainer {...directions.prev} />
        </div>
        <NavigateSection
          currentPage={currentPage}
          totalPages={totalPages}
          onSelect={onSelect}
        />
        <div className={[styles.buttonGroup, styles.arrow2].join(' ')}>
          <ArrowContainer {...directions.next} />
          <ArrowContainer {...directions.last} />
        </div>
      </div>
    </RoundedPanel>
  );
};

export default Pagination;
