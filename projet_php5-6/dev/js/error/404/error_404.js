/**
 * @author Ludwig GUERIN
 */

import {removeSpinnerLord} from "../../globals/removeSpinnerLord"
import flash from "../../globals/flash"

const spinnerRemover = ()=>{
    $("#error404, a").css("opacity", "1");
    $.flash("The page you were looking for does not exist", "failure");
};

$(document).ready(()=>{
    removeSpinnerLord(spinnerRemover, 100, 500);
    $("#content").click(event=>{
        event.preventDefault();
        event.stopPropagation();
        history.back();
    });
});

