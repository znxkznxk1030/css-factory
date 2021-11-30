import { startTx, state } from '../src/script/state';

import assert from 'assert';

// status of transaction
const TX_IDLE = 0x01;
const TX_BUSY = 0x02;
const TX_DONE = 0x03;

// maximum # of pending transactions
const MAX_TX_PEND = 5;

describe('Test state', () => {
  const asyncFn = (param) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(param);
      }, 1000);
    });
  };

  it('startTx | Should be TX_IDEL, TX_DONE and TX_BUSY', () => {
    assert.strictEqual(state.txStatus, TX_IDLE);
    startTx(asyncFn, 1).then(() => {
      assert.strictEqual(state.txStatus, TX_DONE);
    });
    assert.strictEqual(state.txStatus, TX_BUSY);
  });

  it('startTx | Should be under or equal MAX_TX_PEND', () => {
    const TEST_SEQ = new Array(10).fill(0);

    TEST_SEQ.forEach((v, idx) => {
      startTx(asyncFn, idx);
    });

    assert.strictEqual(state.pending.length <= MAX_TX_PEND, true);
  });

  it('startTx | Should be exact same with a original response', () => {
    const TEST_SEQ = [true, 'string', -1];

    TEST_SEQ.forEach((v) => {
      startTx(asyncFn, v).then((res) => {
        assert.strictEqual(res, v);
      });
    });
  });
});
