import { Fragment, useEffect, useState } from 'react';

import HomeSearchSubview from './subviews/HomeSearchSubview.js';
import HomeFavoritesSubview from './subviews/HomeFavoritesSubview.js';

import HomeMenu from '../../components/home/HomeMenu.js';

const HomeView = (props) => {
  const [subview, setSubview] = useState(props.view.data.subview);

  const Content = (props) => {
    switch (subview) {
      case 'favorites':
        return <HomeFavoritesSubview view={props.view} update={props.update} />;
  
      case 'search':
        return <HomeSearchSubview view={props.view} update={props.update} />;

      default:
        return null;
    }
  }

  const updateSubview = (subview) => {
    switch (subview) {
      case 'favorites':
        props.update.view({
          'id': 'home',
          'title': 'Favoritos',
          'header': true,
          'data': { 'push': true, 'subview': 'favorites' }
        });

        break;

      case 'map':
        props.view.title = 'Mapa';
        props.view.data.subview = 'map';

        // Duplicated state
        // for subview
        window.history.pushState(props.view, 'TUS Santander - Web App', '/mapa');

        props.update.view({
          'id': 'map',
          'title': 'Mapa',
          'header': false,
          'data': { 'push': true }
        });
        return;

      case 'search':
        props.update.view({
          'id': 'home',
          'title': 'Buscar',
          'header': true,
          'data': { 'push': true, 'subview': 'search' }
        });
        break;

      default:
        console.error('Unknown subview.');
        return;
    }

    setSubview(subview);
  }

  useEffect(() => {
    if (props.view.data.subview === undefined) {
      return;
    }

    setSubview(props.view.data.subview);
  }, [props.view.data.subview]);

  return (
    <Fragment>
      <Content view={props.view} subview={subview} update={props.update} />
      <HomeMenu subview={subview} updateSubview={updateSubview} />
    </Fragment>
  );
};

export default HomeView;
