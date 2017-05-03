function LinemanageCtrl($scope, $http, $mdDialog, getService, postService) {
    var getSrv = getService();
    var postIt = postService();
  
    $scope.state =
        {showThis:false,
            loaded: false,
            lineBy: false
        };
    $scope.regex = { string: '\\w+', numbers: '\\d+', vaild: function (vaild) { if (vaild=== true) { }; }};
    
    

    var actions =
        {
            getallSrvc: getSrv.getAllsrvc(function (allsrvc) { $scope.serviceTyps = allsrvc; $scope.state.loaded = true; }),
            postperson: function postPerson(id, newName) { postIt.postpersonId(id, newName, function (vaild) { console.log(vaild); }); },
            postsrv: function postSrv(id, slctSrvc) { postIt.postSrvc(id, slctSrvc, function (vaild) { console.log(vaild); refreshData(); }); },
            postsetprice: function postSetprice(id, supp, dprice) { postIt.postDeal(id, supp, dprice, function (vaild) { console.log(vaild); }); },
            postlastupdate: function postlastUpdate(id, supp, price, sup) { postIt.postDeal(id, supp, price, function (vaild) { console.log(vaild); }); actions.postsrv(id, sup); }
        };
     
     function refreshData()
     {
         getSrv.getsrvcBySupp(function (bysupp) { $scope.bySupplier = bysupp; });
         getSrv.getLine(function (liner) { $scope.lineOrder = liner; });
     };

     onload = refreshData(), actions.getallSrvc;
     

     $scope.insertNewperson = function ()
    {

         $mdDialog.show({
             controller: DialogController,
             templateUrl: '/View/pages/InsertPersonDialog.html',
             parent: angular.element(document.body),
         
             clickOutsideToClose: false,
             locals: { SrvcName: $scope.serviceTyps },
             fullscreen: $scope.customFullscreen
         })
             .then(function (answer) {
                 getSrv.getperson(function (person) {

                     var id = person[0];
                     id.Id += 1;

                     actions.postperson(id.Id, answer.Name);
                     actions.postsrv(id.Id, answer.SupplierCode);



                 });



             }, function () {



             });
         function DialogController($scope, $mdDialog, SrvcName) {

             $scope.SrvNme = SrvcName;


             $scope.cancel = function () {
                 $mdDialog.cancel();
             };

             $scope.answer = function (answer) {

                 $mdDialog.hide(answer);


             };
         };

     
    

    };   

    $scope.slctSupplier = function (item) {  
        $scope.slctSupplier.slctSup = item.NameServTyp;
        $scope.state.lineBy = true;

     };
    $scope.personActions = { setDeal: function (item) { $scope.isSet = true; modifyStatus(item) }, updatePerson: function (item) { $scope.isSet = false; modifyStatus(item); }, deletePerson: function (item) { postIt.deletePerson(item.PersonId, item.SuppCodeId, function (vaild) { console.log(vaild); refreshData(); }); } };
    $scope.setDeal = function (item) { $scope.isSet = true; modifyStatus(item); };
    $scope.updatePerson = function (item) { $scope.isSet = false; modifyStatus(item);};
        function modifyStatus(item) {        
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/View/pages/PersonDialog.html',
            parent: angular.element(document.body),
            targetEvent: item,
            clickOutsideToClose: false,
            locals: { details: item, SrvcName: $scope.serviceTyps, Status: $scope.isSet },
            fullscreen: $scope.customFullscreen 
        })
            .then(function (answer) {
                if (answer.state.toDelete === true) { postIt.deletePerson(answer.PersonId, answer.SuppCodeId, function (vaild) { console.log(vaild); refreshData(); }); }
                else if (answer.state.statue === true) { actions.postsetprice(answer.PersonId, answer.SuppCodeId, answer.Deal_setPrice); refreshData(); } else { actions.postlastupdate(answer.PersonId, answer.SuppCodeId, answer.Price, answer.state.SupplierCode); }

            }, function () {
              
               

                });
        function DialogController($scope, $mdDialog, details, SrvcName, Status) {
            $scope.currnetPerson = details;
            $scope.currnetPerson.state = { statue: Status, Suppliercode: 0, toDelete: false };
            $scope.SrvNme = SrvcName;
            $scope.digits = {};


            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {

                $mdDialog.hide(answer);


            };
        };

    };
   

   
        

    


    }
