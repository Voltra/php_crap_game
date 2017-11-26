/**
 * @author Ludwig GUERIN
 */


import {removeSpinnerLord, setupFormValidation} from "../globals/global-includes";

export default function setupValidation(postDomDelay, postRemoveDelay, formSettingsPath, formLocalePath){
    $(document).ready(()=>{
        removeSpinnerLord(()=>{}, postDomDelay, postRemoveDelay);

        setupFormValidation(
            formSettingsPath,
            formLocalePath,
        );
    });
}