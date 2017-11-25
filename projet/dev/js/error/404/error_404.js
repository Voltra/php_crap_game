/**
 * @author Ludwig GUERIN
 */

import removeSpinnerLord from "../../globals/global-includes"

const spinnerRemover = ()=>{
    $("#error404, a").css("opacity", "1");
    $.flash("The page you were looking for does not exist", "failure");
};

$(document).ready(()=>{
    removeSpinnerLord(spinnerRemover, 100, 500);
});

