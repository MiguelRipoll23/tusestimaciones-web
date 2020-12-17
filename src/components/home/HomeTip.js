import styled from 'styled-components';

import Styles from '../../Styles.js';

const HomeTipStyled = styled.div`
  background: #f1f1f2;
  border-radius: 8px;
  padding: 20px;
  color: hsl(240, 2.3%, 56.7%);
  margin: 0 '${Styles.MARGIN}px':
  align-items: center;
  display: flex;
  margin-top: 25px;
`;

const TipIcon = styled.div`
  float: left;
  font-size: 34px;
  margin-right: 18px;
  font-family: icons;
`;

const TipText = styled.div`
  line-height: 19px;
  color: rgba(0,0,0,.55);
`;

const HomeTip = (props) => {
  return (
    <HomeTipStyled>
      <TipIcon></TipIcon>
      <TipText>Usa el botón de compartir para añadir a la pantalla de inicio.</TipText>
    </HomeTipStyled>
  );
};

export default HomeTip;
