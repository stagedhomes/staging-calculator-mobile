(function() {
    angular.module('starter.controllers', [])

        .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function() {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function() {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function() {
                console.log('Doing login', $scope.loginData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function() {
                    $scope.closeLogin();
                }, 1000);
            };
        })

        // Main controller for application.
        .controller("CtrlROSI", ["$scope", "$state", "localStorageService", "commonVariables", "factoryROSI", function($scope, $state, localStorageService, commonVariables, factoryROSI) {
            // Add global variables to $scope.
            $scope.commonVariables = commonVariables;

            // Get values from factory.
            $scope.userValues = factoryROSI.getUserValues();
            $scope.userResults = factoryROSI.getUserResults();
            $scope.historyValues = factoryROSI.getHistoryValues();

            // Get values from localStorage
            if(localStorageService.get("historyValues") === null) {
                $scope.historyValues = [];
            } else {
                $scope.historyValues = localStorageService.get("historyValues");
            } // if

            $scope.calculateROSI = function() {
                /* -----------------------------------------------------------------
                    Do ROSI calculations here.
                ----------------------------------------------------------------- */

                // Redirect user to home if input values are missing
                // Cost to Sell Your Home Unstaged
                $scope.userResults.numCostUnstaged = (
                    parseFloat($scope.userValues.mortgageAmount) +
                    parseInt($scope.userValues.utilityAndFees)) *
                    parseFloat($scope.userValues.monthsBeforeNotASPStaged)
                ; // userResults.unstagedCost

                // Cost to Sell Your Home Staged
                $scope.userResults.numCostStaged = (
                    parseFloat($scope.userValues.mortgageAmount) +
                    parseInt($scope.userValues.utilityAndFees)) *
                    parseFloat($scope.userValues.monthsBeforeASPStaged) +
                    parseInt($scope.userValues.stagingInvestment)
                ; // userResults.investment

                // Savings When You SELL Your Home ASP® Staged
                $scope.userResults.numSavingsStaged =
                    $scope.userResults.numCostUnstaged -
                    $scope.userResults.numCostStaged
                ; // userResults.savingsASPStaged

                // Return on Staging Investment (ROSI)
                $scope.userResults.numRosi =
                    (($scope.userResults.numSavingsStaged /
                    parseInt($scope.userValues.stagingInvestment)) * 100).toFixed(2)
                ; // userResults.numRosi

                /* -----------------------------------------------------------------
                    Add to history array.
                ----------------------------------------------------------------- */
                // Get current date.
                var $currentDate = new Date().toISOString().slice(0,10);

                // Add to history array.
                $scope.historyValues.push({
                    id: $scope.historyValues.length + 1,

                    // User Provided Values
                    monthsBeforeASPStaged: parseFloat($scope.userValues.monthsBeforeASPStaged),
                    monthsBeforeNotASPStaged: parseFloat($scope.userValues.monthsBeforeNotASPStaged),
                    mortgageAmount: parseInt($scope.userValues.mortgageAmount),
                    utilityAndFees: parseInt($scope.userValues.utilityAndFees),
                    stagingInvestment: parseInt($scope.userValues.stagingInvestment),

                    // ROSI Results
                    numCostUnstaged: parseInt($scope.userResults.numCostUnstaged),
                    numCostStaged: parseInt($scope.userResults.numCostStaged),
                    numSavingsStaged: parseInt($scope.userResults.numSavingsStaged),
                    numRosi: parseFloat($scope.userResults.numRosi),

                    // Timestamp
                    dateSubmitted: $currentDate
                }); // historyValues.push

                // Add to local storage.
                localStorageService.set("historyValues", $scope.historyValues);

                // View contents of array via console. Delete when site is published.
                console.log($scope.historyValues);

                // View Results
                $state.go("app.results");
            }; // calculateROSI()

            $scope.clearHistory = function() {
                // Clear factory.
                $scope.historyValues = [];
                localStorageService.set("historyValues", $scope.historyValues);

                // Reset values from Home.
                $scope.userValues = {
                    monthsBeforeASPStaged: 0.4,
                    monthsBeforeNotASPStaged: 3.0,
                    mortgageAmount: null,
                    utilityAndFees: null,
                    stagingInvestment: null
                }; // userValues

                // Displays modal to let user know values are cleared.
                // $(".clear-history-modal-sm").modal("show");
            }; // clearHistory
        }]) // controller("CtrlROSI")

        .controller('PlaylistsCtrl', function($scope) {
            $scope.playlists = [
                { title: 'Reggae', id: 1 },
                { title: 'Chill', id: 2 },
                { title: 'Dubstep', id: 3 },
                { title: 'Indie', id: 4 },
                { title: 'Rap', id: 5 },
                { title: 'Cowbell', id: 6 }
            ];
        })

        .controller('PlaylistCtrl', function($scope, $stateParams) {
        })
    ; // angular.module
})();
