/**
 * @author  Lindsay Walker
 * @modified 11/17/17
 */
 
import throttle from 'lodash';

export function infiniteScroll(options){
	let props = Object.assign({
		'wrapper' : 'scroll-container',
		'url' : 'http://message-list.appspot.com/messages'
	}, options);

	let el = document.getElementById(props.wrapper);

	var init = function() {
			getMoreItems(props.url);
			handleScroll();
		},

		getUrl = function(){
			return props.url;
		},

		updateUrl = function(newUrl){
			props.url = newUrl
		},

		handleScroll = function() {
			//use Lodash throttle helper to only record scroll events every 250ms
			window.addEventListener('scroll',_.throttle(function(){
				checkProgress();
			},250));
		},

		checkProgress = function() {
			var amtScrolled = window.scrollY,
				windowHgt = window.innerHeight,
				documentHgt = document.body.offsetHeight;

			//request more items if close to the bottom of the container
			if (documentHgt - windowHgt - amtScrolled < 250) {
				getMoreItems(props.url);
			}
		},

		getMoreItems = function(url) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status === 200) {
					//successful data fetch - use custom function to build content and insert into DOM
					el.innerHTML += props.contentBuilder(JSON.parse(xhr.responseText),publicHelper);
				} else {

				}
			}
			xhr.send();
		},

		//allow access to functions outside of function scope
		publicHelper = {
			init: init,
			getMoreItems: getMoreItems,
			getUrl: getUrl,
			updateUrl: updateUrl	
		};

	return publicHelper;
}
