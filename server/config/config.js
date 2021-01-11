


process.env.PORT=process.env.PORT || 3000;

// Entor de node
process.env.NODE_ENV=process.env.NODE_ENV || 'dev'

let urlBD;

if(process.env.NODE_ENV==='dev'){
    urlBD='mongodb://localhost:27017/cafe';
}else{
    urlBD=process.env.MONGO_URI
}

process.env.URLDB=urlBD;