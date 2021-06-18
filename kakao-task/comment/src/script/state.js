// status of transaction
const TX_IDLE = 0x01;
const TX_BUSY = 0x02;
const TX_DONE = 0x03;

// maximum # of pending transactions
const MAX_TX_PEND = 5;

/**
 * @state
 *
 * @property currPage
 * @property txStatus
 *
 * @description
 * For stability of Transactions & prevention of state inconsistency
 */
const state = {
  currPage: 1,
  txStatus: TX_IDLE,
  pending: [],
};

/**
 * @function startTx
 * @param {Function} fn fn should returns promise
 * @param  {...any} args
 *
 * @description Transaction standard api
 */
const startTx = (fn, ...args) => {
  return new Promise((resolve, reject) => {
    if (_isBusy()) {
      _pushTx(fn, args);
    } else {
      state.txStatus = TX_BUSY;
      fn.apply(this, args).then((res) => {
        state.txStatus = TX_DONE;
        resolve(res);
        _endTx();
      });
    }
  });
};

/**
 * It branches off the promise object and the normal function, then executes it.
 *
 * @function _execute
 * @param {Function} fn
 * @param {Array} _args
 * @param {Function} resolve
 * @param {Function} reject
 */
const _execute = (fn, _args, resolve, reject) => {
  if (typeof fn !== 'function') {
    console.error('_execute was given non-function :(');
    return;
  }

  const args = _args || [];
  const ret = fn.apply(this, args);

  if (ret instanceof Promise) {
    ret
      .then((res) => {
        state.txStatus = TX_DONE;
        resolve(res);
        _endTx();
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    state.txStatus = TX_DONE;
    resolve(ret);
    _endTx();
  }
};

/**
 * @private
 * @function _isBusy
 * @returns boolean
 *
 * @description return true when tx is busy
 */
const _isBusy = () => {
  return state.txStatus !== TX_IDLE;
};

/**
 * @private
 * @function _endTx
 *
 * @description After the transaction is finished,
 * the pending transaction is executed.
 */
const _endTx = () => {
  if (Array.isArray(state.pending) && state.pending.length > 0) {
    const { fn, args } = state.pending.splice(0, 1);
    state.txStatus = TX_BUSY;
    fn.apply(this, args).then((res) => {
      state.txStatus = TX_DONE;
      resolve(res);
      _endTx();
    });
  } else {
    state.txStatus = TX_IDLE;
  }
};

/**
 * @private
 * @function _pushTx
 * @param {Function} fn
 * @param {Array} args
 *
 */
const _pushTx = (fn, args) => {
  if (state.pending.length >= MAX_TX_PEND) {
    // console.warn("tx pending list is full now :(");
    return;
  }

  state.pending.push({
    fn,
    args,
  });
};

export { state, startTx };
