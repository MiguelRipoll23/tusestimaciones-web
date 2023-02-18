import { Fragment, useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { useView } from "../../contexts/ViewContext.js";

import ApiUtils from "../../utils/ApiUtils.js";

import Content from "../../components/Content.js";
import Nav from "../../components/Nav.js";
import Spinner from "../../components/Spinner.js";
import Error from "../../components/Error.js";
import StopLines from "../../components/StopLines.js";

const RouteLineViewStyled = styled.ul`
  list-style: none;
  padding-left: 45px;
  margin-top: 14px;
  margin-bottom: 28px;
`;

const StopStyled = styled.li`
  line-height: 20px;
  position: relative;
  padding-bottom: 12px;
  font-size: 18px;
  font-weight: bold;
  animation: fade-in 0.2s;

  & span {
    max-width: 200px;
  }

  &:before {
    content: "";
    position: absolute;
    left: -22.8px;
    border-left: 3px solid ${(props) => props.color};
    width: 1px;
    height: 100%;
  }

  &:after {
    content: "";
    position: absolute;
    left: -31px;
    top: 0px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 3px solid ${(props) => props.color};
    background: ${(props) => (props.active ? props.color : "#fff")};
  }

  @media (prefers-color-scheme: dark) {
    &:after {
      background: ${(props) => (props.active ? props.color : "#000")};
    }
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:last-child:before {
    display: none;
  }
`;

const RouteLineView = (props) => {
  const { data } = useView();
  const { stopId, lineLabel, lineDestination, color } = data;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);

  const getStops = useCallback(() => {
    // Reset
    setError(false);
    setResults([]);

    const query = `?stopId=${stopId}&lineLabel=${lineLabel}&lineDestination=${lineDestination}`;

    fetch(ApiUtils.API_HOST + ApiUtils.API_PATH_JSON_ROUTE + query)
      .then((response) => {
        if (response.ok === false) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        // Check if response is empty
        if (data.length === 0) {
          throw new Error("Empty response");
        }

        setResults(data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [stopId, lineLabel, lineDestination]);

  // Check if current stop
  const isActive = (itemStopId) => {
    if (itemStopId === stopId) {
      return true;
    }

    return false;
  };

  // Scroll
  useEffect(() => {
    document
      .querySelector("li[data-active='true']")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [results]);

  // Refresh
  const refreshContent = () => {
    setLoading(true);
    getStops();
  };

  // Mount
  useEffect(() => {
    getStops();
  }, [getStops]);

  return (
    <Fragment>
      <Nav
        isHeader={false}
        titleText={`${lineLabel} ${lineDestination.toUpperCase()}`}
      />
      <Content>
        {loading && <Spinner />}
        {error && (
          <Error
            error_text="No disponible"
            retry_text="Volver a intentar"
            retry_action={refreshContent}
          />
        )}
        <RouteLineViewStyled>
          {results.map((result, i) => {
            return (
              <StopStyled
                key={i}
                color={color}
                active={isActive(result[0])}
                data-active={isActive(result[0])}
              >
                <span>{result[1]}</span>
                {result[2].length > 0 && (
                  <StopLines list={result[2]} size="small" />
                )}
              </StopStyled>
            );
          })}
        </RouteLineViewStyled>
      </Content>
    </Fragment>
  );
};

export default RouteLineView;
