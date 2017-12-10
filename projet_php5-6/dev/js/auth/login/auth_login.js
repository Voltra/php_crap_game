/**
 * @author Ludwig GUERIN
 */

import setupValidation from "../setupValidation"

const basePath = BASE_URL + "/assets/json/auth/login";
setupValidation(100, 500, `${basePath}/validation.json`, `${basePath}/locale.json`);