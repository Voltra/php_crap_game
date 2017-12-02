import setupValidation from "../../auth/setupValidation"

/**
 * @author Ludwig GUERIN
 */

const basePath = "/assets/json/game/play";
setupValidation(100, 500, `${basePath}/validation.json`, `${basePath}/locale.json`);