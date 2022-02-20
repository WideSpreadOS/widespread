const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


const Amadeus = require('amadeus');
const sdk = require('api')('@fsq-docs/v1.0#39rivyvkzr89i46');



/* Models */
const User = require('../models/User');



// VR Dashboard Page
router.get('/sports/golf', ensureAuthenticated, async (req, res) => {
    const currentUser = req.user;
    const userId = req.user.id;

    const user = await User.findById(userId)


    res.render('ar', {
        layout: 'ar', currentPageTitle: 'AR', currentUser, user
    });
})



// SpreadShield Nearby Places Page
router.get('/spreadshield/nearby', async (req, res) => {
    try {

        let amadeus = new Amadeus({
            clientId: process.env.AMADEUS_API_KEY,
            clientSecret: process.env.AMADEUS_API_SECRET
        });
        
        await amadeus.referenceData.locations.pointsOfInterest.get({
            // longitude: 28.847137,
            // latitude: -82.004051
              longitude: 2.160873,
            latitude: 41.397158
        }).then(function (response) {

            response.data.forEach(place => {
                
                // console.log(place)
                console.log('Place: ' + place.name )
                console.log(`Latitude: ${place.geoCode.latitude}`)
                console.log(`Longitute: ${place.geoCode.longitude}`)
            })
            return amadeus.next(response);
        }).then(function (nextPage) {
            // console.log(nextPage);
        });
    } catch (error) {
        console.log(error);
    }



    /* const dotenv = require('dotenv').config();
    const CLIENT_ID = dotenv.FOURSQUARE_CLIENT_ID;
    const CLIENT_SECRET = dotenv.FOURSQUARE_CLIENT_SECRET; */

/* 
FOURSQUARE_CLIENT_ID="BAVW34WNTJEZ2HC1HIB4R5VCGAORU2N0GNGZ1OOPCYWSBD1Y",
FOURSQUARE_CLIENT_SECRET="5AEIKFIMLUVNRTWXDLOVWHE3BVMXIOCQH2DX4BGXLLEIW0H4"
*/
/*     sdk['places-nearby']({
        ll: '28.847137%2C-82.004051',
        // Authorization: 'fsq3WJl5PYQg1Hie12BgyP7EhQ9hRSdoVo0SWdsD5jJWPUE='
        Authorization: '&client_id=BAVW34WNTJEZ2HC1HIB4R5VCGAORU2N0GNGZ1OOPCYWSBD1Y&client_secret=5AEIKFIMLUVNRTWXDLOVWHE3BVMXIOCQH2DX4BGXLLEIW0H4&v=YYYYMMDD'
        // Authorization: process.env.FOURSQUARE_API_KEY
    })
        .then(res => console.log(res))
        .catch(err => console.error(err));
 */
/*     const options = {
        method: 'GET',
        url: 'https://api.foursquare.com/v3/places/nearby',
        params: { lang: 'en', media: 'True' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('news/home', { subZone: "Home", zone: 'News', subZonePage: 'Home', returnedData })
    }).catch(function (error) {
        console.error(error);
    });

 */




    res.render('ar', {
        layout: 'spreadshield', currentPageTitle: 'SpreadShield'
    });
})


module.exports = router;