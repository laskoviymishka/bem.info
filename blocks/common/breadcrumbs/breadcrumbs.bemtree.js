block('breadcrumbs').content()(function() {
    var data = this.data,
        page = data.page,
        site = page.site;

    var result = [];

    data.pages.filter(function(item) {
        if (item.url === '/') return;

        if (/^\/forum/.test(item.url)) return;

        if (!new RegExp('^' + item.url).test(site)) return;

        return item.url.split('/').length <= site.split('/').length;
    }).map(function(item, idx) {
        result.push({
            elem: 'item',
            content: page.url === item.url ? item.title : {
                block: 'link',
                mix: { block: 'breadcrumbs', elem: 'link' },
                url: item.url,
                content: item.title
            }
        });
    }, this);
/*
    if (page.type === 'lib') {
        var split = site.replace(/(.*)\/$/, '$1').split('/'),
            libVer = split.pop(),
            libName = split.pop();

        var options = [];
        data.libs[libName].forEach(function(ver) {
            if (ver !== libVer) {
                options.push({ val : ver, text : ver });
            }
        });

        var lastResultItem = result.pop();
        result.push(
            lastResultItem,
            {
                elem: 'item',
                mix: { elem: 'version' },
                content: {
                    block : 'select',
                    mods : { mode : 'radio-check', theme : 'islands', size : 'm' },
                    text : '',
                    js : { url : site.replace(libVer + '/', '') },
                    options : options
                }
            }
        );
    }
*/
    return result;
});