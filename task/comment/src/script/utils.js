import { PRI_ALERT, PRI_ERROR, PRI_INFO } from './const';

/**
 * @function domLoaded
 * @param {Function} fn bootstrap function
 *
 *  @description to guarantee executing fn after finished DOM loading
 */
function domLoaded(fn) {
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    setTimeout(fn);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/**
 * @function excapeXss
 * @param {String} value
 *
 * @description to check that a comment contains any malicious string.
 *
 * @todo need to check more rules
 */
const escapeXss = (value) => {
  return value.replace(
    '(?i)(\\b)(on\\S+)(\\s*)=|javascript:|(<\\s*)(\\/*)script|style(\\s*)=|(<\\s*)meta',
    ''
  );
};

/**
 * @function ts2str
 * @param {Number} timestamp
 *
 *  @description convert timestamp to date string
 *
 * ex) Fri Feb 26 2021 01:18:39 GMT+0900 (대한민국 표준시)
 *
 */
const ts2str = (timestamp) => {
  if (typeof timestamp !== 'number')
    return new Error('timestamp is not a number type.');
  return new Date(timestamp).toString();
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
};

const popup = (type, msg) => {
  let priority = '';

  switch (type) {
    case PRI_ERROR:
      priority = 'Error';
      break;
    case PRI_ALERT:
      priority = 'Alert';
      break;
    case PRI_INFO:
      priority = 'Info';
      break;
  }

  window.alert(priority + ' | ' + msg);
};

export { domLoaded, escapeXss, ts2str, scrollToTop, popup };
