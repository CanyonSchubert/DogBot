	// adapting the tutorial at https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/
	// fetch tutorial used: https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data/
	
var fetch = require("node-fetch");
	
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

	// Configure logger

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

	// Inbound Message function
	
var dogInbound = function(breed, bot, channelID) {
	var breedStr = breed + ' Inbound!\n\n';
	
	// message constructor
	bot.sendMessage({
	to: channelID,
	message: breedStr
	})
}

	// Bot Message function
	
var fetchDog = function(breed, bot, channelID) {
	var httpstr = 'https://dog.ceo/api/breed/' + breed + '/images/random';
	fetch(httpstr)
		.then(response => {
			return response.json()
		})
		.then(data => {
			logger.info(data)
						
			// message constructor
			bot.sendMessage({
			to: channelID,
			message: data.message
			})
		})
		.catch(err => {
			logger.info('Error fetching picture')
						
			// message constructor
			bot.sendMessage({
			to: channelID,
			message: 'My nose malfunctioned. \:\('
			})
		})
		
	console.log('Picture Sent!');
};

	// Initialize Bot
	
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});
bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
	
	// This is the command the bot will look for in a server
	if (message.substring(0, 1) == '!') {
		var args = message.substring(1).split(' ');
		var cmd = args[0];
		
		args = args.splice(1);
		switch(cmd) {
		
			// !corgi (first as an example)
			case 'corgi':
			
				// sends *blank* Inbound! message
				dogInbound('Corgi', bot, channelID);
			
				// fetches random *blank* image
				fetchDog('pembroke', bot, channelID);
				
				break;
				
			// !bulldog
			case 'bulldog':
			case 'englishbulldog':
				dogInbound('English Bulldog', bot, channelID);
				fetchDog('bulldog/english', bot, channelID);
				break;
				
			// !cardigancorgi
			case 'cardigancorgi':
				dogInbound('Cardigan Corgi', bot, channelID);
				fetchDog('corgi/cardigan', bot, channelID);
				break;
				
			// !germanshepherd
			case 'germanshepherd':
				dogInbound('German Shepherd', bot, channelID);
				fetchDog('germanshepherd', bot, channelID);
				break;
				
			// !husky
			case 'husky':
				dogInbound('Husky', bot, channelID);
				fetchDog('husky', bot, channelID);		
				break;
				
			// !pitbull
			case 'pitbull':
			case 'pibble':
				dogInbound('Pitbull', bot, channelID);
				fetchDog('pitbull', bot, channelID);
				break;
				
			// !poodle
			case 'poodle':
				dogInbound('Poodle', bot, channelID);
				fetchDog('poodle', bot, channelID);
				break;
				
				// !toypoodle
				case 'toypoodle':
					dogInbound('Toy Poodle', bot, channelID);
					fetchDog('poodle/toy', bot, channelID);
					break;
				
			// !pug
			case 'pug':
				dogInbound('Pug', bot, channelID);
				fetchDog('pug', bot, channelID);
				break;
				
			// !scottishterrier
			case 'scottishterrier':
			case 'scotty':
				dogInbound('Scottish Terrier', bot, channelID);
				fetchDog('terrier/scottish', bot, channelID);
				break;
				
			// !shiba
			case 'shiba':
			case 'shibe':
				dogInbound('Shiba', bot, channelID);
				fetchDog('shiba', bot, channelID);
				break;
				
			// !breeds
			case 'breeds':
			bot.sendMessage({
			to: channelID,
			message: 'I know these dogs! \n' +
					'	!bulldog \n' +
					'	!corgi \n' +
					'		-> !cardigancorgi \n' +
					'	!germanshepherd \n' +
					'	!husky \n' +
					'	!pitbull \n' +
					'	!poodle \n' +
					'		-> !toypoodle \n' +
					'	!pug \n' +
					'	!scottishterrier \n' +
					'	!shiba \n'
			})
			break;
			
			// !help
			case 'help':
			bot.sendMessage({
			to: channelID,
			message: 'Currently I only display random pictures of dogs. The command !breeds will list out all of the available breeds you can pick from!'
			})			
			break;
			
			// incorrect input
			default:
			bot.sendMessage({
			to: channelID,
			message: 'My nose didn\'t come up with anything! (Breed either not implemented or not found. Try using !breeds to see a list of all available breeds or !help for all commands.)'
			})			
			break;
		}
		console.log('Command Handled!');
	}
});

	// old fetch method (removed to ease the process of adding more breeds by creating a function that does mimics this behavior
/*fetch('https://dog.ceo/api/breed/pembroke/images/random')
					.then(response => {
						return response.json()
					})
					.then(data => {
						console.log(data)
						
						// message constructor
						bot.sendMessage({
						to: channelID,
						message: data.message
					})
					.catch(err => {
						logger.info('Error fetching picture')
						
						// message constructor
						bot.sendMessage({
						to: channelID,
						message: 'My nose malfunctioned. \:\('
						})
					})
				});*/