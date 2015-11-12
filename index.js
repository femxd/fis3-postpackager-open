var open = require("open");

module.exports = function (ret, conf, settings, opt) {
    var options = fis.get("options") && fis.get("options")._;
    if (!~options.indexOf("open")) {
        return false;
    }
    var baseUrl = settings.baseUrl;
    if (!baseUrl) {
        fis.log.error("fis3-postpackager-open require baseUrl settings!");
        return false;
    }
    var htmlFound = null;
    fis.util.map(ret.src, function (subpath, file) {
        if (!htmlFound && file.isHtmlLike && file.basename === 'list.html') {
            htmlFound = baseUrl + file.release;
        }
    });

    if (!htmlFound) {
        fis.util.map(ret.src, function (subpath, file) {
            if (file.isHtmlLike && !htmlFound) {
                htmlFound = baseUrl + file.release;
            }
        });
    }

    if (htmlFound) {
        open(htmlFound);
    } else {
        fis.log.error("NOT found any html files!");
    }
};