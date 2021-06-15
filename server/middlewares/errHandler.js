function errHandler(err, req, res, next) {
    if (err.name === 'Invalid Login') {
        res.status(400).json({message: 'Invalid email/password'})
    } else if(err.name === 'Not Found') {
        res.status(404).json({message: 'Not Found'})
    } else if(err.name === 'Unauthorized') {
        res.status(401).json({message: 'Unauthorized'})
    } else if(err.name === 'SequelizeValidationError') {
        let errMessage = []
        for (let i = 0; i < err.errors.length; i++) {
            errMessage.push(err.errors[i].message)
        }
        res.status(400).json({message: errMessage})
    } else if (err.name === 'bad request') {
        res.status(401).json({message: err.message})
    } else {
        res.status(500).json({message: err.message})
    }
}

module.exports = errHandler