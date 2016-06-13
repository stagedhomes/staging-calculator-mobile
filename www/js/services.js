(function() {
    angular.module("starter.services", [])
        .constant("commonVariables", {
            cdnUrl: "https://d2itdnqewolu1g.cloudfront.net/"
        }) // constant("commonVariables")

        .factory("factoryROSI", function() {
            var facrosi = {};

            // Store ROSI values
            facrosi.userValues = {
                // Values from user.
                monthsBeforeASPStaged: 0.4,
                monthsBeforeNotASPStaged: 3.0,
                mortgageAmount: null,
                utilityAndFees: null,
                stagingInvestment: null
            }; // userValues

            facrosi.userResults = {
                // Return on Staging Investment (ROSI)
                numCostUnstaged: null,
                numCostStaged: null,
                numSavingsStaged: null,
                numRosi: null
            }; // userResults

            // Variable that holds the contents of history.
            facrosi.historyValues = [];

            /* --------------------------------------------
                Getters
            -------------------------------------------- */
            // Return user values.
            facrosi.getUserValues = function() {
                return facrosi.userValues;
            }; // getValues()

            // Return results.
            facrosi.getUserResults = function() {
                return facrosi.userResults;
            }; // getUserResults()

            facrosi.getHistoryValues = function() {
                return facrosi.historyValues;
            }; // getHistoryValues

            /* --------------------------------------------
                Setters
            -------------------------------------------- */
            facrosi.setUserResults = function(unstagedCost, investment, savingsASPStaged, rosiResult) {
                facrosi.userResults.unstagedCost = unstagedCost;
                facrosi.userResults.investment = investment;
                facrosi.userResults.savingsASPStaged = savingsASPStaged;
                facrosi.userResults.rosiResult = rosiResult;
            }; // setUserResults(unstagedCost, investment, savingsASPStaged, rosiResult)

            return facrosi;
        }) // .factory("factoryROSI")
    ; // angular.module("starter.services", [])
})(); // function()
