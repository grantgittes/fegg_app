// Route handlers
const express = require("express");
const router = express.Router();
const passport = require("passport");

//import data models
const User = require("./models/user");
const Course = require("./models/course");
const Question = require("./models/question");
const Answer = require("./models/answer");

const randomAvatarGenerator = require("random-avatar-generator");
const generator = new randomAvatarGenerator.AvatarGenerator();

// Make user information available to templates
router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

// HOMEPAGE
router.get("/", (req, res) => {
  if (req.user) {
    Course.find({ _id: { $in: req.user.courses } }, function(err, course_list) {
      if (err) {
        console.log(err);
      } else {
        Question.find({ course_id: { $in: req.user.courses } })
          .sort("-post_date")
          .limit(5)
          .exec(function(err, question_list) {
            if (err) {
              console.log(err);
            } else {
              Course.find({}, function(err, all_course_list) {
                if (err) {
                  console.log(err);
                } else {
                  User.find({}, function(err, all_user_list) {
                    if (err) {
                      console.log(err);
                    } else {
                      Question.find({})
                        .populate("user_id")
                        .exec(function(err, all_questions) {
                          if (err) {
                            console.log(err);
                          } else {
                            Answer.find({})
                              .populate("user_id")
                              .exec(function(err, all_answers) {
                                if (err) {
                                  console.log(err);
                                } else {
                                  res.render("index", {
                                    courses: course_list,
                                    questions: question_list,
                                    msg: "",
                                    all_courses: all_course_list,
                                    all_users: all_user_list,
                                    all_questions: all_questions,
                                    all_answers: all_answers
                                  });
                                }
                              });
                          }
                        });
                    }
                  });
                }
              });
            }
          });
      }
    });
  } else {
    res.render("index", {
      courses: [],
      questions: [],
      msg: "Login to check!",
      all_courses: [],
      all_users: [],
      all_questions: [],
      all_answers: []
    });
  }
});

// COURSE PAGE
router.get("/courses", checkAuthentication, (req, res) => {
  Course.find({}, function(err, course_list) {
    res.render("course_all", { courses: course_list });
  });
});

// GET AND DISPLAY COURSES BY ID
router.get("/courses/:id", checkAuthentication, (req, res) => {
  Course.findById(req.params.id, function(err, cur_course) {
    if (err) {
      console.log(err);
    } else {
      Question.find({ course_id: cur_course._id })
        .populate("user_id")
        .exec(function(err, question_list) {
          if (err) {
            console.log(err);
          } else {
            //console.log(question_list)
            res.render("course_page", {
              course: cur_course,
              questions: question_list
            });
          }
        });
    }
  });
});

router.get("/courses/question/:id", checkAuthentication, (req, res) => {
  Question.findById(req.params.id)
    .populate("user_id")
    .populate("course_id")
    .exec(function(err, cur_question) {
      if (err) {
        console.log(err);
      } else {
        Answer.find({ question_id: cur_question._id })
          .sort("-net_vote")
          .populate("user_id")
          .exec(function(err, answer_list) {
            if (err) {
              console.log(err);
            } else {
              res.render("question_page", {
                question: cur_question,
                answers: answer_list
              });
            }
          });
      }
    });
});

//CREATE COURSE
router.post("/courses", checkAuthentication, function(req, res) {
  let course = new Course(req.body);
  course.save(function(err) {
    if (err) {
      console.log(err);
      res.redirect("/courses");
    } else {
      res.redirect("/courses");
    }
  });
});

//CREATE QUESTION
router.post("/question", function(req, res) {
  let question = new Question({
    topic: req.body.topic,
    text: req.body.text,
    user_id: req.user._id,
    course_id: req.body.course_id
  });
  question.save(function(err) {
    if (err) {
      console.log(err);
      res.redirect("/courses/" + req.body.course_id);
    } else {
      res.redirect("/courses/" + req.body.course_id);
    }
  });
});

//CREATE ANSWER
router.post("/answer", function(req, res) {
  let answer = new Answer({
    text: req.body.text,
    user_id: req.user._id,
    question_id: req.body.question_id
  });
  answer.save(function(err) {
    if (err) {
      console.log(err);
      res.redirect("/courses/question/" + req.body.question_id);
    } else {
      res.redirect("/courses/question/" + req.body.question_id);
    }
  });
});

// ADD COURSE
router.post("/addcourse", function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      user.courses.push(req.body.course_id);
      user.save();
      res.redirect("/courses");
    }
  });
});

// VOTE
router.post("/answer/vote", function(req, res) {
  Answer.findById(req.body.id, function(err, answer) {
    if (err) {
      console.log(err);
    } else {
      answer.net_vote = Number(answer.net_vote) + Number(req.body.vote);
      answer.save();
      res.redirect("/courses/question/" + req.body.qid);
    }
  });
});

