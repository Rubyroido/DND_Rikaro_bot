const menuKeyboard = [
    [{ text: 'Лист' }, { text: 'Вики' }, { text: 'Дайсы' }],
    [{ text: 'Книги' }, { text: 'Справочник' }]
];

const dicesKeyboard = [
    [{ text: 'D4', callback_data: '4' }, { text: 'D6', callback_data: '6' }, { text: 'D8', callback_data: '8' }],
    [{ text: 'D10', callback_data: '10' }, { text: 'D12', callback_data: '12' }, { text: 'D20', callback_data: '20' }],
];

module.exports = { menuKeyboard, dicesKeyboard };