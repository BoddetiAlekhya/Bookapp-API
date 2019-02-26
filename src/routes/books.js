import express from 'express'
import request from 'request-promise'
import {parseString} from 'xml2js'
import authenticate from '../middlewares/authenticate'

const router = express.Router();
router.use(authenticate);

router.get("/search", (req,res) => {request.get(`https://www.goodreads.com/search/index.xml?key=OIQXlqXm49H3p3nCdNQ&q=${req.query.q}`)
    .then(result => parseString(result, (err, goodreadsResult) => res.json({books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(work =>({
        goodreadsId: work.best_book[0].id[0]._,
        title: work.best_book[0].title[0],
        authors: work.best_book[0].author[0].name[0]
       
    }))})
    )
    );
    
    


    // res.json({
    //     books: [
    //         {
    //             goodreadsId:"1",
    //             title: "Me",
    //             authors: "Hello",
    //             pages:22
    //         },
    //         {
    //             goodreadsId:"2",
    //             title: "you",
    //             authors: "Wello",
    //             pages:223
    //         }
    //     ]
    // })
})

export default router