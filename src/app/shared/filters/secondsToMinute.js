angular.module('app.shared')
    .filter('secondsToMinute', function () {
        return function (value) {
            return Math.floor(value / 60);
        }
    });