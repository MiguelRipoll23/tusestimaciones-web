import { Fragment, useState } from "react";

import { useView } from "../../contexts/ViewContext.js";
import * as ViewConstants from "../../constants/ViewConstants.js";

import Nav from "../../components/Nav.js";
import Content from "../../components/Content.js";
import HomeSearchSubview from "./subviews/HomeSearchSubview.js";
import HomeFavoritesSubview from "./subviews/HomeFavoritesSubview.js";

import styled from "styled-components";

import HomeMenu from "../../components/home/HomeMenu.js";

const EditLinkStyled = styled.div`
  cursor: pointer;
  color: rgb(0, 122, 255);
  align-self: flex-end;
`;

const HomeView = (props) => {
  const { subViewId } = useView();

  const [titleText, setTitleText] = useState(
    ViewConstants.SUB_VIEW_TITLE_FAVORITES
  );

  const updateTitleText = (newTitleText) => {
    setTitleText(newTitleText);
  };

  const [editMode, setEditMode] = useState(false);

  const SelectedOptions = (props) => {
    // eslint-disable-next-line default-case
    switch (subViewId) {
      case ViewConstants.SUB_VIEW_ID_FAVORITES:
        return (
          <EditLinkStyled onClick={toggleEditMode}>
            {editMode ? "Hecho" : "Editar"}
          </EditLinkStyled>
        );
    }
  };

  const SelectedContent = (props) => {
    switch (subViewId) {
      case ViewConstants.SUB_VIEW_ID_FAVORITES:
        return <HomeFavoritesSubview updateTitleText={props.updateTitleText} />;

      case ViewConstants.SUB_VIEW_ID_MAP:
        return null;

      case ViewConstants.SUB_VIEW_ID_SEARCH:
        return <HomeSearchSubview updateTitleText={props.updateTitleText} />;

      default:
        throw new Error(
          `No case for subview identifier ${subViewId} found in HomeView`
        );
    }
  };

  const toggleEditMode = () => {
    setEditMode(editMode ? false : true);
  };

  return (
    <Fragment>
      <Nav isHeader={true} titleText={titleText}>
        <SelectedOptions />
      </Nav>
      <Content>
        <SelectedContent
          updateTitleText={updateTitleText}
          editMode={editMode}
        />
        <HomeMenu />
      </Content>
    </Fragment>
  );
};

export default HomeView;
