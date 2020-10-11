const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const express = require('express')
const router = express.Router()
const path = require('path')
const app = express()



app.use(express.static(path.join(__dirname, 'static')))
app.use('/', router)
app.use(bodyParser.json())
app.use('/', bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

router.get('/policy', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/views/policy.html'));
});

app.use((req, res) => {
    const message = {
        subject: 'Message from Portfolio',
        html:
            ` 
                <p>Имя: <strong>${req.body.name}</strong></p> 
                <p>Email: <strong>${req.body.email}</strong></p> 
                <hr>
                <p>${req.body.text}</p>
            `
    }
    mailer(message)

    res.end()
})


app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname + '/static/views/error.html'));

});

app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong...')
})



const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'te.st02@mail.ru',
            pass: 'n$HXp&g1S1YUrH'
        }
    },
    {
        from: 'te.st02@mail.ru',
        to: 'const.trofimov@gmail.com'
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) console.log(err)
        console.log(info)
    })
}



const PORT = process.env.PORT || 3030

app.listen(PORT, () => {
    console.log(__dirname)
    console.log(`Server has been started on ${PORT}...`)
})

