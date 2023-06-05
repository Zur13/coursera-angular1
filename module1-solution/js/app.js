(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LCheckController', LCheck);

    LCheck.$inject = ['$scope'];

    function LCheck($scope) {
        $scope.onCheckMenuClick = onCheckMenuClick;
        $scope.lunchMenu = "";
        $scope.messageHidden = true;
        $scope.messageText = '';

        function onCheckMenuClick() {
            let sList = $scope.lunchMenu;
            if (!sList) {
                // empty list
                showMessage('Please enter data first')
            } else {
                let aList = sList.split(',');
                if (aList.length > 3) {
                    showMessage('Too much!');
                } else {
                    showMessage('Enjoy!');
                }
            }
        }

        function showMessage(msg) {
            if (msg) {
                $scope.messageHidden = false;
                $scope.messageText = msg.toString();
            } else {
                $scope.messageHidden = true;
                $scope.messageText = '';
            }
        }
    }


})();