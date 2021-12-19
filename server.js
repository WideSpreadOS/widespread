

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fs = require('fs');

const path = require('path');
const ejs = require('ejs');

const mongoose = require('mongoose');
const mongodb = require('mongodb');

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');



const User = require('./models/User');
const UserPhoto = require('./models/UserPhoto');
const UserAudio = require('./models/UserAudio');






require('./config/passport')(passport);
// DB Config
const db = require('./config/keys').MongoURI;
const { ensureAuthenticated } = require('./config/auth');

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
// Static
app.use(express.static('public'));
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Method Override
// Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})



let gfs;

//Init gfs
const conn = mongoose.createConnection(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

//Create storage object
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = req.user.lname + '-' + req.user.fname + '_' + req.user._id + '_' + buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/academy', require('./routes/academy'));
app.use('/business', require('./routes/business'));
app.use('/entertainment', require('./routes/entertainment'));


app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if Files
        if (!files || files.lenth === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files do exist
        console.log(files)
        return res.render('all-images', { files })
    })
})

app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }

        // Files do exist
        return res.render('single-image-file', { file })
    })
})

app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }

        // Files do exist
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read the output to the stream
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            })
        }
    })
});






/* AUDIO FILES */




app.post('/upload-user-audio', upload.single('audio'), async (req, res) => {
    audio_owner = req.user._id;
    const obj = {
        audio_owner: req.user._id,
        album: req.body.album,
        song: req.body.song,
        artist: req.body.artist,
        genre: req.body.genre,
        tags: req.body.tags,
        img: {
            data: req.file.filename,
            contentType: 'audio/mp3'
        }
    }
    console.log(req.file.filename)
    await UserAudio.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            console.log(`Audio Owner: ${audio_owner} Audio Data: ${req.file}`);
            User.findByIdAndUpdate(audio_owner,
                { $push: { user_audio: req.file.filename } },
                { safe: true, upsert: true },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                    } else {
                        return
                    }
                }
            )
            res.redirect(req.get('referer'));
        }
    })
});


app.get('/audio/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }
        // Files do exist
        if (file.contentType === 'audio/mpeg' || file.contentType === 'audio/ogg' || file.contentType === 'audio/mp3') {
            // Read the output to the stream
            const readstream = gfs.createReadStream(file.filename);
            return readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an audio file'
            })
        }
        // Files do exist
        return res.render('single-audio-file', { file })
    })
})


app.get('/audio/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }

        // Files do exist
        if (file.contentType === 'audio/mp3') {
            // Read the output to the stream
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
            console.log(res)
        } else {
            res.status(404).json({
                err: 'Not an audio file'
            })
        }
    })
});


app.delete('/delete-image/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    console.log(`File ID being deleted: ${fileId}`);
    gfs.remove({ _id: fileId, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        } else {
            res.redirect('/files')
        }
    });
    });




const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on ${PORT}`))
