var notifier = require('node-notifier');

function notifyError(error) {
	// BELLs when something goes wrong!
  	notifier.notify({
		  title 	: 'Webpack Error',
		  message 	: "\x07" + error,
		  sound 	: 'Frog',
		  wait 		: false
	});
}

function notifyStats(stats) {
  var json = stats.toJson();
  if (json.errors.length > 0) {
    json.errors.forEach(notifyError);
  } 
}

export default notifyStats;