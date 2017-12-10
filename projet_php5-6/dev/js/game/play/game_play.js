/**
 * @author Ludwig GUERIN
 */

import setupValidation from "../../auth/setupValidation"

const basePath = BASE_URL + "/assets/json/game/play";
setupValidation(100, 500, `${basePath}/validation.json`, `${basePath}/locale.json`);