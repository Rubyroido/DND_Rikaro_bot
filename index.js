require('dotenv').config();

const TelegramApi = require('node-telegram-bot-api');
const TelegramBot = require('node-telegram-bot-api/lib/telegram');
const token = process.env.TOKEN_SECRET;
const bot = new TelegramApi(token, { polling: true });


//импорты модулей
const { dicesKeyboard, menuKeyboard } = require('./bot_modules/keyboards');
const { randomEnterMessage, randomLeaveMessage } = require('./bot_modules/random_messages');

// переменная с таймером для удаления сообщений
const deleteTimer = 20000;

// оснвной функционал
bot.on('message', (msg) => {
	const text = msg.text;
	const chatId = msg.chat.id;
	const messageId = msg.message_id;
	const lowCaseWords = `${text}`.toLowerCase().split(' ');

	// меню бота в клавиатуре
	if (text === '/menu' || text === '/menu@DND_Rikaro_bot') {
		bot.sendMessage(chatId, 'Меню', {
			reply_markup: {
				keyboard: menuKeyboard,
				resize_keyboard: true
			}
		})
	}

	// реакции бота на команды и сообщения из меню
	if (text === '/start' || text === '/start@DND_Rikaro_bot') {
		bot.deleteMessage(chatId, messageId);
		bot.sendMessage(chatId, `Чат-бот Rikaro приветствует тебя. Чтобы открыть мою книгу заклинаний используй /menu`);
	}
	if (text === '/info') {
		bot.deleteMessage(chatId, messageId);
		bot.sendMessage(chatId, 'Made in Uzbekistan');
	}
	if (text === '/sheet' || text === 'Лист') {
		bot.deleteMessage(chatId, messageId);
		bot.sendMessage(chatId, `Лист персонажа удобно заполнять <a href="https://longstoryshort.app/characters/builder/">тут</a>
Если это твой первый персонаж, советую посмотреть вот это <a href="https://www.youtube.com/watch?v=1M7H0DiCbPo">видео</a>`,
			{ parse_mode: 'HTML' })
			.then((m) => {
				setTimeout(() => {
					bot.deleteMessage(chatId, m.message_id)
				}, deleteTimer)
			})
			.catch(err => console.log(err))
	}
	if (text === '/wiki' || text === 'Вики') {
		bot.deleteMessage(chatId, messageId);
		bot.sendMessage(chatId,
			'Новости, статьи и полезная информация <a href="https://dnd.su">здесь</a>',
			{ parse_mode: 'HTML' })
			.then((m) => {
				setTimeout(() => {
					bot.deleteMessage(chatId, m.message_id)
				}, deleteTimer)
			})
			.catch(err => console.log(err))
	}
	if (text === '/books' || text === 'Книги') {
		bot.deleteMessage(chatId, messageId);
		bot.sendMessage(chatId,
			'Нужны книги по ДнД, а также упрощенные правила в таблицах и схемах? Тебе <a href="https://disk.yandex.ru/d/jVBUZItrbmAfNQ">сюда</a>',
			{ parse_mode: 'HTML' })
			.then((m) => {
				setTimeout(() => {
					bot.deleteMessage(chatId, m.message_id)
				}, deleteTimer)
			})
			.catch(err => console.log(err))
	}
	if (text === '/handbook' || text === 'Справочник') {
		bot.deleteMessage(chatId, messageId);
		bot.sendMessage(chatId,
			'Удобный справочник по игре можно найти <a href="https://ttg.club/screens">тут</a>',
			{ parse_mode: 'HTML' })
			.then((m) => {
				setTimeout(() => {
					bot.deleteMessage(chatId, m.message_id)
				}, deleteTimer)
			})
			.catch(err => console.log(err))
	}

	// реакция на вход в группу 
	if ('new_chat_members' in msg) {
		bot.deleteMessage(chatId, messageId);
		const newMembers = msg.new_chat_members;
		newMembers.forEach(user => {
			bot.sendMessage(chatId,
				`${randomEnterMessage(user)} Здесь ты можешь найти себе партию или мастера. Также у нас есть книга заклинаний, под названием "Меню", заклинания из которой могут дать тебе полезную информацию.`,
				{ parse_mode: 'HTML' })
		})
	}

	// реакция на выход из группы 
	if ('left_chat_member' in msg) {
		bot.deleteMessage(chatId, messageId);
		const user = msg.left_chat_member;
		bot.sendMessage(chatId,
			`${randomLeaveMessage(user)} Прощай и до скорых встреч!`,
			{ parse_mode: 'HTML' })
	}

	// меню для броска кости
	if (text === 'кости' || text === 'Кости' || text === 'Дайсы' || text === 'дайсы') {
		bot.deleteMessage(chatId, messageId);
		bot.sendMessage(chatId, 'Выбери нужную кость для броска', {
			reply_markup: {
				inline_keyboard: dicesKeyboard,
				resize_keyboard: true,
			}
		})
			.then((m) => {
				setTimeout(() => {
					bot.deleteMessage(chatId, m.message_id)
				}, deleteTimer)
			})
			.catch(err => console.log(err))
	}

	//голова 
	if (lowCaseWords.includes('голова')) {
		let randomNumber = Math.floor(Math.random() * 10);
		if (randomNumber === 1) {
			bot.sendPhoto(chatId,
				'https://w7.pngwing.com/pngs/1024/859/png-transparent-trollface-rage-comic-internet-troll-internet-meme-frustrated-troll-face-comics-white-face.png',
				{
					caption: `О, голова это - <a href="tg://user?id=284965409">Никита</a>`,
					parse_mode: 'HTML'
				})
				.tnen(m => {
					setTimeout(() => {
						bot.deleteMessage(chatId, m.message_id)
					}, deleteTimer)
				})
				.catch(err => console.log(err))
		}
	}
})

// реакция на бросок кости
bot.on('callback_query', (msg) => {
	const chatId = msg.message.chat.id;
	const dice = Number(`${msg.data}`);
	let result = Math.ceil(Math.random() * dice);

	if (result === dice || result === 1) {
		bot.sendMessage(chatId,
			`Результат броска D${dice}: <b>${result}</b>`,
			{ parse_mode: 'HTML' }
		)
			.then((m) => {
				setTimeout(() => {
					bot.deleteMessage(chatId, m.message_id)
				}, deleteTimer)
			})
			.catch(err => console.log(err))
	} else {
		bot.sendMessage(chatId,
			`Результат броска D${dice}: ${result}`)
			.then((m) => {
				setTimeout(() => {
					bot.deleteMessage(chatId, m.message_id)
				}, deleteTimer)
			})
			.catch(err => console.log(err))
	}
})

