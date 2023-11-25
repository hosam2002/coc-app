const axios = require('axios')
const express = require('express')
const app = express()
const port = 5500 || process.env.PORT

// api
const { COC_API_KEY, KEY } = require('./Modules/token')
const { Client } = require('./clash-of-clans-api')
let client = new Client({ token: COC_API_KEY })

// view Engine > EJS
app.set('view engine', 'ejs')

// accessing the query param
app.use(express.urlencoded({extended: false}))

// GET Request
app.get('/', (req, res) => {

    const rank  = async () => {

        try {

            const ranking = await client.getRankByCountry(32000221, 3)

            const clan1Location = ranking.data.items[0].location
            const clan2Location = ranking.data.items[1].location
            const clan3Location = ranking.data.items[2].location

            res
            .status(200)
            .render('index', {
        
                title: 'clashFinder ~ Home Page',

                // clan 1 badge
                clan1Badge: ranking.data.items[0].badgeUrls.large,
                // clan 1 name
                clan1Name: ranking.data.items[0].name,
                // clan 1 points
                clan1Points: ranking.data.items[0].clanPoints,
                // clan 1 country
                clan1Country: clan1Location.name,
                
                // clan 2 badge
                clan2Badge: ranking.data.items[1].badgeUrls.large,
                // clan 2 name
                clan2Name: ranking.data.items[1].name,
                // clan 2 points
                clan2Points: ranking.data.items[1].clanPoints,
                // clan 2 country
                clan2Country: clan2Location.name,

                // clan 3 badge
                clan3Badge: ranking.data.items[2].badgeUrls.large,
                // clan 3 name
                clan3Name: ranking.data.items[2].name,
                // clan 3 points
                clan3Points: ranking.data.items[2].clanPoints,
                // clan 3 country
                clan3Country: clan3Location.name

            })

            
        } catch (error) {
            
            console.log(error) /* for developing purpose */

            return res
            .status(404)
            .render('notFound', {

                title: 'clashFinder ~ Not Found'
            })
        }    
    }

    rank()
})

app.get('/search/player', (req, res) => {

    const { playerTag } = req.query
    const tag = playerTag.replace('#', '%23')

    const player = async () => {

        try {

            const player = await client.getPlayer(tag)

            res
            .status(200)
            .render('searchPlayer', {
        
                title: 'clashFinder ~ Player Info',

                // 1. player name
                name: player.data.name,
                // 2. player town hall
                hall: player.data.townHallLevel,
                // 3. exp level
                exp: player.data.expLevel,
                // 4. role
                role: player.data.role,
                // 5. trophies
                trophies: player.data.trophies,
                // 6. best trophies
                bestTrophies: player.data.bestTrophies,
                // 7. builderBaseTrophies
                builderbase: player.data.builderBaseTrophies,
                // 8. war stars
                warstars: player.data.warStars,
                // 9. donation
                donation: player.data.donations,
                // 10. donation recieved
                donationReceived: player.data.donationsReceived
            })
            
        } catch (error) {
            
            console.log(error) /* for developing purpose */

            return res
            .status(404)
            .render('notFound', {

                title: 'clashFinder ~ Not Found'
            })
        }
    }

    player()
})

app.get('/search/clan', (req, res) => {

    const { clanTag } = req.query
    const tag = clanTag.replace('#', '%23')

    const clan = async () => {

        try {

            const clan = await client.getClan(tag)
            const leader = clan.data.memberList.find(el => el.role == 'leader')

            res
            .status(200)
            .render('searchClan', {
        
                title: 'clashFinder ~ Clan Info',
                
                // 1. clan badge
                badge: clan.data.badgeUrls.large,
                // 2. clan tag
                tag: clan.data.tag,
                // 3. clan name
                name: clan.data.name,
                // 4. clan level
                level: clan.data.clanLevel,
                // 5. clan leader
                leader: leader.name,
                // 6. clan location
                location: clan.data.location.name,
                // 7. clan members
                members: clan.data.members,
                // 8. clan won wars
                wonWars: clan.data.warWins,
                // 9. clan points
                points: clan.data.clanPoints,
                // 10. clan current leaque
                leaque: clan.data.warLeague.name
            })
            
        } catch (error) {
          
            console.log(error) /* for developing purpose */

            return res
            .status(404)
            .render('notFound', {

                title: 'clashFinder ~ Not Found'
            })
        }
    }

    clan()
})

app.all('*', (req, res) => {

    res
    .status(404)
    .render('notFound', {

        title: 'clashFinder ~ Not Found'
    })
})

app.listen(port)