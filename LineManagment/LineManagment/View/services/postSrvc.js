function postService($http) {
    function Service() {

        
        this.postSrvc = function (personId, suppCodeId, ok, ko) {
            var data = new lineModel(personId, suppCodeId);
            

            $http.post('/api/Linemange/orderline/All', data).then(function (response)
            {
                ok(response.data);
            },
            function (error)
            {
                if (ko) ko(error);
            });
        };

        this.posBysup = function (suppCodeId,ok,ko) {
            
            $http.post('/api/Linemange/BySupp/ThelineBySupp', suppCodeId).then(function (response) {
            

                ok(response.data.map(function (item) {
                    return new lineModel(item.PersonId, item.SuppCodeId, item.NameServTyp);

                }));
            },
            function (error) {
                if (ko) ko(error), alert(null);
            });
        };
        this.postDeal = function (personid, supplier, dealp, ok, ko) {
            var data = new lineModel();
            data.PersonId = personid;
            data.SuppCodeId = supplier;
            data.Deal_setPrice = dealp;
            $http.post('/api/Linemange/orderline/deal', data).then(function (response) {


                ok(response.data);
            },
                function (error) {
                    if (ko) ko(error), alert(null);
                });
        };
        this.postpersonId = function (id, name, ok, ko) {
            var data = new PersonModel(id, name);

            $http.post('/api/Linemange/person/Theline', data).then(function (response) {
                ok(response.data);

            }, function (error) {
                if (ko) ko(error);
            });
        };
        this.deletePerson = function (id, supcode, ok, ko) {
            var data = new lineModel();
            data.PersonId = id;
            data.SuppCodeId = supcode;
            $http.post('/api/Linemange/orderline/remove', data).then(function (response) {
                ok(response.data);

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