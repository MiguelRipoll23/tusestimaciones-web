import styled from 'styled-components';

import StyleUtils from '../../utils/StyleUtils.js';

const EstimationsCardStyled = styled.div`
  border-radius: 30px;
  margin-top: 14px;
  margin-left: ${StyleUtils.MARGIN_LR};
  margin-right: ${StyleUtils.MARGIN_LR};
  cursor: pointer;
  background: #fff;
  color: #fff;
  background: linear-gradient(to top, ${props => props.colors[0]}, ${props => props.colors[1]});
  animation: fade-in .2s;

  @media (prefers-color-scheme: dark) {
    background: #1c1b20;
  }

  &:last-child {
    margin-bottom: 14px;
  }
`;

const EstimationsCard = (props) => {
  return (
    <EstimationsCardStyled colors={props.colors} onClick={props.onClick}>
      {props.children}
    </EstimationsCardStyled>
  );
};

export default EstimationsCard;
