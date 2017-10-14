var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.lat1= 39.95;
    $scope.lon1= -105.25;
    $scope.lat2= 39.52;
    $scope.lon2= -104.71;
    $scope.lat3= 39.95;
    $scope.lon3= -105.25;
    $scope.lat4= 39.52;
    $scope.lon4= -104.71;
    $scope.timeX= 0;
    $scope.timeY= 0;

    $scope.findDistance = function(x1, y1, x2, y2){
      var distance = Math.sqrt( (Math.pow( (x2-x1) , 2 )) + (Math.pow( (y2-y1) , 2 )) )
      return distance;
    }

    $scope.submitted= function(){
      var data1;
      var x=0;
      var y=0;
      var timeX=0;
      var timeY=0;
      var url1 = "http://www.mapquestapi.com/traffic/v2/incidents?key=8eZkPNpMd3IiGDKAe0CsVWdLWSVhLStG&boundingBox="+$scope.lat1+","+$scope.lon1+","+$scope.lat2+","+$scope.lon2;
      console.log(url1);
      $http({
      method : "GET",
      url : url1
      }).then(function mySuccess(response) {
          console.log(response.data.incidents);
          data1=response.data.incidents;
          for (var i = 0; i<=data1.length-1; i++) {
            if (data1[i].impacting===false) {
              console.log(data1[i]);
              console.log(i);
              break;
            }
          }
          x=$scope.findDistance(data1[0].lat, data1[0].lng, data1[i].lat, data1[i].lng);
          console.log(x);
          var data2;
          var url2 = "http://www.mapquestapi.com/traffic/v2/incidents?key=8eZkPNpMd3IiGDKAe0CsVWdLWSVhLStG&boundingBox="+$scope.lat3+","+$scope.lon3+","+$scope.lat4+","+$scope.lon4;
          console.log(url2);
          $http({
          method : "GET",
          url : url2
          }).then(function mySuccess(response) {
              console.log(response.data.incidents);
              data2=response.data.incidents;
              for (var i = 0; i<=data2.length-1; i++) {
                if (data2[i].impacting===false) {
                  console.log(data2[i]);
                  console.log(i);
                  break;
                }
              }
              y=$scope.findDistance(data2[0].lat, data2[0].lng, data2[i].lat, data2[i].lng);
              console.log(y);
              var totalTime = 120; //2minutes
              $scope.timeX=x*totalTime / (x+y);
              console.log($scope.timeX);
              $scope.timeY=y*totalTime / (x+y);
              console.log($scope.timeY);
          }, function myError(response) {
              console.log(response.statusText);
          });


      }, function myError(response) {
          console.log(response.statusText);
      });

  }
});
