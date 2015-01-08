$(document).ready(function () {
    var next = 'x';
//    var other = 'o';
    var not_taken = ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'box7', 'box8', 'box9'];
    var taken = [];
    var x_taken = [];
    var o_taken = [];
    var score = 0;
//    calculateAndMakeNextMove();

    $(".box").click(function () {
        var clicked_element_id = $(this).attr('id');
        if (taken.indexOf(clicked_element_id) == -1) {
            taken.push(clicked_element_id);
            x_taken.push(clicked_element_id);

            not_taken = _.without(not_taken, clicked_element_id);

            console.log(clicked_element_id);

            $(this).css('background-image', 'url(' + "img/x_img.jpg" + ')');

            if ('x' === checkEndGame(x_taken, o_taken)) {
                console.log('X wins');
                return
            }

            calculateAndMakeNextMove();

            if ('o' === checkEndGame(x_taken, o_taken)) {
                console.log('X wins');
                return
            }


        }
        else {
            console.log("Illegal click");
        }
    });

    function checkEndGame(x_taken, o_taken) {
        var winning_combos = [
            // Horizontal lines
            ['box1', 'box2', 'box3'],
            ['box4', 'box5', 'box6'],
            ['box7', 'box8', 'box9'],
            // Vertical lines
            ['box1', 'box4', 'box7'],
            ['box2', 'box5', 'box8'],
            ['box3', 'box6', 'box9'],
            // Diagonals
            ['box1', 'box5', 'box9'],
            ['box3', 'box5', 'box7']
        ];
        for (var i = 0; i < winning_combos.length; i++) {
            if (_(winning_combos[i]).difference(x_taken).length === 0) return 'x';
            if (_(winning_combos[i]).difference(o_taken).length === 0) return 'o';
        }
        return null;
    }

    function calculateAndMakeNextMove() {
        var childScore = function (child) {
            return child._score;
        };

        function State(not_taken, taken, x_taken, o_taken, maximize, level) {
            this._level = level;
            this._not_taken = not_taken;
            this._taken = taken;
            this._x_taken = x_taken;
            this._o_taken = o_taken;
            this._children = null;
            this._score = 0;
            this._clicked_element = null;
            var now_result = checkEndGame(x_taken, o_taken);
//            if (now_result === null)
//                debugger;
            if (now_result === 'o')
                this._score = 1;
            else if (now_result === 'x')
                this._score = -1;
            else {
                var children = [];

                var no_of_children = not_taken.length;
                if (no_of_children > 0) {
                    for (var i = 0; i < no_of_children; i++) {
                        var new_not_taken = _.without(not_taken, not_taken[i]);
                        var new_taken = _.union(taken, [not_taken[i]]);
                        var new_x_taken, new_o_taken;
                        if (maximize) {
                            new_o_taken = _.union(o_taken, [not_taken[i]]);
                            new_x_taken = _.union(x_taken, []);
                        } else {
                            new_o_taken = _.union(o_taken, []);
                            new_x_taken = _.union(x_taken, [not_taken[i]]);
                        }
                        var child = new State(new_not_taken, new_taken, new_x_taken, new_o_taken, !maximize, level + 1);
                        children.push(child);
                    }

                    var score = maximize ? _.max(children, childScore)._score : _.min(children, childScore)._score;
                    var idx;
//                    console.log("sometimes i win");
//                    console.log(no_of_children);
//                    console.log(x_taken);
//                    console.log(o_taken);

                }
                if (level === 2 && score === 1)
                    debugger;
                this._score = score;
                this._children = children;
                _.find(this._children, function (child, childIdx) {
                    if (child._score === score) {
                        idx = childIdx;
                        return true;
                    }
                });
                this._clicked_element = this._not_taken[idx];
            }
        }

        var presentState = new State(not_taken, taken, x_taken, o_taken, true, 0);
//        var presentStateChildrenSorted = _.sortBy(presentState._children, childScore);
//        var nextState;
//        if(presentStateChildrenSorted.length > 0)
//            nextState = presentStateChildrenSorted[presentStateChildrenSorted.length-1];


        $("#" + presentState._clicked_element).css('background-image', 'url(' + "img/o_img.jpg" + ')');

        taken = presentState._taken;
        not_taken = presentState._not_taken;
        x_taken = presentState._x_taken;
        o_taken = presentState._o_taken;

    }
});