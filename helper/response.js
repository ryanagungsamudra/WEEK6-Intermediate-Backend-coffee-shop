const formResponse = (status, message, result, res) => {
    res.send({
        status: status,
        message: message,
        result: result,
    })
}

module.exports = formResponse