(function() {
	var cli = require('../'),
	    assert = require('assert'),
	    cursor;

	cursor = new cli.Cursor();

	cursor
		.fg.hex('#f00')
		.write('warning')
		.reset()
		.write(' ')
		.fg.magenta()
		.write('dumb shit')
		.reset()
		.write(' ')
		.fg.black()
		.bg.hex('#00ee00')
		.write('and theeen')
		.fg.reset()
		.write(' reset text but not background')
		.fg.yellow()
		.write(' set new background')
		.bg.reset()
		.write(' reset background but not text')
		.reset()
		.up(2)
		.write('goin up')
		.down()
		.write('just about back')
		.down().left(10)
		.write('where we started')
		.write('\n');

	cursor = new cli.Cursor({stream: null});

	var prefix = cursor
	          .buffer()
	          .fg.black()
	          .bg.rgb(255, 0, 0)
	          .write('warning')
	          .reset()
	          .flush();
	console.log('%s hello', prefix);

	// console.log(require('util').inspect(cursor))

	// cursor
	// 	.pos()
	// 	.then(function(pos) {
	// 		console.log('was on row %s column %s', pos[0], pos[1]);
	// 	});

})();
