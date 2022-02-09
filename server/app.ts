const express = require('express');

const app = express();
const electronRouter = require('./routers/ElectronRouter');

// allows for receiving body data
app.use(express.json());
// allows for receiving url data
app.use(express.urlencoded({ extended: true }));

app.get('/', ( req: any, res: any ) => {
  res.status(200).json({ name: 'eileen' });
});

// Organize all endpoint routes from electron APIs
app.use('/electron', electronRouter);

// 404 handler
app.use((req: any,res: any) => {
  res.status(404).send('Not Found');
});

// global error handler
app.use((err:any, req:any, res:any, next:any) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(3003, () => {
  console.log('Express server listening on port 3003');
})

module.exports = app;
