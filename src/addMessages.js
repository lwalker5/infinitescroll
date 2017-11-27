/**
 * @author  Lindsay Walker
 * @modified 11/17/17
 */

export function addMessages(messageData,scroller){
	var baseUrl = 'http://message-list.appspot.com/messages',
		url = scroller.getUrl(),
		tokenSegment = `?pageToken=${messageData.pageToken}`,
		msgs = messageData.messages,
		output = "",
		imgUrl = baseUrl.replace('messages','');

	//update url for scroller using pageToken from message data
	if (url.search(/(\?pageToken=)\w*/) !== -1) {
		url = url.replace(/(\?pageToken=)\w*/,tokenSegment);
	} else {
		url += tokenSegment;
	}
	scroller.updateUrl(url);

	//message template
	for (var i = 0; i < msgs.length; i++) {
		output += `<li class="message-list--item">
			<div class="message-inner-wrapper">
				<img class="author-pic" src="${imgUrl}${msgs[i].author.photoUrl}"/>
				<div class="content">
					<h4>${msgs[i].author.name}</h4>
					<p class="message">${msgs[i].content.trim()}</p>
				</div>
			</div>
		</li>`;
	}
	return output;
}