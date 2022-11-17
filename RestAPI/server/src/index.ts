import express from "express";
import { Cars } from "./cars";

const app = express();
const port = 8080; // default port to listen


app.get( "/", ( req, res ) => {
    res.send(`
      <h1>API for cars database</h1>
      <h3>follow /api/cars</h3>

      ` );
} );


// define a route handler for the default home page
app.get( "/api/cars", ( req, res ) => {
    const q = ((req.query.q as string) ??'').toLocaleLowerCase();
    if (q !==''){
        res.json(Cars.filter((car) =>  car.Name.includes(q)));
    }
    else {
        res.json(Cars);
    }
} );

app.post( "/cars", ( req, res ) => {
    res.json({message:'post not implemented'} );
} );


app.delete( "/cars", ( req, res ) => {
    res.json({message:'delete not implemented'} );
} );


// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );