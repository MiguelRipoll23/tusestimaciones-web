import { Fragment, useState } from 'react';

import Nav from './Nav.js';
import Main from './Main.js';

const initialView = {
  'id': 'home',
  'title': 'Favoritos',
  'header': true,
  'data': { 'push': false, 'subview': 'favorites' }
};

const initialNav = {
  'title': 'Favoritos',
  'header': true,
  'refresh': false,
  'heart': 0
};

const App = () => {
  const [nav, setNav] = useState(initialNav);
  const [view, setView] = useState(initialView);

  // Updater
  const update = {
    'nav': (newNav) => {
      if (newNav.title === undefined) {
        newNav.title = nav.title;
      }

      if (newNav.header === undefined) {
        newNav.header = nav.header;
      }

      if (newNav.title === undefined) {
        newNav.title = nav.title;
      }

      if (newNav.refresh === undefined) {
        newNav.refresh = nav.refresh;
      }

      if (newNav.heart === undefined) {
        newNav.heart = nav.heart;
      }

      console.log('Nav', newNav);
      setNav(newNav);
    },

    'view': (newView) => {
      // Nav
      const newNav = {...nav};
      
      if (!('refresh' in newView.data) && !('heart' in newView.data)) {
        newNav.refresh = false;
        newNav.heart = 0;
      }

      if (newView.title !== undefined) {
        newNav.title = newView.title;
      }

      if (newView.header !== undefined) {
        newNav.header = newView.header;
      }

      if (newView.id === undefined) {
        newView.id = view.id;
      }
  
      if (newView.data === undefined) {
        newView.data = view.data;
      }
  
      console.log('View', newView);
      
      setNav(newNav);
      setView(newView);
    }
  };

  // History
  window.onpopstate = (event) => {
    const state = event.state;

    if (state === null) {
      update.view(initialView);
      return;
    }

    state.data.push = false;
    console.log('History', state);
    
    update.view(state);
  };

  return (
    <Fragment>
      <Nav view={view} nav={nav} update={update} />
      <Main view={view} update={update} />
    </Fragment>
  );
}

export default App;
