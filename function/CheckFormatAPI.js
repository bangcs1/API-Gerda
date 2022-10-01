const {
    readdirSync,
    writeFileSync,
    mkdirSync,
    existsSync
} = require('fs-extra');

module.exports = function() {
    setInterval(() => {
        const readdir = readdirSync(`${__dirname}/../api`);
        for (const i of readdir) {
            const dir = `${__dirname}/../api/${i}/`;
            if (!existsSync(dir + 'router.js')) writeFileSync(dir + 'router.js', `module.exports.config = {
    name: '${i}' // tên api của ban!
};
module.exports.run = require('../../function/loadControllers.js');`);
            if (!existsSync(dir + 'controllers')) mkdirSync(dir + 'controllers');
            if (!existsSync(dir + 'controllers/cache')) mkdirSync(dir + 'controllers/cache');
            if (!existsSync(dir + 'controllers/example.js')) writeFileSync(dir + 'controllers/example.js', `const configRou = {
    name: 'example.json',// tên router
    credits: 'DC-Nam',// tác giả
    description: 'Example',// Mô tả
    client: {
        litmitRequest: [100,
            60] // Giới hạn request của IP, 100/60s
    },
    contacts: {
        facebook: 'www.facebook.com/levy.nam.2k5'
    }, // thông tin liên hệ
    docs: '{url}?body=Nam'// hướng dẫn, tài liệu api
};
module.exports.config = configRou;
module.exports.run = function(req, res, next) {
    const {
        body
    } = req.query;
   const ip = req.headers['x-forwarded-for'];
   res.status(200).json({
       ip, body
   });
}; // trả dữ liệu về cho người dùng`);
       if (!existsSync(dir + 'main.js')) writeFileSync(dir + 'main.js', `module.exports = function(req, res) {
    const api = __dirname.split('/').pop();
    const fin = global.api.cls.find(i => i.api == api);
    const cls = fin.router.map(i => {
        var {
            name, credits, description, client, contacts, docs
        } = i;
        const url = 'https://api.nambsls.repl.co/' + fin.name +'/' + name;
        docs = docs.replace(/{url}/g, url);
        const infoCls = {
            url, credits, description, contacts, docs
        };
        global.api.infoCls[api] = infoCls;
        return infoCls;
    });
    res.status(200).json(cls);
    res.end();
};`); 
        };
    }, 1000);
};
