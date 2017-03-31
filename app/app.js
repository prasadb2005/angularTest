//Define an angular module for our app
var app = angular.module('myApp', []);



app.controller('incomeController', function($scope, $http){
  getIncomeRecords();
  getExpenseRecords();

  $scope.contents = null;

  $scope.showEditPanel = function(){
    $scope.templateURL = 'partials/contents.html';
  };

  $scope.showSummary = function(){
    $scope.templateURL = 'partials/summary.html';
  };

  $scope.removeRow = function(id){
    $http.post("ajax/removeRow.php?id="+id).success(function(){
            //alert("row removed");
            getIncomeRecords();
            getExpenseRecords();
          });
  };

  $scope.addRow = function(type){
    type === 1 ? $scope.showNewIncomeRow = true : $scope.showNewExpenseRow = true;
    ;
  };

  $scope.saveRow = function(newProduct, newAmount, type){
    $scope.showNewIncomeRow = false;
    $scope.showNewExpenseRow = false;
    $scope.newProduct = "test";
    $scope.newAmount = 100;
    var newRowToAdd = {
      amount:newAmount,
      date: new Date().toLocaleString(),
      month:$scope.selectedMonth,
      productName:newProduct,
      type:type,
      year:$scope.selectedYear
    }
    if(type === 1){
      $scope.incomeValues.push(newRowToAdd);
    }
    else{
      $scope.expenseRecords.push(newRowToAdd);
    }

//        $http.post("ajax/addRow.php?type="+type+"&productName="+$scope.newProduct+"&amount="+$scope.newAmount+"&month="+$scope.selectedMonth+"&year="+$scope.selectedYear).success(function(){
//            //alert("row added");
//            getIncomeRecords();
//            getExpenseRecords();
//        });
};

function getIncomeRecords(){
  $http.post("ajax/getIncomeRecords.php").success(function(data){
    console.log(data);
    $scope.incomeValues = data;
    $scope.incomeTotal = 0;
    $scope.incomeValues.forEach(function(incomeRow){
      $scope.incomeTotal+= parseInt(incomeRow.amount);
    });
  });
};

function getExpenseRecords(){
  $http.post("ajax/getExpenseRecords.php").success(function(data){

    $scope.expenseRecords = data; 
    $scope.expenseTotal = 0;
    $scope.expenseRecords.forEach(function(expenseRow1){
      $scope.expenseTotal+= parseInt(expenseRow1.amount);

    });
  });
};



function getIncomeRecordsByMonthYear(){
  $http.post("ajax/getIncomeRecordsByMonthYear.php?month="+$scope.selectedMonth+"&year="+$scope.selectedYear).success(function(data){
    $scope.incomeValues = data;
    $scope.incomeTotal = 0;
    $scope.incomeValues.forEach(function(incomeRow){
      $scope.incomeTotal+= parseInt(incomeRow.amount);
    });
  });
};

function getExpenseRecordsByMonthYear(){
  $http.post("ajax/getExpenseRecordsByMonthYear.php?month="+$scope.selectedMonth+"&year="+$scope.selectedYear).success(function(data){
    $scope.expenseRecords = data; 
    $scope.expenseTotal = 0;
    $scope.expenseRecords.forEach(function(expenseRow){
      $scope.expenseTotal+= parseInt(expenseRow.amount);

    });
  });
};
$scope.showRecordsByMonthYear = function() {
  getIncomeRecordsByMonthYear();
  getExpenseRecordsByMonthYear();
}

$scope.months = {1:"Jan",2:"Feb",3:"Mar", 
4:"Apr",5:"May",6:"Jun", 
7:"July",8:"Aug",9:"Sept", 
10:"Oct",11:"Nov",12:"Dec"
};
$scope.years = [];

for(var i=2000;i<2020;i++) {
  $scope.years.push(i);
}
});

app.controller('summary', function($scope, $http){
  $scope.tags=[];
  getSummary();
  getTags();
  
  // $http.get('./expenses.json')
  // .success(function(data) {
  //   $scope.expenseData=data;
  //   $scope.months = [], $scope.monthlyExpenses = {};
  //   $scope.expenseData.forEach(function(tempExpenseRow){
  //     $scope.months.push(tempExpenseRow.month);
  //     $scope.monthlyExpenses[tempExpenseRow.month] = tempExpenseRow;

  //     if(!$scope.tags.length){
  //       for (var value in tempExpenseRow) {

  //         $scope.tags.push(value);
  //       }
  //       }
  //   });
  // })
  // .error(function(data,status,error,config){
  //   $scope.expenseDataError = [{heading:"Error",description:"Could not load json   data"}];
  // });
  function getSummary(){
  $http.post("ajax/getSummary.php").success(function(data){
    
    $scope.summaryRecords = data; 
    $scope.expenseData=$scope.summaryRecords;
  $scope.months = ["jan", "feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec",], $scope.monthlyExpenses = {};
    $scope.expenseData.forEach(function(tempExpenseRow){
      //$scope.months.push(tempExpenseRow.month);
      $scope.monthlyExpenses[tempExpenseRow.month] = tempExpenseRow;

      /*if(!$scope.tags.length){
        for (var value in tempExpenseRow) {
          $scope.tags.push(value);
        }
        }*/
    });
    
  });
};
function getTags(){
  $http.post("ajax/getTags.php").success(function(data){
    $scope.tags = data;

  });
};

});
app.controller('tasksController', function($scope, $http) {
  getTask(); // Load all available tasks 
  function getTask(){  
    $http.post("ajax/getTask.php").success(function(data){
      $scope.tasks = data;
    });
  };
  $scope.addTask = function (task) {
    $http.post("ajax/addTask.php?task="+task).success(function(data){
      getTask();
      $scope.taskInput = "";
    });
  };
  $scope.deleteTask = function (task) {
    if(confirm("Are you sure to delete this line?")){
      $http.post("ajax/deleteTask.php?taskID="+task).success(function(data){
        getTask();
      });
    }
  };

  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
    $http.post("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data){
      getTask();
    });
  };


});
