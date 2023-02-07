var app = angular.module("myApp", ["ngRoute"]);
var thoiluong = 0;

function thoigian(x) {
  thoiluong = x;
  //đem nguoic
  demnguoc();
}
function demnguoc() {
  thoiluong--;
  sophut = Math.floor(thoiluong / 60);
  sogiay = thoiluong % 60;
  document.getElementById("sophut").innerHTML = sophut;
  document.getElementById("sogiay").innerHTML = sogiay;
  //đem nguoc
  setTimeout(demnguoc, 1000);
}

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "trangchu.html",
    })
    .when("/subjects", {
      templateUrl: "subject.html",
      controller: "subjectsCtrl",
    })
    .when("/quiz/:id/:Name", {
      templateUrl: "quiz-poly.html",
      controller: "quizCtrl",
    })

    .when("/lienhe", {
      templateUrl: "lienhe.html",
    })
    .when("/gioithieu", {
      templateUrl: "gioithieu.html",
    })
    .when("/ykien", {
      templateUrl: "feedback.html",
    })
    .when("/login", {
      templateUrl: "demo-login.html",
      controller: "registration",
    })
    .when("/detail", {
      templateUrl: "detail.html",
      controller: "registration",
    })
    .when("/changepass", {
      templateUrl: "changepass.html",
    })
    .when("/regis", {
      templateUrl: "regis.html",
      controller: "registration"
    })
    .when("/update", {
      templateUrl: "update.html",
      controller: "updateCtrl"
    });
});
app.controller(
  "updateCtrl",
  function ($scope, $location, $http, $window, dataService) {

 
    $scope.list_user = [];

    dataService.getData().then(function (res) {
      $scope.list_user = res.data;
      console.log($scope.list_user);
    });
    $scope.changepass = function () {
      var password = $scope.password;
      var checkusername = false;

      for (var i = 0; i < $scope.list_user.length; i++) {
        console.log($scope.list_user[i].username);
        if($scope.list_user[i].username == $scope.username){
          checkusername = true;
          var id=$scope.list_user[i].id;
          var data={
            username:$scope.list_user[i].username,
            password:$scope.newpassword,
            fullname:$scope.newfullname,
            email:$scope.newemail,
            gender:$scope.newgender,
            birthday:$scope.newbirthday,
            schoolfee:$scope.newshool
          }
          alert("Đổi thông tin thành Công")
          // alert($scope.list_user[i].username)
          dataService.updateData(id,data).then(function(){
           
           
            return;
          })

         
        }
      }
      if(checkusername== false){
        alert("tai khoan k ton tai")
      }
    };
  }
);
//đoi mk
app.controller(
  "changePassCtrl",
  function ($scope, $location, $http, $window, dataService) {
    $scope.list_user = [];

    dataService.getData().then(function (res) {
      $scope.list_user = res.data;
      console.log($scope.list_user);
    });
    $scope.changepass = function () {
      var password = $scope.password;
      var checkusername = false;

      for (var i = 0; i < $scope.list_user.length; i++) {
        console.log($scope.list_user[i].username);
        if($scope.list_user[i].username == $scope.username){
          checkusername = true;
          var id=$scope.list_user[i].id;
          var data={
            username:$scope.list_user[i].username,
            password:$scope.newpassword2,
            fullname:$scope.list_user[i].fullname,
            email:$scope.list_user[i].email,
            gender:$scope.list_user[i].gender,
            birthday:$scope.list_user[i].birthday,
          }
          if($scope.newpassword1==$scope.newpassword2){
            alert("Thanh Cong")
            // alert($scope.list_user[i].username)
            dataService.updateData(id,data).then(function(){
              alert("Đổi mật khẩu thành công");
              console.log(data);
              return;
            })
          }else{
            alert("Bạn nhập mật khẩu sai !! Xin Mời Nhập lại !!");

          }

         
        }
      }
      if(checkusername== false){
        alert("tai khoan k ton tai")
      }
    };
  }
);

app.service("dataService", function ($http) {
  this.getData = function () {
    return $http.get("http://localhost:3000/listStudent");
  };
  this.updateData = function (id, data) {
    return $http.put("http://localhost:3000/listStudent/" + id, data);
  };
});
// login---------------------------------

