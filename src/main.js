/**
 * @author  Lindsay Walker
 * @modified 11/17/17
 */

import {infiniteScroll} from './scroll.js';
import {addMessages} from './addMessages.js';

var messageScroller = new infiniteScroll({
	'wrapper' : 'message-wrapper',
	'url' : 'http://message-list.appspot.com/messages',
	'contentBuilder' : addMessages
	});

messageScroller.init();