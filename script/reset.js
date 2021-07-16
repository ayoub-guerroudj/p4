$("body").ready(function(){
    $("#reset").hide();
    $('#jeu').ready(function () {
        var p4;
        $("#start").on("click", function(){
            $("button").attr("disabled","disabled");
            $("input").attr("disabled","disabled");
            $("select").attr("disabled","disabled");
            $("#reset").hide();
            $("#endG").hide();
            $("#tour").show();
            $("#Score").hide();
            $("#jeu").empty();
            p4 = new P4("#jeu", $("#X")[0].value, $("#Y")[0].value, $("#couleur0")[0].value, $("#couleur1")[0].value);
        })

        $("#reset").on("click", function(){
            $("button").attr("disabled","disabled");
            $("input").attr("disabled","disabled");
            $("select").attr("disabled","disabled");
            $("#reset").hide();
            $("#endG").hide();
            $("#tour").show();
            $("#jeu").empty();
            p4.drawGame();
            p4.click();
            p4.win();
            $("#undo").hide();
        })
    })
})