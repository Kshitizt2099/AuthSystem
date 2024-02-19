
//create a class for controller
import mongoose from "mongoose";
import { UserModel } from "../Mongo/UserSchema.js";


let olpass="";
export default class UserController {
    getHome(req,res)
    {
        res.render('Home')
    }
  getRegister(req, res) {
    res.render('register');
  }

  getLogin(req, res) {
    res.render('login', { errorMessage: null });
  }
  getReset(req,res)
  {
    const email=req.session.email
    res.render('UpdatePass',{email:email,error:null});
  }
  async PostReset(req,res)
  {
     const {newpass,confirmPass,oldpass}=req.body
     console.log(olpass)
     if(newpass!==confirmPass)
     {
      res.render('UpdatePass',{email:email,error:"New Password and confirm Passwords are not matching"});
     }
     if(olpass!==oldpass)
     {
      res.render('UpdatePass',{email:email,error:"Old Passsword is wrong"});
     }
     const email=req.session.email
    await UserModel.findOneAndUpdate({Email:email},{Password:newpass})
     res.send("Password Updated")
     
  }
  async postRegister(req, res) {
    const { name, email, password } = req.body;
    console.log(name,email,password)
    try{
        // create instance of model.
      
        const user = new UserModel({name,Email:email,Password:password});
        await user.save();
        console.log("added");
        res.render('login', { errorMessage: null });
    }
    catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
    
   
  }

  async postLogin(req, res) {
    const { email, password } = req.body;
   
    try{
        // create instance of model.
       const user= await UserModel.findOne({Email:email,Password:password}).exec()
       console.log("User is ",user)
       if(!user || user===undefined)
       {
        return res.render('login', {errorMessage: 'Invalid Credentials'});
       }
       console.log(req.session)
       req.session.email=email;
       //console.log(req.session)
       const name=user.name;
       olpass=password
       res.render('Home', {name:name,email:req.session.email })
    }
    catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
    // const user = UserModel.isValidUser(
    //   email,
    //   password
    // );
    // if (!user) {
    //   return res.render('login', {
    //     errorMessage: 'Invalid Credentials',
    //   });
    // }
    // req.session.email=email;
    
    // res.render('Home', { products,email:req.session.email });
  }

   logout(req,res)
    {
       req.session.destroy((err)=>{
           if(err)
           {
            console.log(err);
           }
           else{
            res.clearCookie("connect.sid")
           
            res.redirect("/");
           }

       })
    }
    loadAuth = (req, res) => {
      res.render('auth');
  }
  successGoogleLogin = (req , res) => { 
	if(!req.user) 
		res.redirect('/failure'); 
  console.log(req.user.name)

	//res.send("Welcome " + req.user.email);
  res.render("Googlelogin",{name:req.user.name.givenName,email:req.user.email}) 
}
    
    failureGoogleLogin = (req , res) => { 
      res.send("Error"); 
    }
}
