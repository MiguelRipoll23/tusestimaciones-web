import styled from 'styled-components';

const LineHeaderStyled = styled.div`
  padding-top: 18px;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 30px;
`;

const LineLabelStyled = styled.span`
  font-size: 32px;
  display: block;
`;

const LineDestinationStyled = styled.span`
  font-size: 22px;
`;

const LineHeader = (props) => {
  return (
    <LineHeaderStyled>
      <LineLabelStyled>{props.label}</LineLabelStyled>
      <LineDestinationStyled>{props.destination.toUpperCase()}</LineDestinationStyled>
    </LineHeaderStyled>
  );
};

export default LineHeader;