app.controller("registration", function ($scope, $http) {
  $scope.edit = function (index) {
    $scope.datas.splice(i, 1);
    var datas = {
      id: Math.floor(),
      username: $scope.username,
      password: $scope.password,
      fullname: $scope.fullname,
      email: $scope.email,
      gender: $scope.gender,
      birthday: $scope.birthday,
      schoolfee: $scope.schoolfee,
      marks: $scope.marks,
    };
    $http.post("http://localhost:3000/listStudent", data).then(
      function (res) {
        alert("Đăng Kí Thành Công");
      },
      function (error) {
        alert("false");
      }
    );
  };

  $scope.postdata = function (even) {
    var data = {
      id: Math.floor(),
      username: $scope.username,
      password: $scope.password,
      fullname: $scope.fullname,
      email: $scope.email,
      gender: $scope.gender,
      birthday: $scope.birthday,
      schoolfee: $scope.schoolfee,
      marks: $scope.marks,
    };
    $http.post("http://localhost:3000/listStudent", data).then(
      function (res) {
        alert("Thành Công");
      },
      function (error) {
        alert("false");
      }
    );
  };

  var dataApi = "http://localhost:3000/listStudent";
  $http.get(dataApi);
  $scope.IsLogin = false;

  if (sessionStorage.getItem("login")) {
    $scope.IsLogin = true;
    $scope.infor = angular.fromJson(sessionStorage.getItem("login"));
  }

  $http.get(dataApi).then(
    function (res) {
      $scope.datas = res.data;
      // console.log(res.data);
      $scope.Login = function () {
        console.log($scope.user);
        console.log($scope.pass);

        var use = checkLogin($scope.user, $scope.pass);
        console.log(use);
        if (use) {
          //save    
          $scope.infor = use;
          sessionStorage.setItem("login", angular.toJson(use));
          $scope.IsLogin = true;
          alert("thanh cong");

          // $("#modelId").modal("hide");
        } else {
          $scope.IsLogin = false;
          alert("Loiiii");
        }
      };
      function checkLogin(user, pass) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].username == user && res.data[i].password == pass) {
            return res.data[i];
          }
        }
        return false;
      }
    },
    function (error) {}
  );

  // doi mk

  $scope.logout = function () {
    sessionStorage.removeItem("login");
    $scope.IsLogin = false;
  };

  $scope.delete = function (i) {
    $scope.datas.splice(i, 1);
    // $http.delete('http://localhost:3000/listStudent'+id);
  };
});

// ---------------------------------------------------------------------------------------
app.controller("subjectsCtrl", function ($scope, $http) {
  $scope.list_subject = [];
  $http.get("db/Subjects.js").then(function (res) {
    $scope.list_subject = res.data;
  });
});

app.controller("quizCtrl", function ($scope, $http, $routeParams, quizFactory) {
  $http.get("db/Quizs/" + $routeParams.id + ".js").then(function (res) {
    quizFactory.questions = res.data;
  });
});

app.directive("quizfpoly", function (quizFactory, $routeParams) {
  return {
    restrict: "AE",
    scope: {},
    templateUrl: "text-quiz.html",
    link: function (scope, elem, attrs) {
      scope.start = function () {
        quizFactory.getQuestions().then(function () {
          scope.subName = $routeParams.Name;
          scope.id = 1;
          scope.quizOver = false; //chua hoan thanh
          scope.inProgess = true;
          scope.getQuestion();
        });
      };
      scope.resert = function () {
        scope.inProgess = false;
        scope.score = 0;
      };
      scope.getQuestion = function () {
        var quiz = quizFactory.getQuestion(scope.id);
        if (quiz) {
          scope.question = quiz.Text;
          scope.options = quiz.Answers;
          scope.answer = quiz.AnswerId;
          scope.answerMode = true;
        } else {
          scope.quizOver = true;
        }
      };
      scope.checkAnswer = function () {
        // alert('answer');
        if (!$("input[name = answer]:checked").length) return;
        var ans = $("input[name = answer]:checked").val();
        if (ans == scope.answer) {
          scope.score++;
          scope.correctAns = true;
        } else {
          // alert("sai");
          scope.correctAns = false;
        }
        scope.answerMode = false;
      };
      scope.nextQuestion = function () {
        scope.id++;
        scope.getQuestion();
      };
      scope.resert();
    },
  };
});

app.factory("quizFactory", function ($http, $routeParams) {
  return {
    getQuestions: function () {
      return $http
        .get("db/Quizs/" + $routeParams.id + ".js")
        .then(function (res) {
          questions = res.data;
          // alert(questions.length);
        });
    },
    getQuestion: function (id) {
      var randomItem = questions[Math.floor(Math.random() * questions.length)];
      var count = questions.length;
      if (count > 10) {
        count = 10;
      }
      if (id < count) {
        return randomItem;
      } else {
        return false;
      }
    },
  };
});

//login
