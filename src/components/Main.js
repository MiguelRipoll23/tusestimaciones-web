import styled from 'styled-components';

import HomeView from '../views/home/HomeView.js';
import MapView from '../views/map/MapView.js';
import EstimationsStopView from '../views/estimations-stop/EstimationsStopView.js';
import EstimationsLineView from '../views/estimations-line/EstimationsLineView.js';
import RouteLineView from '../views/route-line/RouteLineView.js';

const Content = (props) => {
  switch (props.view.id) {
    case 'home':
      return <HomeView view={props.view} update={props.update} />;
      
    case 'map':
      return <MapView view={props.view} update={props.update} />;

    case 'estimations_stop':
      return <EstimationsStopView view={props.view} update={props.update} />;

    case 'estimations_line':
      return <EstimationsLineView view={props.view} update={props.update} />;

    case 'route_line':
      return <RouteLineView view={props.view} update={props.update} />;

    default:
      return null;
  }
}

const MainStyled = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const Main = (props) => {
  return (
    <MainStyled>
      <Content view={props.view} update={props.update} />
    </MainStyled>
  );
};

export default Main;
