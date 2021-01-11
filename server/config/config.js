


process.env.PORT=process.env.PORT || 3000;

// Entor de node
process.env.NODE_ENV=process.env.NODE_ENV || 'dev'

let urlBD;

if(process.env.NODE_ENV==='dev'){
    urlBD='mongodb://localhost:27017/cafe';
}else{
    urlBD='mongodb+srv://Shinobi:u4iehxqcxXKKVxRk@cluster0.pd843.mongodb.net/cafe'
}

process.env.URLDB=urlBD;