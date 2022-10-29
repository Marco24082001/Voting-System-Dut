const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 3000;
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
  

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));


app.get('/', (req, res) => {
  res.status(200);
  res.send("wellcome to root URL of Server ");
})

const candidateRouter = require('./routes/candidate.route');
const positionRouter = require('./routes/position.route');
app.use('/candidate', candidateRouter);
app.use('/position', positionRouter);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);


