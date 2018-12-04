
const express = require('express');
const passport = require('passport');


const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');

const router = express.Router();


// @route: POST /api/posts
// @desc: Create a new post
// @access: Private


router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const { isValid, errors } = validatePostInput(req.body);
        
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);

    }
    catch(error) {
        console.log(error);
    }
});



// @route: GET /api/posts
// @desc: Fetch all posts
// @access: Public


router.get('/', async (req, res) => {
    try {

        const posts = await Post.find().sort({ date: -1 });

        res.json(posts);

    }
    catch(error) {
        res.status(404).json({ nopost: 'No posts found!' });
    }
});



// @route: GET /api/posts/:id
// @desc: Fetch a posts by id
// @access: Public


router.get('/:id', async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        res.json(post);

    }
    catch (error) {
        res.status(404).json({ nopost: 'No post found for that ID!' });
    }
});



// @route: DELETE /api/posts/:id
// @desc: Delete a posts by id
// @access: Private


router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notAuthorized: 'User not authorized!' });
        }

        await post.remove();

        res.json({ success: true });

    }
    catch (error) {
        res.status(404).json({ nopost: 'No post found for that ID!' });
    }
});




// @route: POST /api/posts/like/:id
// @desc: Like a posts by id
// @access: Private


router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyLiked: 'User already liked this post!' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post);

    }
    catch (error) {
        res.status(404).json({ nopost: 'No post found for that ID!' });
    }
});




// @route: POST /api/posts/unlike/:id
// @desc: Unlike a posts by id
// @access: Private


router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id);

        if (post.likes.length === newLikes.length) {
            return res.status(400).json({ notLiked: 'User has not liked this post!' });
        }

        post.likes = newLikes;

        await post.save();

        res.json(post);

    }
    catch (error) {
        res.status(404).json({ nopost: 'No post found for that ID!' });
    }
});



// @route: POST /api/posts/comments/:id
// @desc: Add comment to post.
// @access: Private


router.post('/comments/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const { isValid, errors } = validatePostInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const post = await Post.findById(req.params.id);

        post.comments.unshift({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

        const updatedPost = await post.save();

        res.json(updatedPost);

    }
    catch(error) {
        res.status(404).json({ postNotFound: 'No post found!' });
    }
});




// @route: DELETE /api/posts/comments/:id/:comment_id
// @desc: Delete a comment.
// @access: Private


router.delete('/comments/:id/:comment_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        const newCommentArray = post.comments.filter(comment => comment._id.toString() !== req.params.comment_id);

        if (post.comments.length === newCommentArray.length) {
            return res.status(404).json({ commentNotFound: 'Comment does not exist!' });
        }

        post.comments = newCommentArray;

        const newPost = await post.save();

        res.json(newPost);

    }
    catch (error) {
        res.status(404).json({ postNotFound: 'No post found!' });
    }
});


module.exports = router; 