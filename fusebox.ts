import { CSSModules, CSSPlugin, FuseBox, StylusPlugin } from "fuse-box";
import { argv } from "yargs";

// Arrange yargs input
interface IBuildConfig {
    watchMode: boolean;
    hotModuleLoading: boolean;
    devServer: boolean;
    productionMode: boolean;
}
const config = {} as IBuildConfig;
config.watchMode = argv.watch || false;
config.hotModuleLoading = argv.hotModuleLoading || false;
config.devServer = argv.devServer || false;
config.productionMode = argv.productionMode || false;

// Configure build steps

const fuse = FuseBox.init({
    homeDir: "client",
    output: "dist/$name.js",
    tsConfig: "./tsconfig.client.json",
    cache: true,
    sourceMaps: true,
});

let instruction = fuse.bundle("bundle").target("browser").plugin(StylusPlugin(), CSSModules(), CSSPlugin({
    group: "bundle.css",
    outFile: "./public/bundle.css",
    inject: (file: string) => `../${file}`,
})).plugin(CSSPlugin()).instructions(">./index.tsx");
if (config.watchMode) {
    instruction = instruction.watch();
}
if (config.hotModuleLoading) {
    instruction = instruction.hmr({
        reload: true,
    });
}
if (config.devServer) {
    fuse.dev({
        open: true,
        root: "public",
    });
}

fuse.run();
