/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';

global.ResizeObserver = require('resize-observer-polyfill');

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
