import { Fragment } from 'react';
import styled from 'styled-components';
import StyleUtils from '../utils/StyleUtils.js';

import Header from './Header.js';

const NavStyled = styled.nav`
  display: flex;
  min-height: 46px;
  align-items: center;

  border-bottom: 1px solid rgba(0, 0, 0, ${props => props.opacity});
`;

const NavLeftStyled = styled.div`
  float: left;
  width: 33.33%;
  display: flex;
  flex: 1;
`;

const NavCenterStyled = styled.div`
  float: left;
  width: 33.33%;
  text-align: center;
  display: flex;
  flex: 1;
`;

const NavRightStyled = styled.div`
  float: left;
  width: 33.33%;
  justify-content: flex-end;
  display: flex;
  flex: 1;
`;

const BackButtonStyled = styled.div`
  font-size: 15px;
  line-height: 24px;
  cursor: pointer;
  color: #007aff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 11px ${StyleUtils.MARGIN_LR};
  animation: fade-in .2s;
`;

const BackIconStyled = styled.span`
  float: left;
  margin-right: 8px;
  font-family: icons;
  font-size: 23px;
  line-height: 24px;
  width: 12.27px;
`;

const NavTitleStyled = styled.span`
  padding: 14px 0;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  width: 100%;
`;

const RefreshIconStyled = styled.span`
  padding: 11px ${StyleUtils.MARGIN_LR};
  cursor: pointer;
  font-family: icons;
  font-size: 24px;
  color: #007aff;
  line-height: 24px;
  position: relative;
  top: 1px;
  animation: fade-in .2s;
`;

const HeartIconStyled = styled.span`
  padding: 11px ${StyleUtils.MARGIN_LR};
  font-family: icons;
  font-size: 24px;
  color: #ff2d55;
  line-height: 24px;
  position: relative;
  top: -1px;
  padding-top: 14px;
  padding-bottom: 8px;
  animation: fade-in .2s;

  &:after {
    content: '${props => (props.heart > 1 ? '\\e905' : '\\e906')}';
  }
`;

const Nav = (props) => {
  const goBack = () => {
    window.history.back();
  };

  const refresh = () => {
    const newView = {...props.view};
    newView.data.push = false;
    newView.data.refresh = Date.now();

    props.update.view(newView);
  };

  const heart = () => {
    const newView = {...props.view};
    newView.data.push = false;
    newView.data.heart = Date.now();

    props.update.view(newView);
  };

  return (
    <Fragment>
      {props.nav.header === false &&
        <NavStyled>
          <NavLeftStyled>
            <BackButtonStyled onClick={goBack}>
              <BackIconStyled></BackIconStyled>
              <span>Atrás</span>
            </BackButtonStyled>
          </NavLeftStyled>
          <NavCenterStyled>
            <NavTitleStyled>{props.nav.title}</NavTitleStyled>
          </NavCenterStyled>
          <NavRightStyled>
            {props.nav.refresh && <RefreshIconStyled refresh={props.nav.refresh} onClick={refresh}></RefreshIconStyled>}
            {props.nav.heart > 0 && <HeartIconStyled heart={props.nav.heart} onClick={heart} />}
          </NavRightStyled>
        </NavStyled>
      }
      {props.nav.header && <Header text={props.nav.title} />}
    </Fragment>
  );
};

export default Nav;
