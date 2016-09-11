'use strict';

angular.module('app.main')

    .controller('MainCtrl', function () {
        var ctrl = this;
        ctrl.row = initRows();
        ctrl.onChange = onChange;
        ctrl.changePocetOsob = changePocetOsob;
        ctrl.changePocetPoloziek = changePocetPoloziek;

        function initRows() {
            var firstRow = {
                pocetOsob:1,
                pocetPoloziek:1
            };
            onChange(firstRow);
            return [firstRow];
        }

        function onChange(row) {
            row.vysledok = row.pocetOsob * 41 + row.pocetPoloziek*3;
        }

        function changePocetOsob(row, pocet) {
            row.pocetOsob = row.pocetOsob + pocet;
            onChange(row);
        }

        function changePocetPoloziek(row, pocet) {
            row.pocetPoloziek = row.pocetPoloziek + pocet;
            onChange(row);
        }

    });