// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var cors = require('cors');
//رفع صورة واحدة
var multer = require('multer'); 
const stor = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null, '-' + Date.now()+file.originalname);
    }
})
const upload = multer({storage:stor});


//Serves all the request which includes /images in the url from Images folder
app.use(express.static('./public'));

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
 imgs: String,
});

var user = new users();

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

  app.post('/api/up1',function(req, res) {
    
          items.create({
              item :req.body.item,
              price : req.body.price,
              imgs: req.body.imgs
      }, function(err, users) {
                              if (err)
                                  res.send(err);

          return res.status(200).send("ko");
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
            imgs: req.file.toString('base64')
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
