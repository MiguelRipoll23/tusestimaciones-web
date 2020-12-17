import styled from 'styled-components';

const TimeStyled = styled.div`
  display: inline-block;
  color: #fff;
  border-radius: 8px;
  line-height: 20px;
  font-size: 26px;
  padding-bottom: 22px;
  padding-left: 24px;
  padding-right: 24px;
  width: 100%;
  box-sizing: border-box;
`;

const Time1Styled = styled.div`
  display: inline-block;
  width: 105px;
`;

const Time2Styled = styled.div`
  display: inline-block;
  opacity: 0.6;
`;

const LineHeader = (props) => {
  const getTimeText = (minutes) => {
    let text = `- -`;

    if (minutes === 0) {
      text = '>>';
    }
    else if (minutes > 0) {
      text = `${minutes} MIN`;
    }
  
    return text;
  };

  return (
    <TimeStyled>
      <Time1Styled id="time1" data-time={props.time1}>{getTimeText(props.time1)}</Time1Styled>
      <Time2Styled>{getTimeText(props.time2)}</Time2Styled>
    </TimeStyled>
  );
};

export default LineHeader;
