import { Fragment } from 'react';
import styled from 'styled-components';

const NextStopsStyled = styled.ul`
  background: ${props => props.color};
  list-style: none;
  padding-left: 55px;
  padding-right: 24px;
  padding-bottom: 11px;
  margin: 0;
  border-radius: 0 0 30px 30px;
  padding-top: 22px;

  @media (prefers-color-scheme: dark) {
    background: #1c1b20;
  }
`;

const NextStopStyled = styled.li`
  position: relative;
  padding-bottom: 22px;
  font-size: 22px;
  animation: fade-in .2s;

  &:before {
    content: '';
    position: absolute;
    left: -23.8px;
    border-left: 2px solid #fff;
    width: 1px;
    height: 100%;
  }

  & span {
    line-height: 20px;
    position: relative;
    top: -5px;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: -32px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: ${props => props.color};
  }

  @media (prefers-color-scheme: dark) {
    &:before {
      border-left: 2px solid #fff;
    }

    &:after {
      border: 2px solid #fff;
      background: #1c1b20;
    }
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:last-child:before {
    display: none;
  }
`;

const NextItems = (props) => {
  return (
    <Fragment>
      <NextStopsStyled color={props.color}>
        {props.list.map((item, i) => {
          return <NextStopStyled key={i} color={props.color}>
            <span>{item[1]}</span>
          </NextStopStyled>
        })}
      </NextStopsStyled>
    </Fragment>
  );
};

export default NextItems;
