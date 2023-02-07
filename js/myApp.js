

var app = angular.module("myApp",["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/gioithieu",{
        templateUrl:"gioithieu.html"
    })
    .when("/trangchu",{
        templateUrl:"trangchu.html"
    })
    .when("/lienhe",{
        templateUrl:"lienhe.html"
    })
    .when("/quiz",{
        templateUrl:"text-quiz.html"
    })
});

