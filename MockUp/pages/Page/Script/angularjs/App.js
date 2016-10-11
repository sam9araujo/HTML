var app = angular.module('CertificateApp', []);
app.controller("CertificateController", function ($scope, $http) {
    $http.get('http://developerexam.equityplansdemo.com/test/sampledata').
      success(function (data, status, headers, config) {
          $scope.certificates = data;
         
      }).
      error(function (data, status, headers, config) {
          alert("erro");
      });
	  
	  $scope.$watchCollection('certificates', function () {
        $scope.totalNumberOfShares = 0;
        $scope.totalNumber = 0;
        $scope.totalValueOfShares = 0;
        angular.forEach($scope.certificates, function (value, key) {
            $scope.totalNumberOfShares += value.numberOfShares;
            
            
        })

        $scope.sum = function (number,value) {
            $scope.totalNumber += number;
            var s = 0;
            s += value;
            $scope.totalValueOfShares = s * $scope.totalNumber;
        };
       
        $scope.totalValueOfShares = 0.00;
    });

$http.get(' http://developerexam.equityplansdemo.com/test/fmv').
     success(function (data, status, headers, config) {
         $scope.Current = data;

     }).
     error(function (data, status, headers, config) {
         alert("erro");
     });
	 

	 $scope.Confirme = function(totalNumber){
		 
		if(totalNumber == 0){
			alert('Must sell at least 1 share!');
		}else{
			var message = "Certificate ID: ";
			var msg = "Try to sell more than 50%: ";
			angular.forEach($scope.certificates, function (value, key) {
				if(value.numberOfShares < value.number){
					message += value.certificateId + ";"
				}
				
				if((value.numberOfShares / 2) > value.number ){
					msg+= value.certificateId + ";"
				}
				
				
				});
				if($scope.NotAllow == "" || $scope.NotAllow == "" ){
						$scope.NotAllow = "Not be allowed sell more than the shares: " + message;
						$scope.Warning = msg;
						
				}else{
					$http.post('https://localhost/api/saleofshares', JSON.stringify(data)).then(function (response) {
					if (response.data)
						$scope.MgsEnd = "Done";
						}, function (response) {
						$scope.MgsEnd = "Service not Exists";
					});
				}

		}

	 }
    
});

app.filter("mydate", function () {
    var re = /\/Date\(([0-9]*)\)\//;
    return function (x) {
        var m = x.match(re);
        if (m) return new Date(parseInt(m[1]));
        else return null;
    };
});
