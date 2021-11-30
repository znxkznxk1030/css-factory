import { URL_GET_CMT, URL_GET_CMT_PAGE, URL_POST_CMT } from './const';

/**
 * @function getCmt
 * @returns Promise
 *
 * @description get all comment list
 */
const getCmt = () => {
  const request = new Request(URL_GET_CMT, {
    method: 'GET',
  });

  return fetch(request)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res);
      }
      return res.json();
    })
    .catch((err) => new Error('failed to access to server', err));
};

/**
 * @function getCmt
 * @param {Number} page
 * @returns Promise
 *
 * @description get comment list by page
 */
const getCmtByPage = (page) => {
  if (typeof page !== 'number') {
    console.warn('"page" is number type, but given value is not :(');
    page = 0;
  }

  const request = new Request(URL_GET_CMT_PAGE + '/' + page, {
    method: 'GET',
  });

  return fetch(request)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res);
      }
      return res.json();
    })
    .catch((err) => new Error('failed to access to server', err));
};

/**
 * @function pushCmt
 * @param {String} author
 * @param {String} comment
 * @returns Promise
 *
 * @description puch a new comment to server
 */
const pushCmt = (author, comment) => {
  const data = {
    author,
    comment,
  };

  return fetch(URL_POST_CMT, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res);
      }
      return res.json();
    })
    .catch((err) => new Error('failed to access to server', err));
};

export { getCmt, getCmtByPage, pushCmt };
