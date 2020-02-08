const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

async function log(message) {
	console.log(message);
	await fs.appendFileSync(path.join(__dirname, 'draw.log'), `${message}\n`);
}

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: false }));

app.get('/draw', async (req, res) => {
	var emails = await fs.readFileSync(path.join(__dirname, 'emails.json'));
	emails = JSON.parse(emails);
	var winner = _.sample(emails);
	log(`New winner: ${winner}`);
	var pre = winner.split('@')[0];
	var newPre = '';
	var post = winner.split('@')[1];
	for (let i = 0; i < pre.length; ++i) {
		if (i >= Math.floor(pre.length / 2)) {
			newPre += '*';
		} else {
			newPre += pre[i];
		}
	}
	winner = newPre + '@' + post;
	res.send({ winner });
});

app.use(express.static('client/build'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen('9898', () => {
	log('Listening on Port 9898');
});
