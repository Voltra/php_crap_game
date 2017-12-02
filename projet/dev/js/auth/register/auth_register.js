/**
 * @author Ludwig GUERIN
 */

import setupValidation from "../setupValidation"

const basePath = "/assets/json/auth/register";
setupValidation(100, 500, `${basePath}/validation.json`, `${basePath}/locale.json`);