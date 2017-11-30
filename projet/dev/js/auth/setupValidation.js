/**
 * @author Ludwig GUERIN
 */


import {removeSpinnerLord} from "../globals/removeSpinnerLord";
import setupFormValidation from "../globals/setupFormValidation";

export default function setupValidation(postDomDelay, postRemoveDelay, formSettingsPath, formLocalePath){
    $(document).ready(()=>{
        removeSpinnerLord(()=>{}, postDomDelay, postRemoveDelay);

        setupFormValidation(
            formSettingsPath,
            formLocalePath,
        );
    });
}