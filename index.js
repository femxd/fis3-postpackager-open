var open = require("open");

module.exports = function(ret, conf, settings, opt) {
    var options = fis.get("options") && fis.get("options")._;
    if (!~options.indexOf("open")) {
        return false;
    }
    var baseUrl = settings.baseUrl;
    if (!baseUrl) {
        fis.log.error("fis3-postpackager-open require baseUrl settings!");
        return false;
    }
    var hasListHtml = false;
    fis.util.map(ret.src, function(subpath, file) {
        if (file.isHtmlLike && file.basename === 'list.html') {
            open(baseUrl + file.release);
            hasListHtml = true;
        }
    });

    if (!hasListHtml) {
        fis.util.map(ret.src, function(subpath, file) {
            if (file.isHtmlLike) {
                open(baseUrl + file.release);
                hasListHtml = true;
            }
        });
    }
};