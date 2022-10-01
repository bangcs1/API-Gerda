const {
    readFileSync,
    readdirSync,
    existsSync
} = require('fs-extra');

module.exports = async function({
    app, express
}) {
  const res = await require('axios').get('https://raw.githubusercontent.com/duongcongnam02/API-Gerda/main/package.json');
  if (require('../package.json').author != res.data.author) return console.error('zzz😴');
  const router = express.Router();
    const readdir = readdirSync(__dirname + '/../api');
     require('./CheckFormatAPI.js')();
    for (const i of readdir) {
        const {
            config,
            run
        } = require(`../api/${i}/router.js`);
        const cls = readdirSync(`${__dirname}/../api/${i}/controllers`).filter(i => i.endsWith('.js') && i != 'example.js');
        global.api.cls.push({api: i, name: config.name, router: []})
        app.use(`/${!config ? i: config.name}`, run({
            app, router, api: i, cls
        }));
    };
};
