import puppeteer from 'puppeteer';
import { expect } from 'chai';
import path from 'path';
import {
  ID_BTN_PREV,
  ID_BTN_NEXT,
  ID_BTN_SUBMIT,
  ID_INPUT_NAME,
  ID_INPUT_COMMNET,
} from '../src/script/const';

import { state } from '../src/script/state';

let contentPath = path.join(__dirname, '..', 'dist', 'index.html');

describe('Test integrated gui', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    // await page.goto(`file://${contentPath}`);
    await page.goto(`http://localhost:8000/`);
  });

  it('Integrated Test | first load comment page', async () => {
    expect(await page.title()).to.eql('Comment Test');

    const elTitle = await page.waitForSelector('#title');
    const value = await page.evaluate((el) => el.textContent, elTitle);

    expect(value).to.eql('카카오 댓글');
    expect(state.currPage).to.eql(1);

    await page.screenshot({
      path: 'snap-shoot/first-load.png',
      fullPage: true,
    });
  }).timeout(10000);

  it('Integrated Test | click next & prev button test', async () => {
    await page.screenshot({
      path: 'snap-shoot/nextbtn(before).png',
      fullPage: true,
    });

    await page.click(`#${ID_BTN_NEXT}`);

    await page.screenshot({
      path: 'snap-shoot/nextbtn(after).png',
      fullPage: true,
    });

    await page.screenshot({
      path: 'snap-shoot/prevbtn(before).png',
      fullPage: true,
    });

    await page.click(`#${ID_BTN_PREV}`);
    await page.screenshot({
      path: 'snap-shoot/prevbtn(after).png',
      fullPage: true,
    });
  }).timeout(10000);

  it('Integrated Test | click submit button test', async () => {
    await page.screenshot({
      path: 'snap-shoot/submit(before).png',
      fullPage: true,
    });

    await page.type(`#${ID_INPUT_NAME}`, 'puppeteer tester');
    await page.type(
      `#${ID_INPUT_COMMNET}`,
      '** submit test ** \nby gui integrated tester'
    );

    await page.click(`#${ID_BTN_SUBMIT}`);

    await page.screenshot({
      path: 'snap-shoot/submit(after).png',
      fullPage: true,
    });
  }).timeout(10000);

  after(async () => {
    await browser.close();
  });
});
