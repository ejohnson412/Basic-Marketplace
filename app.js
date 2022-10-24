
App = {
    init: async function() {
        console.log("init is called");

        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();

            document.getElementById("wallet").innerText = 
            "Your wallet address is:  " + userAddress;

        $.getJSON("../sampleData.json", function (data) {
            console.log(data);
            var allItemsDiv = $("#addItems");
            var itemTemplate = $("#itemTemplate");
            for(i=0; i< data.length; i++) {
                itemTemplate.find(".itemName").text(data[i].itemName);
                itemTemplate.find(".itemOwner").text(data[i].itemOwner);
                itemTemplate.find(".itemCreator").text(data[i].itemCreator);
                itemTemplate.find(".askingPrice").text(data[i].askingPrice);
                itemTemplate
                    .find(".itemStatus")
                    .text(data[i].isSold ? "Sold" : "Available");
                itemTemplate.find(".buy_btn").attr("data-id", data[i].id);

                if(data[i].isSold)  {
                    itemTemplate.find(".buy_btn").hide();
                } else {
                    itemTemplate.find(".buy_btn").show();
                }
                allItemsDiv.append(itemTemplate.html());
            }
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on("click", ".btn_add", App.handleAdd);
        $(document).on("click", " .buy_btn", {id: this.id}, App.handleBuy);

    },
    handleAdd: function() {
        console.log("handling add item..");
    },

    handleBuy: function(event){
        var productId = parseInt($(event.target).data("id"));
        console.log("handling buying product with id" + productId);
    }
};

$(function(){
    $(window).load(function(){
        App.init();
    });
});