module.exports = theFunc => (req,res,next) => {
    Promise.resolve(theFunc(req,res,next)).catch(next);
}

// module.exports = (theFunc) => {
//     return (req, res, next) => {
//         Promise.resolve(theFunc(req,res,next)).catch(next);
//     }
// }