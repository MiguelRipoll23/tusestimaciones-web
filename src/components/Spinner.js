import styled from 'styled-components';

const SpinnerStyled = styled.svg`
  position: fixed;
  top: calc(50% - 32.5px);
  left: calc(50% - 32.5px);
  animation: rotator 0.6s linear infinite;
`;

const Circle = styled.circle`
  stroke: #000;
  stroke-width: 2px;
  stroke-dasharray: 200;
  stroke-dashoffset: 100;
  transform-origin: center;

  @media (prefers-color-scheme: dark) {
    stroke: #fff;
  }
`;

const Spinner = (props) => {
  return (
    <SpinnerStyled className="spinner" width="65px" height="65px" viewBox="0 0 66 66">
      <Circle fill="none" stroke-width="5" stroke-linecap="round" cx="33" cy="33" r="30" />
    </SpinnerStyled>
  );
};

export default Spinner;
