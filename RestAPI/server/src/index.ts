import express from "express";
import cors from "cors";
import { Cars } from "./cars";

const app = express();
const port = 8080; // default port to listen
 app.use(cors())


app.get( "/", ( req, res ) => {
    res.send(`
      <h1>API for cars database</h1>
      <h3>follow /api/cars</h3>
      ` );
} );

// define a route handler for the default home page
app.get( "/api/cars", ( req, res ) => {
    try {
        const q = ((req.query.q as string) ??'').toLocaleLowerCase();
        console.log('/api/cars', q);
        let result  = [];
        if (q !==''){
            result = Cars.filter((car) =>  car.Name.includes(q))
        }
        else {
            result = Cars;
        }

        res.json(result.map(car => {return {"Id":car.Id, "Name": car.Name, "Year":car.Year,"Origin": car.Origin}}));

    } catch (error) {
        console.error('Error on /cars path', error)
    }
} );



// define a route handler for the default home page
app.get( "/api/cars/:id", ( req, res ) => {
    const parID = parseInt(req.params.id,10);
    const result  = Cars.filter((car) =>  {return (car.Id === parID)})
    res.json(result);
});

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