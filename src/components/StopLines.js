import styled from "styled-components";

import StyleUtils from "../utils/StyleUtils.js";
import { getColor } from "../utils/LineUtils.js";

const StopLinesStyled = styled.div`
  margin-top: 7px;
  padding-left: ${(props) =>
    props.size === "small" ? "0" : `${StyleUtils.MARGIN_LR}`};
  padding-right: ${StyleUtils.MARGIN_LR};
  color: #fff;
  overflow-x: scroll;
  height: ${(props) => (props.size === "small" ? "28px" : "36px")};
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StopLineStyled = styled.button`
  color: #fff;
  line-height: 24px;
  background: ${(props) => props.color};
  font-size: ${(props) => (props.size === "small" ? "12px" : "18px")};
  margin-right: ${(props) => (props.size === "small" ? "5px" : "7px")};
  border-radius: 30px;
  min-width: ${(props) => (props.size === "small" ? "35px" : "48px")};
  text-align: center;
  display: inline-block;
  font-weight: normal;
  padding: ${(props) => (props.size === "small" ? "2px 0" : "6px 0")};
  cursor: pointer;

  &:disabled {
    opacity: 0.1;
    cursor: default;
  }

  &:last-child {
    margin-right: 0;
  }

  @media (prefers-color-scheme: dark) {
    &:disabled {
      background: #fff;
      color: #000;
    }
  }
`;

const isDisabled = (label, estimations) => {
  if (estimations === undefined) {
    return true;
  }

  for (const item of estimations) {
    const [etaLabel] = item;

    if (label === etaLabel) {
      return false;
    }
  }

  return true;
};

const handleOnClick = (label) => {
  const labelElement = document.querySelector(`#label-${label}`);
  labelElement?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const StopLines = (props) => {
  return (
    <StopLinesStyled size={props.size}>
      {props.list.map((label, i) => {
        return (
          <StopLineStyled
            key={i}
            size={props.size}
            color={getColor(label, "string")}
            disabled={isDisabled(label, props.estimations)}
            onClick={() => handleOnClick(label)}
          >
            {label}
          </StopLineStyled>
        );
      })}
    </StopLinesStyled>
  );
};

export default StopLines;
