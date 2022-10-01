module.exports = (req, res, next) => {
    const api = global.api.cls.map(j => {
        const cts = j.router.map(i => {
        var {
            name, credits, description, client, contacts, docs
        } = i;
        const url = 'https://api.nambsls.repl.co/' + j.name +'/' + name;
        docs = docs.replace(/{url}/g, url);
        const infoCls = {
            url, credits, description, contacts, docs
        };
        return infoCls;
    });
        return {
            api: j.api.toUpperCase(), info: cts
        };
    });
    res.status(200).json(api);
};
