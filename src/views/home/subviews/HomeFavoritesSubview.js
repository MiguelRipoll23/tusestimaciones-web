import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

import { useView } from "../../../contexts/ViewContext.js";
import * as ViewConstants from "../../../constants/ViewConstants.js";

import StyleUtils from "../../../utils/StyleUtils.js";
import { getFavorites, saveFavorites } from "../../../utils/FavoriteUtils.js";

import Error from "../../../components/Error.js";
import HomeDesktop from "../../../components/home/HomeDesktop.js";

const ViewportStyled = styled.div`
  position: relative;
  height: calc(100% - 91px + env(safe-area-inset-bottom));
  overflow-y: auto;
  padding-top: 3px;
  padding-bottom: 14px;
  box-sizing: border-box;
`;

const FavoriteStyled = styled.div`
  padding: 13px 22px;
  background: linear-gradient(to right, #ff2e56, #e0002b);
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  box-sizing: border-box;
  line-height: 27px;
  border-radius: 14px;
  margin: 0 ${StyleUtils.MARGIN_LR};
  margin-bottom: 8px;
  overflow: hidden;
  font-weight: 700;
  min-height: 53px;

  &.over {
    padding: 13px 18px;
    border: 2px dashed #ff2e56;
    background: none;
    color: #ff2e56;
  }

  @media (prefers-color-scheme: dark) {
    background: #1c1b20;
  }
`;

const HomeFavoritesSubview = (props) => {
  const { enableEditLink, updateTitleText, editMode } = props;
  const { setViewId, setViewIdWithData } = useView();

  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Drag & Drop
  let draggingElement = null;

  const handleDragEnter = (event) => {
    event.target.classList.add("over");
  };

  const handleDragLeave = (event) => {
    event.target.classList.remove("over");
  };

  const handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", event.target.innerText);
    draggingElement = event.target;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    return false;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const targetElement = event.target;
    targetElement.classList.remove("over");

    if (draggingElement === targetElement) {
      return;
    }

    const favoritesOrdered = [...favorites];

    const sourceIndex = [...draggingElement.parentNode.children].indexOf(
      draggingElement
    );

    const targetIndex = [...draggingElement.parentNode.children].indexOf(
      targetElement
    );

    favoritesOrdered[sourceIndex] = favorites[targetIndex];
    favoritesOrdered[targetIndex] = favorites[sourceIndex];

    setFavorites(favoritesOrdered);
    saveFavorites(favoritesOrdered);

    return false;
  };

  // View handlers
  const loadMapSubview = () => {
    setViewId(ViewConstants.VIEW_ID_MAP);
  };

  const loadEstimationsStopView = (favorite) => {
    if (editMode) {
      return;
    }

    setViewIdWithData(ViewConstants.VIEW_ID_ESTIMATIONS_STOP, {
      stopId: favorite.stop_id,
      stopName: favorite.stop_name,
    });
  };

  // Favorites
  useEffect(() => {
    const favorites = getFavorites();

    if (favorites.length === 0) {
      setError(true);
    } else {
      enableEditLink(true);
      setFavorites(favorites);
    }
  }, [enableEditLink]);

  // Mount
  useEffect(() => {
    updateTitleText(ViewConstants.SUB_VIEW_TITLE_FAVORITES);
  }, [updateTitleText]);

  return (
    <Fragment>
      <ViewportStyled>
        {error && (
          <Error
            error_text="Usa el mapa o el buscador para añadir paradas"
            error_text_lowercase={true}
            retry_text="Ver paradas cercanas"
            retry_action={loadMapSubview}
            animation="none"
          />
        )}
        {favorites.map((favorite, i) => {
          return (
            <FavoriteStyled
              key={i}
              draggable={editMode}
              onClick={() => loadEstimationsStopView(favorite)}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {favorite.stop_name}
            </FavoriteStyled>
          );
        })}
      </ViewportStyled>
      <HomeDesktop />
    </Fragment>
  );
};

export default HomeFavoritesSubview;
