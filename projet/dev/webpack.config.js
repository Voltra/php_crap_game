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
        "game_play" : "./game/play/game_play",
        "game_end": "./game/end/game_end"
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
            },
            {
                "test": require.resolve("jquery/dist/jquery.min.js"),
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
        ],
        "loaders": [
            {
                "test": /\.js$/,
                "loader": "uglify"
            }
        ]
    },
	"plugins": [
		new webpack.ProvidePlugin({
			"$": require.resolve("jquery/dist/jquery.min.js")
		})
	],
    "stats": {
        "colors": true
    },
    "externals": [
        "window",
        "document",
        "BASE_URL"
    ]
};