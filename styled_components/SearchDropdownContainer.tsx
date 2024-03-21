import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { gray } = primaryTheme.colors;
const { headerFont } = primaryTheme.fonts;

export const SearchDropdownContainer = styled.div`
  background-color: white;
  align-items: flex-start;
  border-radius: 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  padding: 20px 15px;
  position: absolute;
  top: 48px;
  z-index: 1;

  -webkit-box-shadow: 0px 0px 32px -12px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 32px -12px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 32px -12px rgba(66, 68, 90, 1);

  p:first-of-type {
    text-transform: uppercase;
  }

  .dropdown {
    align-items: flex-start;
    transition: 0.4s ease;
    &:hover {
      background-color: ${gray};
      cursor: pointer;
    }
  }

  .search-dropdown-item {
    align-items: center;
    display: flex;
    gap: 10px;
    padding: 15px;
    flex-wrap: nowrap;
    justify-content: space-around;
    border-radius: 20px;
    position: relative;
    z-index: 2;
    width: 100%;

    .search_dropdown_item_details {
      background-color: transparent;
      p {
        background-color: transparent;
      }
      .search_dropdown_item_title {
        font-weight: 800;
      }
    }
    .search_dropdown_item_img {
      display: flex;
      padding: 10px;
      border-radius: 20px;
      justify-content: center;
      background-color: white;
      height: 55px;
      width: 65px;
    }
    img {
      object-fit: contain;
      max-height: 40px;
      max-width: 50px;
    }

    &:hover {
      background-color: ${gray};
      cursor: pointer;
    }

    &::after {
      content: '';
      background-color: ${gray};
      height: 1px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .title {
    background-color: transparent;
    font-family: ${headerFont};
    padding-left: 10px;
  }

  .search_dropdown_container {
    background-color: rgb(245, 239, 239);
    border: 0.5px solid black;
    border-top: none;
    font-size: $dropdown_font_size;
    padding: 5px;
    position: absolute;
    width: 250px;

    :hover {
      background-color: rgb(2, 2, 2, 0.3);
    }
  }

  @media (max-width: 600px) {
    .search_dropdown_item_details {
      p {
        font-size: 14px;
      }
    }
  }
`;
