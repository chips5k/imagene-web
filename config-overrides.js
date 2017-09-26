const lodashCloneDeep = require('lodash/cloneDeep');

module.exports = function override(config, env) {
    // Add worker-loader by hijacking configuration for regular .js files.

    const workerExtension = /\.worker\.js$/;

    
    let babelLoader = false;

    
    for(var i = 0; i < config.module.rules.length; i++ ) {
        if(config.module.rules[i].oneOf) {

            for(var j = 0; j < config.module.rules[i].oneOf.length;  j++) {
                if(config.module.rules[i].oneOf[j].loader.indexOf('babel-loader') !== -1) {
                    babelLoader = config.module.rules[i].oneOf[j];
                    break;
                    break;
                }
            }
        }
    }
    
    const workerLoader = lodashCloneDeep(babelLoader);

    workerLoader.test = workerExtension;
    workerLoader.use = [
        'worker-loader',
        { // Old babel-loader configuration goes here.
            loader: workerLoader.loader,
            options: workerLoader.options,
        },
    ];
    delete workerLoader.loader;
    delete workerLoader.options;

    babelLoader.exclude = (babelLoader.exclude || []).concat([workerExtension]);

    config.module.rules.push(workerLoader);

    // Optionally output the final config to check it.
    //console.dir(config, { depth: 10, colors: true });

    return config;
};