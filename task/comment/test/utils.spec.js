import { escapeXss, ts2str } from '../src/script/utils';

import assert from 'assert';

describe('Test utility', () => {
  it('escapeXss | return value should be string', () => {
    let strXss = '<script>';
    let ret = escapeXss(strXss);

    assert.strictEqual('string', typeof ret);
  });

  it('escapeXss | should be same when it has not xss', () => {
    let strNotXss = 'plain string';
    const ret = escapeXss(strNotXss);

    assert.strictEqual(strNotXss, ret);
  });

  it('escapeXss | should be not same when it has any xss', () => {
    let strXss = '<script>';
    let ret = escapeXss(strXss);

    assert.strictEqual(strXss, ret);
  });

  it('ts2str | should be string', () => {
    let timestamp = 1614278772356;
    let ret = ts2str(timestamp);

    assert.strictEqual('string', typeof ret);
  });

  it('ts2str | should be same what it expected', () => {
    let timestamp = 1614278772356;
    let ret = ts2str(timestamp);

    assert.strictEqual(
      'Fri Feb 26 2021 03:46:12 GMT+0900 (Korean Standard Time)',
      ret
    );
  });
});
