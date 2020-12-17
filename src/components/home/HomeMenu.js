import styled from 'styled-components';

const HomeMenuStyled = styled.div`
  background: #f7f7f7;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  align-items: center;
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 9;

  @media (prefers-color-scheme: dark) {
    background: #1c1b20;
    border-top: none;
  }
`;

const Item = styled.div`
  float: left;
  width: 100px;
  text-align: center;
  flex: 1;
  cursor: pointer;
  padding-top: 20px;
  padding-bottom: 34px;

  color: ${props => (props.selected ? '#007aff' : 'rgba(0, 0, 0, .55);')};

  @media (prefers-color-scheme: dark) {
    color: ${props => (props.selected ? '#007aff' : 'rgba(255, 255, 255, .55);')};
  }
`;

const ItemIcon = styled.div`
  font-size: 34px;
  font-family: icons;
  margin-bottom: 5px;
`;

const ItemText = styled.div`
  line-height: 19px;
`;

const HomeMenu = (props) => {
  const loadFavoritesSubview = () => {
    props.updateSubview('favorites');
  }

  const loadMapSubview = () => {
    props.updateSubview('map');
  }

  const loadSearchSubview = () => {
    props.updateSubview('search');
  }

  return (
    <HomeMenuStyled>
      <Item selected={props.subview === 'favorites'} onClick={loadFavoritesSubview}>
        <ItemIcon></ItemIcon>
        <ItemText>Favoritos</ItemText>
      </Item>
      <Item selected={props.subview === 'map'} onClick={loadMapSubview}>
        <ItemIcon></ItemIcon>
        <ItemText>Mapa</ItemText>
      </Item>
      <Item selected={props.subview === 'search'} onClick={loadSearchSubview}>
        <ItemIcon></ItemIcon>
        <ItemText>Buscar</ItemText>
      </Item>
    </HomeMenuStyled>
  );
};

export default HomeMenu;
