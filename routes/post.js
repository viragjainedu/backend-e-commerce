const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")
var Like = require('../models/likes');

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body} = req.body 
    if(!title || !body){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

// router.put('/apply',requireLogin,(req,res)=>{
//     Post.findByIdAndUpdate(req.body.postId,{
//         $push:{apply:req.user._id}
//     },{
//         new:true
//     }).exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//             console.log(result)
//         }
//     })
// })

router.put('/apply', requireLogin, (req, res) =>{
    const { photoId, userId } = req.body;

  Post.findById(photoId, function(err, photo){
    if (err) { return next(err); }

    if (!photo) { return res.status(422).send({ error: 'No such photo'}); }

    if (photo) {
      photo.likes = !photo.likes.includes(userId) ? [...photo.likes, userId] : photo.likes;
      photo.save(function (err, updatedPhoto) {
        if (err) return next(err);
        res.send({ message: 'Succesfully liked photo.', updatedPhoto });
      });
    }
  });
})


// exports.likePhoto = function(req, res, next) {
//     const { photoId, userId } = req.body;
  
//     Photo.findById(photoId, function(err, photo){
//       if (err) { return next(err); }
  
//       if (!photo) { return res.status(422).send({ error: 'No such photo'}); }
  
//       if (photo) {
//         photo.likes = !photo.likes.includes(userId) ? [...photo.likes, userId] : photo.likes;
//         photo.save(function (err, updatedPhoto) {
//           if (err) return next(err);
//           res.send({ message: 'Succesfully liked photo.', updatedPhoto });
//         });
//       }
//     });
//   } 

module.exports = router