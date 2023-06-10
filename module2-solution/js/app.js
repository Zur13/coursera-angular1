(function () {
    'use strict';

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .controller('BoughtListController', BoughtListController)
        .provider('ShoppingListService', ShoppingListServiceProvider)
        .config(Config);

    Config.$inject = ['ShoppingListServiceProvider'];
    function Config(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.items = [
            {name: "pizza", quantity: 1},
            {name: "cookies", quantity: 2},
            {name: "candies", quantity: 3},
            {name: "chocolate bars", quantity: 4},
            {name: "cola", quantity: 5},
        ];
    }


    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
        let list = this;

        list.items = ShoppingListService.getItems();

        //list.index = "";

        list.markItemBought = function (index) {
            try {
                ShoppingListService.markItemBought(index);
            } catch (error) {
                list.errorMessage = error.message;
            }
        };

    }


    BoughtListController.$inject = ['ShoppingListService'];
    function BoughtListController(ShoppingListService) {
        let list = this;

        list.items = ShoppingListService.getBoughtItems();

    }


// If not specified, maxItems assumed unlimited
    function ShoppingListService(itemsDefault, itemsBoughtDefault) {
        let service = this;

        // List of items to buy
        let items = itemsDefault;
        let itemsBought = itemsBoughtDefault;

        service.markItemBought = function (itemIndex) {
            if (itemIndex !== undefined && items.length > itemIndex) {
                let res = items.splice(itemIndex, 1);
                console.log("Service markItemBought(): ", res);
                itemsBought.push(res[0]);
            } else {
                throw new Error("No item with index " + itemIndex + " exist.");
            }
        };

        service.getItems = function () {
            console.log("Service getItems(): ", items);
            return items;
        };

        service.getBoughtItems = function () {
            console.log("Service getBoughtItems(): ", itemsBought);
            return itemsBought;
        };
    }


    function ShoppingListServiceProvider() {
        let provider = this;

        provider.defaults = {
            items: [],
            bought: []
        };

        provider.$get = function () {
            let shoppingList = new ShoppingListService(provider.defaults.items, provider.defaults.bought);
            console.log("Provider init service with  default items: ", provider.defaults.items);
            console.log("Provider init service with  default bought items: ", provider.defaults.bought);
            return shoppingList;
        };
    }

})();
