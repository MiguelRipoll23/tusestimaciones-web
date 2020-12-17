import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Stops from '../../../json/stops.min.json';
import StyleUtils from '../../../utils/StyleUtils.js';

const HomeSearchSubviewStyled = styled.div`
  margin: 0 ${StyleUtils.MARGIN_LR};
`;

const IconStyled = styled.div`
  position: relative;
  height: 36px;
  margin-bottom: ${props => (props.anyResults ? '0' : '12px')};

  &:before {
    font-family: icons;
    content: '\\e901';
    color: #8e8e92;
    z-index: 1;
    margin: auto;
    font-size: 14px;
    font-weight: 700;
    position: relative;
    top: 10px;
    left: 10px;
  }
`;

const InputStyled = styled.input`
  background: #f1f1f2;
  outline: none;
  border: 0;
  width: 100%;
  box-sizing: border-box;
  font-size: 17px;
  line-height: normal;
  padding: 8px 10px;
  color: #8e8e92;
  text-indent: 20px;
  cursor: default;
  border-radius: 8px;
  position: absolute;
  left: 0;

  @media (prefers-color-scheme: dark) {
    background: #1c1b20;
  }
`;

const ResultsStyled = styled.div`
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
`;

const ResultStyled = styled.div`
  color: #1da1f2;
  padding: 14px 9px;
  border-bottom: 1px solid rgba(0, 0, 0, .04);
  cursor: pointer;

  &:before {
    font-family: icons;
    content: '\\e901';
    color: #8e8e92;
    margin-right: 12px;
    position: relative;
    top: 2px;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

const HomeSearchSubview = (props) => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  const updateResults = () => {
    const list = [];

    if (searchText.length > 0) {
      if (isNaN(searchText)) {
        // Search stop name
        for (let stopId in Stops) {
          const stop = Stops[stopId];
          const stopName = stop[2].toLowerCase();

          if (searchText.length < 4) {
            if (stopName.substring(0, searchText.length) !== searchText) {
              continue;
            }
          }
          else if (stopName.indexOf(searchText) === -1) {
            continue;
          }

          // Add to list
          list.push(stop);

          // Limit results
          if (list.length === 6) {
            break;
          }
        }
      }
      else if (searchText in Stops) {
        // Search stop id
        list.push(Stops[searchText]);
      }
    }

    setResults(list);
  };

  const getStopId = (result) => {
    return parseInt(Object.keys(Stops).find(key => Stops[key] === result));
  };

  const getResultText = (result) => {
    return `${result[2]} (${getStopId(result)})`;
  }

  const loadEstimationsStopView = (result) => {
    props.update.view({
      'id': 'estimations_stop',
      'title': result[2],
      'header': false,
      'data': {
        'push': true,
        'id': getStopId(result),
        'name': result[2]
      }
    });
  };

  const updateValue = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  useEffect(() => {
    updateResults();
  }, [searchText]);

  useEffect(() => {
    if (loading === false) {
      return;
    }

    if (props.view.data.push) {
      window.history.pushState(props.view, 'Buscar - TUS Santander', '/buscar');
    }

    // Loaded
    setLoading(false);
  }, [loading, props]);

  return (
    <HomeSearchSubviewStyled>
      <IconStyled anyResults={results.length > 0}>
        <InputStyled type="text" placeholder="Buscar" aria-label="Buscar" inputmode="search" autoFocus={true} autocomplete="off" onInput={updateValue} />
      </IconStyled>

      {results.length > 0 && <ResultsStyled>
        {results.map((result, i) => {
          return <ResultStyled key={i} onClick={() => loadEstimationsStopView(result)}>{getResultText(result)}</ResultStyled>
        })}
      </ResultsStyled>}
    </HomeSearchSubviewStyled>
  );
};

export default HomeSearchSubview;
