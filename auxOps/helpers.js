const fs = require("fs/promises");


 async function createPathIfNotExists (path) {
     try {
         await fs.access(path);
     } catch (error) {
         await fs.mkdir(path);
     }
 } 

/* function */const generateErrors = (message, code)=> {
    const error = new Error(message);
    error.httpStatus = code;
    return error;
}

module.exports = {
    generateErrors,
    createPathIfNotExists
};