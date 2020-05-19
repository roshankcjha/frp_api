const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'eb95d5363bc644d58c8e610586343b3b'
});

const handleApiCall = (req,res)=>{
app.models
.predict(Clarifai.FACE_DETECT_MODEL,
    req.body.input)
.then(data => {
    res.json(data);
})
.catch(err => res.status(400).json('unable to work with api'))
}

const handleImage=(req,res,db)=>{
    const {id}=req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports={handleImage,handleApiCall}
//when both object key and value have the same name