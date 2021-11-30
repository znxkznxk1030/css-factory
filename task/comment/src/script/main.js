console.log('...script loaded');

import { domLoaded } from './utils';
import { bindCmtEventHandler, initComment } from './comments';

/**
 * @entry_point
 *
 * After DOM tree was loaded, it bootstraps comment components
 */
// domLoaded(async () => {
//   console.log("...document loaded");
//   await initComment();
//   await bindCmtEventHandler();
// });

//   console.log("...document loaded");
initComment();
bindCmtEventHandler();
//  document.addEventListener("DOMContentLoaded", fn);
