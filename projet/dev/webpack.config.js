/**
 * @author Ludwig GUERIN
 */

var webpack = require("webpack");

module.exports = {
    "context": __dirname + "/js",
    "entry": {
        "error_404": "./error/404/error_404",
        "auth_login": "./auth/login/auth_login",
        "auth_register": "./auth/register/auth_register",
        "game_play" : "./game/play/game_play"
    },
    "output": {
        "filename": "[name].bundle.js",
        "path": __dirname + "/../public_html/assets/js"
    },
    "target": "web",
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "exclude": /(node_modules|bower_components)/g,
                "loader": "babel-loader"
            }/*,
            {
                "test": /\.js$/,
                "loader": "uglify-loader"
            }*/
        ]
    },
	"plugins": [
		new webpack.ProvidePlugin({
			"$": "jquery/dist/jquery.min.js",
			"jQuery": "jquery/dist/jquery.min.js"
		}),
        new webpack.LoaderOptionsPlugin({
            "options": {
                "uglify-loader": {
                    "mangle": true
                }
            }
        })
	],
    "stats": {
        "colors": true
    }
};