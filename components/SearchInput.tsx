import React, { useEffect, useState } from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components';
import DropdownList from '../api/DropdownList';
import primaryTheme from '../theme/theme';

const { gray } = primaryTheme.colors;

interface SearchInputProps {
  width?: string;
}

const SearchInputComponent = styled(animated.div)<SearchInputProps>`
  background-color: ${gray};
  border-radius: 62px;
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  position: relative;
  width: ${(props) => (props.width ? props.width : '30%')};

  input {
    border: none;
    background: transparent;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
`;

const SearchInput = ({ width }: SearchInputProps, { ...props }) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.classList.contains('dropdown')) {
        setShowDropdown(false);
        setSearchInputValue('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  const handleSearchInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShowDropdown(true);
    setSearchInputValue(e.target.value);
  };

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <SearchInputComponent className="dropdown" width={width} {...props}>
      <img src="assets/Frame.png" alt="" className="dropdown" />
      <input
        className="dropdown"
        placeholder="Search for products..."
        value={searchInputValue}
        onChange={handleSearchInputOnChange}
        onClick={handleShowDropdown}
      ></input>

      {(searchInputValue || showDropdown) && (
        <DropdownList value={searchInputValue} />
      )}
    </SearchInputComponent>
  );
};

export default SearchInput;
