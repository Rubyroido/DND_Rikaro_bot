// функция возврата случайных сообщений из заданного пула для пользователей, зашедших в группу
function randomEnterMessage(user) {
    const enterMessages = [
        `Вдруг дверь открывается, на пороге таверны стоит силуэт, неразличимый из-за света с улицы. Это <a href="tg://user?id=${user.id}">${user.username || user.first_name}</a>. Таверна встречает уютной атмосферой и все присутствующие приветствуют тебя.`,
        `Вспоминайте свои лучшие байки, ведь прибыл(а) <a href="tg://user?id=${user.id}">${user.username || user.first_name}</a>. Другие искатели приключений приветствуют тебя.`,
        `Дверь рапахнулась и перед таверной предстал(а) <a href="tg://user?id=${user.id}">${user.username || user.first_name}</a>. Все в таверне приветствуют тебя.`
    ];

    let randomNumber = Math.floor(Math.random() * enterMessages.length);
    return enterMessages[randomNumber];
}

// функция возврата случайных сообщений из заданного пула для пользователей, покинувших группу
function randomLeaveMessage(user) {
	const leaveMessages = [
		`Искатель приключений <a href="tg://user?id=${user.id}">${user.username || user.first_name}</a> покидает таверну и отправляется в новое путешествие.`,
		`Авантюрист <a href="tg://user?id=${user.id}">${user.username || user.first_name}</a> покидает уют таверны и отправляется в путь в поисках приключений.`
	]

	let randomNumber = Math.floor(Math.random() * leaveMessages.length);
	return leaveMessages[randomNumber];
}

module.exports = { randomEnterMessage, randomLeaveMessage };