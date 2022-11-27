import express from "express";
import cors from "cors";
import { Car, Cars } from "./cars";


const app = express();
const port = 8080; // default port to listen

app.use(cors())
app.use(express.json());


// define a route handler for the default home page
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
            result = Cars.filter((car) =>  car.Name.toLowerCase().includes(q))
        }
        else {
            result = Cars;
        }

        res.json(result.map(car => {return {"Id":car.Id, "Name": car.Name, "Year":car.Year,"Origin": car.Origin}}));

    } catch (error) {
        console.error('Error on /cars path', error)
    }
} );

app.get( "/api/cars/:id", ( req, res ) => {
    const parID = parseInt(req.params.id,10);
    const result  = Cars.filter((car) =>  {return (car.Id === parID)})
    res.json(result);
});

app.post( "/api/cars", ( req, res ) => {
    const carData = req.body as Car;
    const index = Cars.findIndex((car)=>{ return car.Id === carData.Id;});
    if (index === -1 ){
        res.json({error:'Item not found!'} );
        return;
    }
    Cars[index] = carData;
    res.json({...carData, error:''});
} );


app.delete( "/api/cars/:id", ( req, res ) => {

    interface ExpectedParam  {
        id : string | any;
    }
    const params = req.params as ExpectedParam;
    console.log({params})
    const parID = parseInt(params.id,10);
    const index = Cars.findIndex((car)=>{ return car.Id === parID;});
    if (index === -1 ){
        res.json({error:'Item not found!'} );
        return;
    }
    const carData =  Cars[index];
    Cars.splice(index,1);
    res.json({ ...carData, error:''} );
} );


// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );