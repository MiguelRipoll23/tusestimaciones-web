import styled from 'styled-components';

import Button from './Button.js';

const ErrorStyled = styled.div`
  text-align: center;
  position: fixed;
  top: calc(50% - (84px / 2));
  width: 100%;
  padding: 0 80px;
  box-sizing: border-box;
  display: inline-block;
  animation: fade-in .2s;
`;

const TextStyled = styled.div`
  margin-bottom: 14px;
`;

const Error = (props) => {
  return (
    <ErrorStyled>
      {props.error_text_lowercase === undefined && <TextStyled>{props.error_text.toUpperCase()}</TextStyled>}
      {props.error_text_lowercase !== undefined && <TextStyled>{props.error_text}</TextStyled>}
      <Button color='rgb(0, 122, 255)' onClick={props.retry_action}>{props.retry_text}</Button>
    </ErrorStyled>
  );
};

export default Error;
