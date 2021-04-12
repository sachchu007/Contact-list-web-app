
const express = require('express');
const path = require('path');  //for current path
const port = 8000;

const db = require('./config/mongoose')
const Contact = require('./models/contact')
const app = express();

app.set('view engine', 'ejs'); // here setting property view engine to value ejs
app.set('views', path.join(__dirname, 'Views'));
app.use(express.urlencoded()); //(middleware) parser which encode the request data and save them in property body
app.use(express.static('Assets'));//Static file to improve UI



app.get('/', function (req, res) {
   
   Contact.find({},function(err,contacts){
       if(err)
       {
           console.log('Error in fetching contacts from db');
           return;
       }
       return res.render('home', {
        title: 'Contacts List',
        contact_list: contacts
    });
   });
   
    
});

app.post('/createContact', function (req, res) {

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log('error in creating contact')
            return;
        }
        console.log('*******', newContact);
        return res.redirect('back');
    });

    
});

app.get('/delete-contact',function(req,res){
let id = req.query.id;

Contact.findByIdAndDelete(id,function(err){
if(err){
    console.log('error in deleting an object from database');
    return;
}
return res.redirect('back');
});

});


app.listen(port, function (err) {
    if (err) {
        console.log('error has been encounterted');
        return;
    }
    else
        console.log('hurray!');
})



