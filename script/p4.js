class P4 {
    constructor(selector, x = 7, y = 6, c0, c1) {
        this.COL = x;
        this.LGN = y;
        this.id = 0;
        this.j1 = 0;
        this.j0 = 0;
        this.c1 = c1;
        this.c0 = c0;
        this.selector = selector;

        if (this.c1 == this.c0) {
            this.c0 = "yellow";
            $("#couleur0")[0].value = "yellow";
            this.c1 = "red";
            $("#couleur1")[0].value = "red";
            window.alert("TIP: les couleurs des deux joueurs doivent etre differentes");
        }
        this.drawGame();
        this.click();
        $("#undo").hide();
        $("#tour").html("Au tour de joueur " + this.id + " avec les " + c0);
    }

    //display game
    drawGame() {
        const $jeu = $(this.selector);
        // $jeu.removeChild("div");

        for (let lgn = 0; lgn < this.LGN; lgn++) {
            var $lgn = $("<div>").addClass("lgn");

            for (let col = 0; col < this.COL; col++) {
                const $col = $("<div>").addClass("col vide").attr("data_col", col).attr("data_lgn", lgn);
                $lgn.append($col);
            }
            $jeu.append($lgn);
        }
    }

    //PLAY a coin
    click() {
        var ligne, column;
        const $jeu = $(this.selector);
        var that = this;

        $jeu.on("mouseup", ".col", function (e) {
            for (let i = that.LGN - 1; i >= 0; i--) {
                // console.log(e.target.attributes.data_col.value);
                // console.log($("[data_col="+e.target.dataset.col+"],[data_lgn="+i+"]"));
                // console.log($("[data_lgn="+i+"]"));
                if ($("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").hasClass("vide")) {
                    $jeu.cursor = "pointer";
                    $("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").removeClass("vide");
                    if (that.id == 1) {
                        $("#tour").html("Au tour de joueur 0 avec les " + that.c0);
                        $("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").attr("id", "1");
                        $("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").css({ "background-color": that.c1, 'opacity': '1' });
                        const isWin = that.win(i, e.target.attributes.data_col.value, that.c1, that.id);
                        that.id = 0;
                    } else {
                        $("#tour").html("Au tour de joueur 1 avec les " + that.c1);
                        $("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").attr("id", "0");
                        $("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").css({ "background-color": that.c0, 'opacity': '1' });
                        const isWin = that.win(i, e.target.attributes.data_col.value, that.c0, that.id);
                        that.id = 1;
                    }

                    ligne = i;
                    column = e.target.attributes.data_col.value;
                    $("#undo").show();

                    return 0;
                }
            }
        })
        $jeu.on("mouseenter", ".col", function (e) {
            for (let i = that.LGN - 1; i >= 0; i--) {
                if ($("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").hasClass("vide")) {
                    if (that.id == 1) {
                        $("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").css({ "background-color": that.c1, 'opacity': '0.6' });
                    } else {
                        $("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").css({ "background-color": that.c0, 'opacity': '0.6' });
                    }
                    return 0;
                }
            }
        })
        $jeu.on("mouseleave", ".col", function (e) {
            for (let i = that.LGN - 1; i >= 0; i--) {
                if ($("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").hasClass("vide")) {
                    if (that.id == 1) {
                        $("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").css({ "background-color": 'darkblue', 'opacity': '1' });
                    } else {
                        $("[data_lgn=" + i + "][data_col=" + e.target.attributes.data_col.value + "]").css({ "background-color": "darkblue", 'opacity': '1' });
                    }
                    return 0;
                }
            }
        })
        $('.undo').html("<button id='undo'>annuler</button>");
        $("#undo").on("click", function () {
            $("[data_lgn=" + ligne + "][data_col=" + column + "]").addClass("vide");
            $("[data_lgn=" + ligne + "][data_col=" + column + "]").removeAttr("id");
            $("[data_lgn=" + ligne + "][data_col=" + column + "]").css({ "background-color": 'darkblue', 'opacity': '1' });
            if (that.id == 1) {
                that.id = 0;
            } else {
                that.id = 1;
            }
            $("#undo").hide();
        })
    }

    // WIN conditions
    win(i, j, c, id) {
        var won, draw;
        var that = this;
        var count = -1;
        var vectX = j;
        var vectY = i;


        //Horizontale
        while (vectY >= 0 && vectY < that.LGN && vectX >= 0 && vectX < that.COL && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id) {
            count = count + 1;
            vectX++;
        }

        vectX = j;

        while (vectY >= 0 && vectY < that.LGN && vectX >= 0 && vectX < that.COL && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id) {
            count = count + 1;
            vectX--;
        }
        if (count >= 4) {
            console.log("Player " + id + " with " + c + " won");
            won = true;
        }

        count = -1;
        vectX = j;


        //Verticale
        while (vectY >= 0 && vectY < that.LGN && vectX >= 0 && vectX < that.COL && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id) {
            count = count + 1;
            vectY++;
        }
        vectY = i;
        while (vectY >= 0 && vectY < that.LGN && vectX >= 0 && vectX < that.COL && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id) {
            count = count + 1;
            vectY--;
        }
        if (count >= 4) {
            console.log("Player " + id + " won with " + c);
            won = true;
        }
        count = -1;
        vectY = i;


        //Première bisectrice
        while (vectY >= 0 && vectY < that.LGN && vectX >= 0 && vectX < that.COL && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id) {
            count = count + 1;
            vectY++;
            vectX++;
        }
        vectY = i;
        vectX = j;
        while (vectY >= 0 && vectY < that.LGN && vectX >= 0 && vectX < that.COL && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id) {
            count = count + 1;
            vectX--;
            vectY--;
        }
        if (count >= 4) {
            console.log("Player " + id + " won with " + c);
            won = true;
        }
        count = -1;
        vectX = j;
        vectY = i;


        //seconde bisectrice
        while (vectY >= 0 && vectY < that.LGN && vectX >= 0 && vectX < that.COL && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id) {
            count = count + 1;
            vectY--;
            vectX++;
        }
        vectY = i;
        vectX = j;
        while (vectY >= 0 && vectY < that.LGN && vectX >= 0 && vectX < that.COL && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id != '' && $("[data_lgn=" + vectY + "][data_col=" + vectX + "]")[0].id == id) {
            count = count + 1;
            vectX--;
            vectY++;
        }
        if (count >= 4) {
            console.log("Player " + id + " won with " + c);
            won = true;
        }
        vectX = j;
        vectY = i;

        if (!$(".col").hasClass("vide")) {
            console.log('draw');
            won = true;
            draw = true;
        }

        if (won == true) {
            $("#undo").hide();
            $("#undo").remove();
            $("#jeu").off("mouseup");
            $("button").removeAttr("disabled");
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
            $("#reset").show();
            $("#endG").show();
            $("#tour").hide();
            if (!draw) {
                $("#endG").html("Joueur " + id + " a gagné avec les " + c + ", une revanche? ");
                if (id == 1) {
                    that.j1++;
                } else {
                    that.j0++;
                }
            } else {
                $("#endG").html("Une Partie n'as pas su vous départager, une autre?")
            }
            $("#Score").html(that.j0 + " - " + that.j1);
            $("#Score").show();
            console.log(that.j0, that.j1)
            return true;
        }
        return false;
    }
}