/**
 * @author Ludwig GUERIN
 */

var webpack = require("webpack");

module.exports = {
    "context": __dirname + "/js",
    "entry": {
        "error_404": "./error/404/error_404",
        "auth_login": "./auth/login/auth_login",
        "auth_register": "./auth/register/auth_register"
    },
    "output": {
        "filename": "[name].bundle.js",
        "path": __dirname + "/../public_html/assets/js"
    },
    "target": "web",
    "module": {
        "loaders": [
        ],
        "rules": [
            {
                "test": require.resolve("jquery"),
                "use": [
                    {
                        "loader": "expose-loader",
                        "options": "$"
                    },
                    {
                        "loader": "expose-loader",
                        "options": "jQuery"
                    }
                ]
            },
            {
                "test": /\.js$/,
                "exclude": /(node_modules|bower_components)/g,
                "loader": "babel-loader"
            }
        ]
    },
    "stats": {
        "colors": true
    }

};