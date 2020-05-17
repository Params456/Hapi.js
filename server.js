var Hapi = require ("hapi");
var Promise = require('promise');
var  mongoose = require ("mongoose") ; 
var server = new Hapi.Server({  
    host: 'localhost',
    port: 9999
  })



var db = {useNewUrlParser: true,useUnifiedTopology: true}
mongoose.connect('mongodb://localhost:27017/test',db);

var about = require("./mongoose")
// console.log (about.find({}))

server.route({
    method : "GET",
    path : "/get",
    options : {
        description : "getting all data",
        tags : ["api"],
        handler : async (request, reply)=> {
            const res = await about.find({})
            return(res)
        }
    },
        
}),
server.route({
    method : "POST",
    path : "/",
    handler : async (req,reply)=>{
        const res = await about.create(req.payload)
        return({Data:"Inserted"})
    }
})   
  
server.route({
    method : "PUT",
    path : "/{title}",
    handler : async (req,reply)=>{
        const res = await about.findOneAndUpdate({title : req.params.title}, (req.payload ),{useFindAndModify: false})
        console.log (res)
        return({Data:"Updated!"})
    }
})   

server.route({
    method : "DELETE",
    path : "/{title}",
    handler : async (req,reply)=>{
        const res = await about.findOneAndDelete({title : req.params.title},{useFindAndModify: false})
        console.log (res)
        return({Data:"Deleted!"})
    }
})   



server.start((err) => {
    if (err) {
        console.log ("heI",err)
    }
});
console.log(`Server running at: ${server.info.uri}`);