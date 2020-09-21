const path = require('path')
const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 3030

let data = undefined


app.use(express.static(path.join(__dirname, 'static')))
app.use('/', bodyParser.urlencoded({
    extended: true
}));
app.use('/', router)

// app.use((req, res, next) => {
//     if (res.status(400)) {
//         res.sendFile(path.join(__dirname + '/static/views/error.html'));
//     }
// })

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong...')
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

router.get('/policy', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/views/policy.html'));
});



const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'te.st.01@mail.ru',
            pass: '2!gi#n4%00'
        }
    },
    {
        from: 'te.st.01@mail.ru',
        to: 'const.trofimov@gmail.com'
    }
)

app.post('/', function (req, res, next) {
    data = req.body
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
    res.redirect('/')
    // res.send(`name: ${req.body.name} ------ ${req.body.text}`)
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) console.log(err)
        console.log(info)
    })
}



app.listen(PORT, () => {
    console.log(__dirname)
    console.log(`Server has been started on ${PORT}...`)
})

