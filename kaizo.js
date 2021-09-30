var doc = document.innerHTML

var alaunch = new Game.Achievement("New Player", "Launched Kaizo Cookie Clicker.", [29, 2], 0)
var aprice = new Game.Achievement("Price Inflation", "Buy an item that has increased in base price by 20 cookies.", [29, 2], 0)
var apatience = new Game.Achievement("Patience", "Buy the farm.", [29, 2], 0)
var adisappointed = new Game.Achievement("Disappointment", "Buy a cursor.", [29, 2], 0)
var apain = new Game.Achievement("Pain", "Buy a grandma.", [29, 2], 0)

Game.registerMod("Kaizo Cookie Clicker", {
    init:function() {
        var resets = 0
        const maximum = 10
        if (!l('bakerySubtitle')) l('bakeryName').insertAdjacentHTML('afterend','<div id="bakerySubtitle" class="title" style="text-align:center;position:absolute;left:0px;right:0px;bottom:32px;font-size:12px;pointer-events:none;text-shadow:0px 1px 1px #000,0px 0px 4px #f00;opacity:0.8;"></div>');
		l('bakerySubtitle').textContent="Kaizo Cookie Clicker - By RedBigz";
        Game.registerHook("draw", () => {
            Game.bakeryNameL.innerHTML = Game.bakeryName
        })
        Game.registerHook('cps',function(cps){return cps/10;});
        Game.registerHook('check', function() {
            for (o in Game.Objects) {
                a = Game.Objects[o]
                a.basePrice += 1
                a.refresh()
                if (a.bought > 0) {
                    if (o == "Grandma") {
                        Game.Win("Pain")
                    }
                    if (o == "Cursor") {
                        Game.Win("Disappointment")
                    }
                    if (o == "Farm") {
                        Game.Win("Patience")
                    }
                    if ((a.basePrice - a.realprice) >= 20) {
                        Game.Win("Price Inflation")
                    }
                }
            }
        })

        Game.registerHook("ticker", function() {return [
            "Your cookies are criticized as 'overpriced'.", "Your cookie recipe is terrible.", "1% of your neighborhood buys your cookies.", "Good luck getting the farm!", "Better speedrun this thing! Prices increase every few seconds!"
        ]})

        
        for (o in Game.Objects) {
            a = Game.Objects[o]
            a.basePrice = a.basePrice * 5
            a.realprice = a.basePrice
            a.refresh()
        }

        Game.Notify("Kaizo Cookie Clicker Mod", "By RedBigz")

        Game.BGsByChoice[9].pic = 'storeTile'
        Game.UpgradesById[414].choicesPick(9)

        Game.Win("New Player")
        //setTimeout(() => {
        //    Game.BGsByChoice[9].pic = '404'
        //}, 1000)
    },/*
    save:function() {
        var save = ""
        if (alaunch.won) save += "a";
        else save += "b";
        if (aprice.won) save += "a";
        else save += "b";
        if (apatience.won) save += "a";
        else save += "b";
        if (adisappointed.won) save += "a";
        else save += "b";
        if (apain.won) save += "a";
        else save += "b";
        return save
    }*/
})
document.innerHTML = doc