const express = require('express');
const { param } = require('express/lib/request');
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require('express-fileupload');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//coming up of the data in the body itself
app.use(express.json());

//using fileupload as middleware
app.use(fileUpload());

let courses = [
    {
        id: "11",
        name: "Learn ReactJs",
        price: 299
    },
    {
        id: "22",
        name: "Learn Android",
        price: 599
    },
    {
        id: "33",
        name: "Learn Django",
        price: 399
    },
]
app.get('/', (req, res) => {
    res.send("Hello from lco");
});
app.get('/api/v1/lco', (req, res) => {
    res.send("Hello from lco docs");
});
app.get('/api/v1/lcoobject', (req, res) => {
    res.send({id: "55", name: "learn backend", price: 999});
});
app.get('/api/v1/courses', (req, res) => {
    res.send(courses);
});

//passing informationin the route itself
app.get('/api/v1/mycourse/:courseId', (req, res) => {
    const myCourse = courses.find((course)=>course.id === req.params.courseId)
    res.send(myCourse)
});

//post data/request
app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true)
});

//handling query url's

//computed url from documentation: http://localhost:4000/api/v1/courseQuery?location=delhi&device=web
app.post("/api/v1/courseQuery", (req, res) => {
    let location = req.query.location
    let device = req.query.device

    res.send(location, device);
});

app.post("/api/v1/courseUpload", (req, res) => {
    const file = req.files.file
    let path = __dirname + "/images/" + Date.now() + ".jpg"

    file.mv(path, (err) => {
        if(err == null){
            res.send(true);
        }else{
            res.send(false);
        }
        
    })
});


app.listen(4000, () => {
    console.log(`Server is running at port 4000...`);
});
