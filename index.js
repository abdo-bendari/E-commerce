import express from "express"
import dbConnection from "./database/dbConnection.js"
import { bootstrap } from "./src/modules/bootstrap.js"
import cors from "cors"
import dotenv from "dotenv"
import catchError from "./src/middleware/catchError.js"
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Q8k4oADDE4xwbMLuk629gfxCdDQUm45jsTiIFtMtGQlUvUK7kQe9fPwC8GbJh4gSy6c9Bk2P3BAOA7OYgEafJ9O00JKikJHjm"
);
const app = express()


app.post('/api/webhook', express.raw({type: 'application/json'}),catchError( (req, res) => {
      const signature = req.headers['stripe-signature'].toString()
      let  event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          "whsec_RpAOysJNoZEUv3A4ptTODDEoDvZLDDUF"
        );
        let checkout
      if(event.type == "checkout.session.completed"){
         checkout =event.data.object
      }
    res.json({message :"done",checkout})
  }));

app.listen(4242, () => console.log('Running on port 4242'));
app.use('/uploads',express.static('uploads'))
app.use(cors())
dotenv.config()
const port = process.env.PORT||3000
bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))