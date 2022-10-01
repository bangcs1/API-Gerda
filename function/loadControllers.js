module.exports = function ({
    app, router, api, cls
}) {
    for (const i of cls) {
        global.logged('api', api)
        const {
            config,
            run
        } = require(`../api/${api}/controllers/${i}`);
        if (!config || !run) {
            global.logged('error', `Khởi chạy router ${i} thất bại!`);
            continue;
        } else {
            global.logged('success', `Khỏi chạy router ${i} thành công!`);
            router.get(`/${!config ? i.replace(/\.js/g, ''): config.name}`, run);
            global.api.cls.find(i => i.api == api).router.push(config);
        };
    };
    router.get('/', require(`../api/${api}/main.js`));
    return router;
};
