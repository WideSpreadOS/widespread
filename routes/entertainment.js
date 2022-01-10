const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

/* Models */
const User = require('../models/User');
const UserAudio = require('../models/UserAudio');
const Movie = require('../models/Movie');
const Show = require('../models/Show');


router.get('/', async (req, res) => {
    res.render('entertainment/home', { subZone: "Home", zone: 'Entertainment'})
});





/* TV */

router.get('/tv', async (req, res) => {
    const shows = await Show.find()
    console.log(shows)
    const apiKey = process.env.TMDB_API_KEY
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data.results;
        res.render('entertainment/tv/home', { subZone: "TV", zone: 'Entertainment', subZonePage: 'Home', returnedData, shows });
    }).catch(function (error) {
        console.error(error);
    });
});


/* SHOW MAIN */

router.get('/tv/show/:showId', (req, res) => {
    const showId = req.params.showId;
    const apiKey = process.env.TMDB_API_KEY
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        const showName = returnedData.name;
        console.log(returnedData)
        res.render('entertainment/tv/show', { subZone: "TV", zone: 'Entertainment', subZonePage: showName, returnedData, showId });
    }).catch(function (error) {
        console.error(error);
    });
})



/* SHOW SEASON */

router.get('/tv/show/:showId/:seasonId', (req, res) => {
    const showId = req.params.showId;
    const seasonId = req.params.seasonId;
    const apiKey = process.env.TMDB_API_KEY

    axios.all([
        // Show Name
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`),
        // Season Data
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}?api_key=${apiKey}`)
    ]).then(axios.spread((showData, seasonData) => {
        console.log(showData.data.name)
        const show = showData.data;
        const showName = show.name;
        const season = seasonData.data;
        const seasonName = season.name;
        console.log(`Show: ${showName} \n \n \n \n`)
        console.log(`Season: ${season.name} \n \n \n \n`)
        res.render('entertainment/tv/season', { subZone: "TV", zone: 'Entertainment', subZonePage: showName, currentPage: seasonName, show, season, showId });
    }))


})



/* SHOW EPISODE */

router.get('/tv/show/:showId/:seasonId/:episodeId', (req, res) => {
    const showId = req.params.showId;
    const seasonId = req.params.seasonId;
    const episodeId = req.params.episodeId;
    const apiKey = process.env.TMDB_API_KEY

    axios.all([
        // Show Name
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`),
        // Season Data
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}?api_key=${apiKey}`),
        // Episode Data
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}/episode/${episodeId}?api_key=${apiKey}`)

    ]).then(axios.spread((showData, seasonData, episodeData) => {
        console.log(showData.data.name)
        const show = showData.data;
        const showName = show.name;
        const season = seasonData.data;
        const seasonName = season.name;
        const episode = episodeData.data;
        console.log(`Episode: ${episode} \n \n \n \n`)
        res.render('entertainment/tv/episode', { subZone: "TV", zone: 'Entertainment', subZonePage: showName, currentPage: seasonName, show, season, showId, episode });

    }))
    
})






/* MOVIES */

router.get('/movies', async (req, res) => {
    const movies = await Movie.find()

    res.render('entertainment/movies/home', { subZone: "Movies", zone: 'Entertainment', subZonePage: 'Home', movies })
});


/* Movie Search */


router.post('/movies/search', (req, res) => {
    const movieString = req.body.movie;
    const convertedString = movieString.replace(/\s/g, '+')
    res.redirect(`/entertainment/search/movies/${convertedString}`);
});

router.get('/search/movies/:query', (req, res) => {
    const query = req.params.query;
    const apiKey = 'd3722e71'
    const options = {
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/movies/movie-search-results', { returnedData, query });
    }).catch(function (error) {
        console.error(error);
    });
});


router.get('/movies/:movie', (req, res) => {
    const movie = req.params.movie;
    const apiKey = 'd3722e71'
    const options = {
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/movies/title', { subZone: "Home", zone: 'Entertainment', returnedData, movie })
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/photos/movies/:imdbID', (req, res) => {
    const imdbID = req.params.imdbID;

    var options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-all-images',
        params: { tconst: imdbID },
        headers: {
            'x-rapidapi-host': 'imdb8.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('entertainment/movies/movie-info-photos', { returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/vr/movies/:movie', (req, res) => {
    const movie = req.params.movie;
    const apiKey = 'd3722e71'
    const options = {
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/movies/vr-title', { layout: 'vr', subZone: "Home", zone: 'Entertainment', returnedData, movie })
    }).catch(function (error) {
        console.error(error);
    });
});


router.post('/movies/save', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const movieLink = req.body.movie_title;
    const movieName = req.body.movie_name;
    const moviePoster = req.body.movie_poster;
    await User.findByIdAndUpdate(user,
        { $addToSet: { movie_list: { movie_link: movieLink, movie_name: movieName, movie_poster: moviePoster } } },
    )
    res.redirect(`/entertainment/movies/${movieName}`)
});



router.post('/movies/add-to-recommended', ensureAuthenticated, (req, res) => {
    const movieString = req.body.name;
    const convertedString = movieString.replace(/\s/g, '+');
    let genres = [];
    let allGenres = req.body.genre;
    let allGenresArray = allGenres.split(', ')
    allGenresArray.forEach(genre => {
        genres.push(genre)
    })

    const movie = new Movie({
        name: movieString,
        link: convertedString,
        poster: req.body.poster,
        genre: req.body.genre,
        genres: genres,
        rated: req.body.rated,
        for_kids: req.body.for_kids
    })
    movie.save()
    res.redirect('/entertainment/movies');

})

/* AUDIO */

router.get('/audio', (req, res) => {
    res.render('entertainment/audio/home', { subZone: "Audio", zone: 'Entertainment', subZonePage: 'Home' })
});

router.get('/audio/music', async (req, res) => {
    const audioFiles = await UserAudio.find()
    res.render('entertainment/audio/music', { subZone: "Audio", zone: 'Entertainment', subZonePage: 'Music', audioFiles})
});


/* NEWS */

router.get('/news', (req, res) => {
    res.render('entertainment/news/home')
});


/* JOB SEARCH */

router.get('/job-search', (req, res) => {
    res.render('academy/job-search/home')
});


/* INSIGHTS */

router.get('/insights', (req, res) => {
    res.render('entertainment/insights/home')
});


/* HELP */

router.get('/help', (req, res) => {
    res.render('entertainment/help/home')
});


module.exports = router;