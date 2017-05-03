function getService($http) {
    function Service() {

        this.getperson = function (ok, ko) {
            $http.get('/api/Linemange/person/Theline').then(function (response) {

                ok(response.data)
                    
                    
                

            }, function (error) {
                if (ko) ko(error);
            });
        };

        this.getAllsrvc = function (ok, ko) {
            $http.get('/api/Linemange/orderline/ServiceTypes').then(function (response) {

                ok(response.data.map(function (item) {
                    return new srvcTypModel(item.SupplierCode, item.Service);

                }));

            }, function (error) {
                    if (ko) ko(error);
                });
        };


        this.getLine = function (ok, ko) {
            $http.get('/api/Linemange/orderline/All', { cache: false }).then(function (response) {

                ok(response.data.map(function (item) {
                    return new lineModel(item.PersonId, item.SuppCodeId, item.NameServTyp, item.DateAndTime);

                }));

            }, function (error) {
                    if (ko) ko(error);
                });
        };


        this.getsrvcBySupp = function (ok, ko) {
            $http.get('/api/Linemange/BySupp/ThelineBySupp').then(function (response) {

                ok(response.data.map(function (item) {
                    return new bySupp(item.TotalinLine, item.SuppCodeId, item.NameServTyp);

                }));

            }, function (error) {
                if (ko) ko(error);
            });
        };
    }

    var service;

    return function () {
        if (!service) service = new Service();

        return service;
    };
}