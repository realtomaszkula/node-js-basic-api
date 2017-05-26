import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('welcome to my api!');
});


app.listen(port, () => {
  console.log(`Running on port: ${port}`);
})