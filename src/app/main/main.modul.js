angular.module('app.main', [])

    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/view/main.html',
                controller: 'MainCtrl',
                controllerAs: 'ctrl'
            })
    })
;