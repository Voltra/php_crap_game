/**
 * @author Ludwig GUERIN
 */


/**A jQuery based function that removes spinner-lord
 * @param {function} functor - The function to execute before removing the spinner-lord DOM element
 * @param {number} waitAfterDomLoad - A number representing the amount of time (in ms) to wait before setting the spinner-lord to inactive
 * @param {number} waitAfterInactive - A number representing the amount of time (in ms) to wait before removing the spinner-lord from the DOM
 */
export function removeSpinnerLord(functor, waitAfterDomLoad = 100, waitAfterInactive = 100){
    setTimeout(()=>{
        $("#spinner-lord").removeClass("active").addClass("inactive");
        setTimeout(()=>{
            functor();
            $("#spinner-lord").remove();
        }, waitAfterInactive);
    }, waitAfterDomLoad);
}