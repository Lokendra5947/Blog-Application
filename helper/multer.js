const multer = require("multer")

// storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // for genrate random name for file 
        let genrateRandomFileNAme = Date.now()+ Math.floor(Math.random())
        // console.log(genrateRandomFileNAme)
    cb(null,genrateRandomFileNAme+file.originalname)
    }
  })
  const upload = multer({ storage: storage })

  module.exports = {upload}