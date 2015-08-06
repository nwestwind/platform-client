module.exports = [
    '$scope',
    '$translate',
    '$routeParams',
    '_',
    'GlobalFilter',
    'savedSearch',
    function (
        $scope,
        $translate,
        $routeParams,
        _,
        GlobalFilter,
        savedSearch
    ) {
        // Set view based on route or set view
        $scope.currentView = function () {
            return $routeParams.view || savedSearch.view;
        };

        // Add set to the scope
        $scope.savedSearch = savedSearch;

        // Set the page title
        $translate('post.posts').then(function (title) {
            $scope.title = title;
            $scope.$emit('setPageTitle', title);
        });

        $scope.savedSearchOpen = {};
        $scope.savedSearchOpen.data = false;
        $scope.setSavedSearchOpen = function () {
            $scope.savedSearchOpen.data = !$scope.savedSearchOpen.data;
        };

        // Check if we can edit
        $scope.canEdit = function () {
            return _.contains(savedSearch.allowed_privileges, 'update');
        };

        // whenever the GlobalFilter post query changes,
        // update the current list of posts
        $scope.$watch(function () {
            return JSON.stringify(GlobalFilter.getPostQuery());
        }, function (newValue, oldValue) {
            $scope.filters = GlobalFilter.getPostQuery();
        });

        // Set initial filter state
        $scope.filters = savedSearch.filter;
        GlobalFilter.setSelected(savedSearch.filter);
    }
];
