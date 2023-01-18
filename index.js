const express = require('express');
const port = 3000;
const path = require('path');
const db = require('./config/mongoose');
const app = express();

//setting ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
//contacts

// let contactLists = [
//     {
//         name: 'Ashu',
//         phone: 231243413
//     },
//     {
//         name: 'Bhawna',
//         phone: 1231212332
//     },
//     {
//         name: 'sourav',
//         phone: 1235633123
//     }
// ];


//schema
const Contact = require('./models/contacts');

//routes
app.get('/', function(req, res){
   
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error fetching data from db');
        }

        return res.render('home', {
        title: 'Contacts List',
        contact_list: contacts
    });

   });
   
    
});
app.get('/practice', function(req,res){
    return res.render('practice', {
        title: "practicing!"
    })
});
app.get('/delete-contact/', function(req,res){
    // console.log(req.query);
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error while deleting');
            return;
        }
        return res.redirect('/');
    });
});

app.post('/create-contact', function(req,res){
    console.log(req.body);
    // contactLists.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, done){
       if(err){
        console.log('error while creating a contact');
       } 

       console.log(done);
        return res.redirect('/');
    });
   
});




app.listen(port, function(err){
    if(err){
        console.log('error while running server');
        return;
    }
    else{
        console.log('server running on port:', port);
    }
});

