import styled from 'styled-components';

import StyleUtils from '../utils/StyleUtils.js';

const HeaderStyled = styled.div`
  font-weight: bold;
  font-size: 35px;
  padding-top: 46px;
  padding-left: ${StyleUtils.MARGIN_LR};
  padding-right: ${StyleUtils.MARGIN_LR};
  padding-bottom: 5px;

  @media (min-width: 500px) {
    display: none;
  }
`;

const Header = (props) => {
  return (
    <HeaderStyled>{props.text}</HeaderStyled>
  );
};

export default Header;