// DELETE COURSE
router.post("/deletecourse", function(req, res) {
  Course.findById(req.body.course_id, function(err, course) {
    if (err) {
      console.log(err);
    } else {
      course.remove(function(err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/courses");
        }
      });
    }
  });
});

// DELETE QUESTION
router.post("/deletequestion", function(req, res) {
  Question.findById(req.body.question_id, function(err, question) {
    if (err) {
      console.log(err);
    } else {
      question.remove(function(err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/courses/" + req.body.course_id);
        }
      });
    }
  });
});

// DELETE ANSWER
router.post("/deleteanswer", function(req, res) {
  Answer.findById(req.body.answer_id, function(err, question) {
    if (err) {
      console.log(err);
    } else {
      question.remove(function(err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/courses/question/" + req.body.question_id);
        }
      });
    }
  });
});

// Route to signup page
router.get("/signup", function(req, res) {
  res.render("signup", { msg: "Please follow the instructions to sign up!" });
});

router.post(
  "/signup",
  function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var avatar = generator.generateRandomAvatar();
    // console.log(avatar);

    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        req.flash("error", "User already exists!");
        res.render("signup", {
          msg: "Username already exists! Please choose another one!"
        });
      }
      var newUser = new User({
        username: username,
        password: password,
        email: email,
        avatar_url: avatar,
        displayName: username
      });
      console.log(username);
      newUser.save(next);
    });
  },
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "signup",
    failureFlash: true
  })
),
  function(req, res, err) {};

// profile page
router.get("/users/:username", function(req, res, next) {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(404);
    }
    console.log(user);
    res.render("profile", { user: user });
  });
});

// route to login page
router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", function(req, res, next) {
  passport.authenticate("login", function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("Invalid username!");
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

// login with github
router.get("/github/auth", passport.authenticate("github"));
router.get("/fail_git", function(req,res) {
  res.render("fail_git");
});

router.get(
  "/login/github/return",
  passport.authenticate("github", { failureRedirect: "/fail_git" }),
  function(req, res) {
    res.redirect("/success");
  }
);

router.get(
  "/success",
  require("connect-ensure-login").ensureLoggedIn("/"),
  function(req, res, next) {
    res.redirect("/");
  }
);

// route to logout page
router.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

// route to profile page

router.get("/edit", checkAuthentication, function(req, res) {
  console.log(req.user);
  res.render("edit");
});

router.post("/edit", checkAuthentication, function(req, res, next) {
  User.find({ username: req.user.username }, function(err, user) {
    if (err) {
      next(err);
      return;
    } else {
      // console.log(user);
      if (req.body.displayname) {
        req.user.displayName = req.body.displayname;
        user[0].displayName = req.body.displayname;
      }
      if (req.body.email) {
        req.user.email = req.body.email;
        user[0].email = req.body.email;
      }
      if (req.body.bio) {
        req.user.bio = req.body.bio;
        user[0].bio = req.body.bio;
      }
      console.log(user);
      user[0].save(function(err) {
        if (err) {
          next(err);
          return;
        }
        req.flash("info", "Profile Updated!");
        res.redirect("/users/" + req.user.username);
      });
    }
  });
});

// authentication middleware
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be logged into see this page");
    res.redirect("/login");
  }
}

// Get the lastest question posted in the class - POST course_id to retrieve it
router.post("/get-latest-question", function(req, res, next) {
  Question.find({ course_id: req.body.course_id })
    .sort("-posted_date")
    .exec(function(err, questions) {
      if (err) {
        next(err);
        return;
      } else {
        res.send(questions[questions.length - 1]);
      }
    });
});

// Route to add course to user's class list
router.post("/add-course-to-user", function(req, res, next) {
  User.updateOne(
    { _id: req.body.user_id },
    { $push: { courses: req.body.course_id } },
    function(err) {
      if (err) {
        next(err);
        return;
      } else {
        res.send("Success: Course - " + req.body.course_id + " added");
      }
    }
  );
});

// Get all answers for a question - POST {question_id : *question_id*}
router.post("/get-answers", function(req, res, next) {
  Answer.find({ question_id: req.body.question_id }, function(err, answers) {
    if (err) {
      next(err);
      return;
    } else {
      res.send(answers);
    }
  });
});

// GET ALL LATEST

// REMOVE COURSE FROM USER LIST
router.post("/remove-course-from-user/", function(req, res, next) {
  User.updateOne(
    { _id: req.body.user_id },
    { $pull: { courses: req.body.course_id } },
    function(err) {
      if (err) {
        console.log(err);
        next(err);
        return;
      } else {
        res.send(
          "Successfully removed " +
            req.body.course_id +
            " from " +
            req.body.user_id
        );
      }
    }
  );
});

module.exports = router;
