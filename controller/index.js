const taskModel = require("../db/taskModel");

module.exports = {
  Homepage: async (req, res) => {
    const msg = req.flash('msg');
    try {
      const task = await taskModel.find();
      res.render("index", {
        task,
        content: "./pages/Home",
        msg
      });
    } catch {
      res.render("index", {
        error: "cannot find task!",
      });
    }
  },

  Updatepage: async (req, res) => {
    try {
      const taskitem = await taskModel.find({ _id:req.params.id });
      if(taskitem.length == 0) {
         return res.redirect("/");
      }
      res.render("index",{
        content:"./pages/Update",
        task:taskitem
      });
    } catch {
      res.render("index",{
        content:"./pages/Update"
      });
    }
  },

  TaskPost: async (req, res) => {
    const obj = { ...req.body, complete: false };
    const taskInit = new taskModel(obj);
    try {
      if(req.body.title === "") {
        req.flash("msg" , "please complete the form");
        return res.redirect("/");
      }
      req.flash('msg' , 'success create task');
      await taskInit.save();
      res.redirect("/");
    } catch (err) {
      req.flash('msg','error create task');
      res.redirect("/");
    }
  },

  TaskDelete: async (req, res) => {
    try {
      req.flash('msg','success delete task');
      await taskModel.deleteOne({ _id: req.body.id });
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  },

  TaskPut: async (req,res) => {
    // console.log(req.body.complete);
    // res.redirect("/");
     let obj; 
     if(req.body.complete == undefined) {
         obj = {...req.body , complete:false};
     } else {
      obj = req.body;
     }

     let id = req.body.id;
     
     try {
       req.flash("msg" , "success update task");
       await taskModel.updateOne({ _id:req.body.id } , { $set:obj });
       res.redirect("/");
     } catch(err) {
      res.redirect(`/${id}`);
     }
  }
};
