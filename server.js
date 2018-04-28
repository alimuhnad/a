// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
//رفع صورة واحدة
var multer = require('multer'); 
const stor = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        const imgs='-' + Date.now()+file.originalname;
        cb(null, '-' + Date.now()+file.originalname);
    }
})
const upload = multer({storage:stor});

app.use(express.static('/a'))

// Configuration
mongoose.connect('mongodb://a:a@ds161539.mlab.com:61539/a');
//mongoose.connect('mongodb://a:a@ds161539.mlab.com:61539/a');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var Review = mongoose.model('m', {
    title: String,
    description: String,
    rating: Number
});


var users = mongoose.model('users', {
    username: String,
    password: String,
    email: String,
    phone: String
});

var items = mongoose.model('items', {
    item:String,
    price:String,
    imgs:String,
    imgspathi:String
});

var user = new users();


// Get all uploaded images
app.get('/uploads', (req, res, next) => {
    // use lean() to get a plain JS object
    // remove the version key from the response
    items.find({}, '-__v').lean().exec((err, items) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image
        for (let i = 0; i < items.length; i++) {
            var img = items[i];
            img.url = req.protocol + '://' + req.get('host') + '/uploads/' + img.imgs;
        }
        res.json(items);
    })
});
app.get('/uploads/:id', (req, res, next) => {
    let imgId = req.params.id;
 
   
        // stream the image back by loading the file
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join('./uploads/',imgId)).pipe(res);
});

app.post('/api/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log("login");

    // login , جد واحد بالتيبل
    users.findOne({username :username,password :password}, function(err, users) {

        if (err)
            return  res.status(500).send();
        //اذا لا
        if(!users)
            return res.send("n");
        //اذا نعم 
       return res.send("y");
    });

});


// تسجيل مستخدم جديد
app.post('/api/regs', function(req, res) {
  
    //التاكد في حال وجود نفس الشخص
    users.findOne({phone:req.body.phone , email: req.body.email}, function(err, X) {
        if (err){

            return  res.status(500).send();
        
        }
            //اذا لا
        if(!X){
            users.create({
                username :req.body.username,
                password : req.body.password,
                email: req.body.email,
                phone: req.body.phone
        }, function(err, users) {
                                if (err)
                                    res.send(err);

            return res.status(200).send("newok");
            
        });
        }else{

            //اذا نعم 
            return res.send("regesterd");
        }
            

        
    });
  });

// رفع صورة مع اسم المادة و سعرها
app.post('/api/up', upload.single('imgs') ,function(req, res) {
      console.log(req.file);
            items.create({
            item :req.body.item,
            price : req.body.price,
            imgs: req.file.path
        }, function(err, users) {
                                if (err)
                                    res.send(err);

            return res.status(200).send("ko");
        });
  });


     // Get reviews
     app.get('/api/items', function(req, res) {
 
 
         // use mongoose to get all reviews in the database
         items.find(function(err, items) {
 
             // if there is an error retrieving, send the error. nothing after res.send(err) will execute
             if (err)
                 res.send(err)
 
             res.json(items); // return all reviews in JSON format
         });
     });












// // Routes
 
//     // Get reviews
//     app.get('/api/reviews', function(req, res) {
 
//         console.log("fetching reviews");
 
//         // use mongoose to get all reviews in the database
//         Review.find(function(err, reviews) {
 
//             // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             if (err)
//                 res.send(err)
 
//             res.json(reviews); // return all reviews in JSON format
//         });
//     });
 
//     // create review and send back all reviews after creation
//     app.post('/api/reviews', function(req, res) {
 
//         console.log("creating review");
 
//         // create a review, information comes from request from Ionic
//         Review.create({
//             title : req.body.title,
//             description : req.body.description,
//             rating: req.body.rating,
//             done : false
//         }, function(err, review) {
//             if (err)
//                 res.send(err);
 
//             // get and return all the reviews after you create another
//             Review.find(function(err, reviews) {
//                 if (err)
//                     res.send(err)
//                 res.json(reviews);
//             });
//         });
 
//     });
    

//       // delete a review
//       app.delete('/api/regs/:_id', function(req, res) {
//         regstrasion.remove({
//             _id : req.params._id
//         }, function(err, regstrasion) {
 
//         });
//     });
//     // delete a review
//     app.delete('/api/reviews/:review_id', function(req, res) {
//         Review.remove({
//             _id : req.params.review_id
//         }, function(err, review) {
 
//         });
//     });
 
 
// listen (start app with node server.js) ======================================
var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port 8080");
