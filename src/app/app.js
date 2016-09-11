'use strict';

angular.module('app', [
        'ui.router',
        'app.templates',
        'app.shared',
        'app.main'
    ])
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })

    .run(function ($rootScope, $state) {
        //redirect from http://stackoverflow.com/questions/29491079/redirect-a-state-to-default-substate-with-ui-router-in-angularjs
        $rootScope.$on('$stateChangeStart', function (evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params)
            }
        });
    });