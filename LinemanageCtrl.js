function LinemanageCtrl($scope, $http, $mdDialog, PersonSrvc, SelectSrvc) {
    var getThis = PersonSrvc();
    var postThis = SelectSrvc();
    var lastPerson, id, slctSrvc, newName;

    $scope.state =
        {
            loaded: false,
            startline: true,
            lineBy: false,
            log:false
        };
    $scope.result = '';
    postThis.getSrvc(function (allsrvc) {

        $scope.serviceTyps = allsrvc;
        
        // $scope.state.loaded = true;
    });


    function refreshData() {
        getThis.getsrvcBySupp(function (bysupp) { $scope.bySupplier = bysupp; });
        postThis.getLine(function (liner) { $scope.lineOrder = liner; });
    };


    //$scope.selectServiceforPerson = function (selectedService)
    //{

    //getThis.getperson(function (person)
    // {
    //     lastPerson = person;
    //  id = lastPerson.length + 1;
    //  newName = selectedService.Name;
    //  slctSrvc = selectedService.SuppCodeId;
    //  getThis.postpersonId(id, newName, function (vaild) { console.log(vaild); refreshData(); });
    //  postThis.postSrvc(id, slctSrvc, function (vaild) { console.log(vaild); refreshData(); });

    // });     
    // $scope.state.startline = true;

    //};

    refreshData();

    $scope.slctSupplier = function (item) {  /*V2- only data filter*/
        $scope.slctSupplier.slctSup = item.SuppCodeId;

        ///*v1-postand get*/
        // postThis.posBysup(item, function (byS) {

        //     $scope.lineOrder = byS; 

        // }, function (vaild) { console.log(vaild);  });

        $scope.state.lineBy = true;

    };
    $scope.setDeal = function (item) {
        postThis.postDeal(item.PersonId, item.Deal_setPrice, function (vaild) { console.log(vaild); refreshData(); });
        
    };
    

    $scope.updateLine = function (item) {      
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'PersonDialog.html',
            parent: angular.element(document.body),
            targetEvent: item,
            clickOutsideToClose: false,
            locals: { details: item, SrvcName: $scope.serviceTyps },
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function (amswer) { var data= answer; $scope.setDeal(data); }, function (){ alert('Canceled'); });
        };

    function DialogController($scope, $mdDialog, details, SrvcName) {
        $scope.currnetPerson = details;
        $scope.SrvNme = SrvcName;
        $scope.getSelectedInfo = function () {
            if ($scope.selectedSrvc !== undefined) {
                return "You have selected:" + $scope.selectedSrvc + " to modify?";
            } else {
                return "Your service";
            }
        };


        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {


            $mdDialog.hide(answer);
        };
    };


    }

