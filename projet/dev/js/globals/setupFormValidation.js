/**
 * @author Ludwig GUERIN
 */

import fetchJSON from "fetch_json"
import {yavl} from "./yavl-username"
import {getStyles} from "./getStyles";

export default function setupFormValidation(validation_settings_path, locale_settings_path){
    fetchJSON(validation_settings_path, validationSetup => validationSetup)
    .then(validationSetup=>fetchJSON(locale_settings_path, localeObject=>{
        const validateInput = (error_selector)=>{
            const p_tag = document.querySelector(error_selector);
            p_tag.innerHTML = "";
            p_tag.style.height = "0vh";

            const $relatedInput = $(p_tag.previousElementSibling);
            const $relatedLabel = $relatedInput.prev("label");

            const valid_color = getStyles("label.valid").color;
            $relatedLabel.css("color", valid_color);
            $relatedInput.css("border", `1px solid ${valid_color}`);
        };

        const invalidateInput = (event, error_selector, error_message)=>{
            event.preventDefault();
            const p_tag = document.querySelector(error_selector);
            p_tag.innerHTML = error_message;
            p_tag.style.height = "";

            const $relatedInput = $(p_tag.previousElementSibling);
            const $relatedLabel = $relatedInput.prev("label");

            const invalid_color = $(p_tag).css("color");
            $relatedLabel.css("color", invalid_color);
            $relatedInput.css("border", `1px solid ${invalid_color}`);

            return true;
        };

        const validator = new yavl(
            validationSetup.form,
            validationSetup.fields,
            localeObject,
            validateInput,
            invalidateInput
        );

        const validateFunc = (event)=>{
            validator.validateForm(event);
            const $errors = $("p.error");
            const isValid = $errors
                .toArray()
                .filter(tag => tag.innerHTML!=="")
                .length === 0;

            if(isValid)
                $(event.target).parents("form").children("[type='submit']").removeAttr("disabled");
            else
                $(event.target).parents("form").children("[type='submit']").attr("disabled", "disabled");
        };

        /*validateFunc({
            preventDefault: ()=>{}
        });*/
        $(validationSetup.form).on("submit", validateFunc);
        $(`${validationSetup.form} *`)
        .on("change", validateFunc)
        /*.on("keyup", validateFunc);*/
    }))
    .catch(error => {
        console.log("There has been an error while setting up front-end form validation, falling back to back-end validation.");
        console.log(error);
    });
}