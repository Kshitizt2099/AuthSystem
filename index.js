import express from 'express'
import ejsLayouts from 'express-ejs-layouts';
import UserController from './Public/UserController/UserController.js';
import { auth } from './Public/middlewares/Authmiddleware.js';
import session from 'express-session';
import { connecttodb } from './Public/Mongo/mongo.js';
import './Public/Passport/Passport.js'

import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();
const server=express()
const userController=new UserController()
server.use(passport.initialize())
server.use(session({secret:"sk",resave:false,cookie:{secure:false},saveUninitialized:false}))
server.use(passport.session());
server.use(express.urlencoded({extended:true}))
server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.set('view engine',"ejs");
server.set("views",'./view')
//Routes
server.get("/",auth,userController.getHome)
server.get("/register",userController.getRegister)
server.post("/register",userController.postRegister)
server.get("/Login",userController.getLogin)
server.post("/Login",userController.postLogin)
server.get("/reset",auth,userController.getReset)
server.post("/reset",auth,userController.PostReset)
server.get("/logout",userController.logout)
server.get("/loadauth",userController.loadAuth)
server.get("/success",userController.successGoogleLogin)
server.get("/failure",userController.failureGoogleLogin)
server.get("/loginsucc",userController.failureGoogleLogin)
server.get('/auth/google' , passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
}));
server.get( '/auth/google/callback', 
	passport.authenticate( 'google', { 
		successRedirect: 'https://auth-system-psqf.onrender.com/success', 
		failureRedirect: 'https://auth-system-psqf.onrender.com/failure'
}));

server.listen(3000,()=>{
      
    connecttodb();
    console.log("server is running")
})
