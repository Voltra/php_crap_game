/**
 * @author Ludwig GUERIN
 */


import removeSpinnerLord from "../../globals/global-includes";
import fetchJSON from "fetch_json";
import yavl from "yavljs";

$(document).ready(()=>{
    removeSpinnerLord(()=>{}, 100, 500);

    fetchJSON("/assets/json/auth/login/validation.json", validationSetup => validationSetup)
    .then(validationSetup=>fetchJSON("/assets/json/auth/login/locale.json", localeObject=>{
        const validator = new yavl(
            validationSetup.form,
            validationSetup.fields,
            localeObject
        );

        console.log("validationSetup", validationSetup);
        console.log("validator", validator);

        const validateFunc = (event)=>{
            validator.validateForm(event);
        };

        $(validationSetup.form).on("submit", validateFunc);
        $(`${validationSetup.form} *`).on("change", validateFunc);
    }))
    .catch(error => {
        console.log("There has been an error while setting up front-end form validation, falling back to back-end validation.");
        console.log(error);
    });
});