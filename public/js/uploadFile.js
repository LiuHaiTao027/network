const multiparty = require('multiparty')
const util = require('util');
const fs = require('fs')

const uploadFile = (path) => {
    return (request, response, next) => {
        const form = new multiparty.Form();

        form.encoding = 'utf-8';
        form.uploadDir = `${path}`;

        form.parse(request, function (err, fields, files) {
            if (!err) {
                try {
                    let inputFile = files.file[0];
                    let newPath = form.uploadDir + "/" + inputFile.originalFilename;
                    fs.renameSync(inputFile.path, newPath);
                    response.writeHead(200, { 'content-type': 'text/plain' });
                    // response.write('received upload:\n\n');
                    response.end(util.inspect({ fields: fields, files: files }));
                } catch (err) {
                    response.send({ err: "上传失败！" });
                }
            }
        });
        next()
    }
}

module.exports = uploadFile