import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import StyleUtils from "../utils/StyleUtils.js";

import Header from "./Header.js";

const NavStyled = styled.nav`
  display: flex;
  min-height: 55px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, ${(props) => props.$borderOpacity});

  @media (prefers-color-scheme: dark) {
    & {
      border-bottom: 1px solid
        rgba(255, 255, 255, ${(props) => props.$borderOpacity});
    }
  }
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

const BackButtonStyled = styled.button`
  font-size: 15px;
  line-height: 24px;
  color: var(--color-blue);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 11px ${StyleUtils.MARGIN_LR};
  animation: fade-in 0.2s;
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

const Nav = (props) => {
  const [borderOpacity, setBorderOpacity] = useState(0);

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const mainElement = document.getElementsByTagName("main")[0];

    const handleScroll = () => {
      let opacity = 0;
      let scrollY = mainElement.scrollTop;

      if (scrollY > 50) {
        opacity = 0.15;
      } else {
        opacity = (scrollY * 0.15) / 50;
      }

      setBorderOpacity(opacity);
    };

    mainElement.addEventListener("scroll", handleScroll, { passive: true });

    return () => mainElement.removeEventListener("scroll", handleScroll);
  });

  return (
    <Fragment>
      {props.isHeader && (
        <Header text={props.titleText}>{props.children}</Header>
      )}
      {props.isHeader === false && (
        <NavStyled $borderOpacity={borderOpacity}>
          <NavLeftStyled>
            <BackButtonStyled onClick={goBack}>
              <BackIconStyled></BackIconStyled>
              <span>Atrás</span>
            </BackButtonStyled>
          </NavLeftStyled>
          <NavCenterStyled>
            <NavTitleStyled>{props.titleText}</NavTitleStyled>
          </NavCenterStyled>
          <NavRightStyled>{props.children}</NavRightStyled>
        </NavStyled>
      )}
    </Fragment>
  );
};

export default Nav;
