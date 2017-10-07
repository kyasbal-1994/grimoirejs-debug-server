const path = require("path");
module.exports = {
    entry: "./client/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".css"]
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules',
                include: [/flexboxgrid/, /react-toolbox/]
            },
            {
                test: /\.stylus$/,
                loader: 'style-loader!css-loader?modules!stylus-loader'
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/, loader: "ts-loader", options: {
                    configFile: __dirname + "/tsconfig.client.json"
                }
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

};