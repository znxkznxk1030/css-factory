import { state, startTx } from './state';
import { escapeXss, ts2str, scrollToTop, popup } from './utils';
import { getCmt, getCmtByPage, pushCmt } from './api';
import {
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
} from './const';

/**
 * @public
 * @function initComment
 *
 * @description do all preps then bootstraps.
 */
const initComment = () => {
  return new Promise((resolve, reject) => {
    // state.txStatus = TX_IDLE;
    state.currPage = 1; // default page to 1

    Promise.all([_reloadCmtList()])
      .then((resList) => {
        resolve(resList);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

/**
 * @public
 * @function bindCmtEventHandler
 * @description bind all events related to commenting behaviors
 */
const bindCmtEventHandler = () => {
  const elBtnPrev = document.getElementById(ID_BTN_PREV);
  const elBtnNext = document.getElementById(ID_BTN_NEXT);
  const elName = document.getElementById(ID_INPUT_NAME);
  const elComment = document.getElementById(ID_INPUT_COMMNET);
  const elBtnSub = document.getElementById(ID_BTN_SUBMIT);

  console.log(elBtnSub);

  elBtnPrev.addEventListener('click', onClickPrev);
  elBtnNext.addEventListener('click', onClickNext);
  elName.addEventListener('focusout', onChangeName);
  elName.addEventListener('input', onChangeName);
  elComment.addEventListener('focusout', onChangeComment);
  elComment.addEventListener('input', onChangeComment);
  elBtnSub.addEventListener('click', onClickSubmit);
};

/**
 * @private
 * @function _isValidComment
 * @param {Object} cmt
 */
const _isValidComment = (cmt) => {
  if (
    typeof cmt.id !== 'number' ||
    typeof cmt.author !== 'string' ||
    typeof cmt.comment !== 'string'
  )
    return false;
  return true;
};

/**
 * @private
 * @template
 * @param {Object} cmt
 *
 *  @description to convert Object to HTML template
 */
const _template_comment_ = (cmt) => {
  const id = cmt.id || 0;
  const author = cmt.author || 'undefined';
  const comment = cmt.comment || '';

  return `<div class="cmt-child">
    <h4>${author}</h4>
    ${ts2str(id)}
    <p>${escapeXss(comment)}</p>
    <br>
  </div>`;
};

/**
 * @private
 * @function
 * @param {Object} cmt
 *
 *  @description create a comment HTML element
 * then append its parent HTML element at last
 */
const _appendCmt = (cmt) => {
  const elPrnt = document.getElementById(ID_CMT_PRNT);
  const elCmt = document.createElement('div');
  elCmt.innerHTML = _template_comment_(cmt);
  elPrnt.appendChild(elCmt);
};

/**
 * @private
 * @function _clear
 *
 *  @description to clear all comments on screen
 */
const _clear = () => {
  const elPrnt = document.getElementById(ID_CMT_PRNT);
  while (elPrnt.lastElementChild) {
    elPrnt.removeChild(elPrnt.lastElementChild);
  }
};

/**
 * @private
 * @function _redrawCmtList
 * @param {Array} cmtList
 *
 *  @description clear list then re-draw new comments list
 */
const _redrawCmtList = (cmtList) => {
  _clear();

  cmtList.filter(_isValidComment).forEach((cmt) => {
    _appendCmt(cmt);
  });
};

/**
 * @private
 * @function _reloadCmtList
 * @returns Promise
 * @description reload current page
 */
const _reloadCmtList = () => {
  return new Promise((resolve, reject) => {
    startTx(getCmtByPage, state.currPage).then((cmtList) => {
      if (!Array.isArray(cmtList)) {
        console.error('Invalid response :(');
        return;
      }
      _redrawCmtList(cmtList);
      resolve();
    });
  });
};

/**
 * @private
 * @event onClickPrev
 * back to the privious page
 */
const onClickPrev = () => {
  const prevPage = state.currPage - 1;

  if (prevPage < MIN_PAGE) {
    return;
  }

  startTx(getCmtByPage, prevPage).then((cmtList) => {
    _redrawCmtList(cmtList);
    state.currPage--;
  });
};

/**
 * @private
 * @event onClickNext
 * go to the next page
 */
const onClickNext = () => {
  const nextPage = state.currPage + 1;

  startTx(getCmtByPage, nextPage).then((cmtList) => {
    // ** Alternative Logic **
    // 일반적으로 오는 서버 데이터로는 마지막 페이지를 특정지을 수 없었음.
    // 대신 서버에서 마지막 페이지 이상에서 오는 응답에서는 빈배열을 리턴하였음
    if (cmtList.length <= 0) {
      return;
    }
    state.currPage = nextPage;
    _redrawCmtList(cmtList);
  });
};

/**
 * @private
 * @event onClickSubmit
 * push new comments
 * then refresh current page
 */
const onClickSubmit = () => {
  const elName = document.getElementById(ID_INPUT_NAME);
  const elComment = document.getElementById(ID_INPUT_COMMNET);

  const name = elName.value;
  const comment = elComment.value;

  if (name.length < MIN_LEN_CMT) {
    popup(PRI_ALERT, 'The length of name must be at least 2 ');
    return;
  }

  if (comment.length < MIN_LEN_NAME) {
    popup(PRI_ALERT, 'The length of comment must be at least 5 ');
    return;
  }

  startTx(pushCmt, name, comment).then((cmtList) => {
    _redrawCmtList(cmtList);
    scrollToTop();
  });
};

/**
 * @private
 * @event onChangeName
 * @param {Object} e Change event object
 *
 *  @description escape cross-site script and remove white space
 */
const onChangeName = (e) => {
  const elName = document.getElementById(ID_INPUT_NAME);
  const name = elName.value;
  elName.value = escapeXss(name.replace(/\s/g, ''));
};

/**
 * @private
 * @event onChangeComment
 * @param {Object} e Change event object
 *
 *  @description escape cross-site script and trim
 */
const onChangeComment = (e) => {
  const elComment = document.getElementById(ID_INPUT_COMMNET);
  elComment.value = escapeXss(elComment.value);
};

export { initComment, bindCmtEventHandler };
