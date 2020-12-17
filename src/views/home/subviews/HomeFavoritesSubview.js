import { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

import StyleUtils from '../../../utils/StyleUtils.js';
import { getFavorites } from '../../../utils/FavoriteUtils.js';

import Error from '../../../components/Error.js';
import HomeDesktop from '../../../components/home/HomeDesktop.js';

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
  animation: fade-in .2s;

  @media (prefers-color-scheme: dark) {
    background: #1c1b20;
  }
`;

const HomeFavoritesSubview = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const loadMapSubview = () => {
    props.update.view({
      'id': 'map',
      'title': 'Mapa',
      'header': false,
      'data': { 'push': true }
    });
  }

  const loadEstimationsStopView = (favorite) => {
    props.update.view({
      'id': 'estimations_stop',
      'title': favorite.stop_name,
      'header': false,
      'data': {
        'push': true,
        'id': favorite.stop_id,
        'name': favorite.stop_name
      }
    });
  };

  useEffect(() => {
    if (loading === false) {
      return;
    }

    // History
    if (props.view.data.push) {
      window.history.pushState(props.view, 'TUS Santander - Web App', '/');
    }

    // Data
    const favorites = getFavorites();

    if (favorites.length === 0) {
      setError(true);
    }
    else {
      setFavorites(favorites);
    }

    // Loaded
    setLoading(false);
  }, [loading, props]);

  return (
    <Fragment>
      {error && <Error error_text="Usa el mapa o el buscador para añadir paradas" error_text_lowercase={true} retry_text="Ver paradas cercanas" retry_action={loadMapSubview} />}
      {favorites.map((favorite, i) => {
        return <FavoriteStyled key={i} onClick={() => loadEstimationsStopView(favorite)}>{favorite.stop_name}</FavoriteStyled>
      })}
      <HomeDesktop />
    </Fragment>
  );
};

export default HomeFavoritesSubview;
