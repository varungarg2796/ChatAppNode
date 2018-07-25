var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

var generateLocationMessage = (from, location) => {
    return {
        from,
        url: `https:///www.google.com/maps?q=${location}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
};