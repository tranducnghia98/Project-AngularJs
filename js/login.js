var app = angular.module("myApp", []);



app.controller("registration", function ($scope, $http,$rootScope) {
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
        alert("success");
        
       
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
        // console.log($scope.user);
        // console.log($scope.pass);

        var use = checkLogin($scope.user, $scope.pass);
        // console.log(use)
        if (use) {
          //save
          sessionStorage.setItem("login", angular.toJson(use));
          $scope.IsLogin = true;
          alert("thanh cong");
          
          $scope.infor = use;
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
  $scope.logout = function () {
    sessionStorage.removeItem("login");
    $scope.IsLogin = false;
  };
  


  $scope.delete = function (i) {
    $scope.datas.splice(i, 1);   
  };
});
