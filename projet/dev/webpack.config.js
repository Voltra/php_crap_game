/**
 * @author Ludwig GUERIN
 */

var webpack = require("webpack");

module.exports = {
    "context": __dirname + "/js",
    "entry": {
        "error_404": "./error/404/error_404",
        "auth_login": "./auth/login/auth_login"
    },
    "output": {
        "filename": "[name].bundle.js",
        "path": __dirname + "/../public_html/assets/js"
    },
    "target": "web",
    "module": {
        "loaders": [
            {
                "test": /\.js$/,
                "exclude": /(node_modules)/,
                "loader": "babel-loader"
            }
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
            }
        ]
    },
    "stats": {
        "colors": true
    }

};