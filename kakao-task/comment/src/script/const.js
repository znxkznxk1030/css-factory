// base elements
const ID_CMT_PRNT = 'cmt-1';
// button elements
const ID_BTN_PREV = 'btn-prev';
const ID_BTN_NEXT = 'btn-next';
const ID_BTN_SUBMIT = 'btn-submit';
// input elements
const ID_INPUT_NAME = 'input-name';
const ID_INPUT_COMMNET = 'input-comment';

// related to state
const MIN_PAGE = 1;
const MIN_LEN_NAME = 1;
const MAX_LEN_NAME = 15;
const MIN_LEN_CMT = 5;
const MAX_LEN_CMT = 500;

// prioirty for popup
const PRI_ERROR = 'error';
const PRI_ALERT = 'alert';
const PRI_INFO = 'info';

// api url list
// const URL_API_BASE_URL = "http://localhost:9999/api";
const URL_API_BASE_URL = '/api';
const URL_GET_CMT = URL_API_BASE_URL + '/comments';
const URL_GET_CMT_PAGE = URL_API_BASE_URL + '/comments/page';
const URL_POST_CMT = URL_API_BASE_URL + '/comments';

export {
  ID_CMT_PRNT,
  ID_BTN_PREV,
  ID_BTN_NEXT,
  ID_BTN_SUBMIT,
  ID_INPUT_NAME,
  ID_INPUT_COMMNET,
  MIN_PAGE,
  MIN_LEN_NAME,
  MIN_LEN_CMT,
  PRI_ERROR,
  PRI_ALERT,
  PRI_INFO,
  URL_GET_CMT,
  URL_GET_CMT_PAGE,
  URL_POST_CMT,
};
