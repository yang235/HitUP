import ReactGA from 'react-ga';
import { UPDATE_DATE_TYPE, UPDATE_LANGUAGE, UPDATE_OPTIONS, UPDATE_VIEW_TYPE } from './types';

export const updateOptions = function (options) {
  return dispatch => {
    dispatch({
      type: UPDATE_OPTIONS,
      payload: options,
    });
  };
};

export const updateViewType = function (viewType = 'grid') {
  return dispatch => {
    dispatch({
      type: UPDATE_VIEW_TYPE,
      payload: viewType
    });
    ReactGA.event({
      category: 'Preference',
      action: `Trending ViewType Set to ${viewType}`
    });
  };
};

export const updateLanguage = function (language) {
  return dispatch => {
    dispatch({
      type: UPDATE_LANGUAGE,
      payload: language
    });
    ReactGA.event({
      category: 'Preference',
      action: `Trending Language Set to ${language || "All"}`
    });
  };
};

export const updateDateJump = function (dateJump) {
  return dispatch => {
    dispatch({
      type: UPDATE_DATE_TYPE,
      payload: dateJump
    });
    ReactGA.event({
      category: 'Preference',
      action: `Trending Period Set to ${dateJump}`
    });
  };
};
