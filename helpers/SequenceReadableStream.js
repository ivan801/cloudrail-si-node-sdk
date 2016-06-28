"use strict";
const stream = require("stream");
class SequenceReadableStream extends stream.Readable {
    constructor(stream1, stream2) {
        super();
        this.stream1 = stream1;
        this.stream2 = stream2;
        this.first = true;
        this.shouldPush = false;
        this.info1 = {
            readable: stream1.readable
        };
        this.info2 = {
            readable: stream2.readable
        };
        stream1.on("readable", () => {
            this.info1.readable = true;
            this.process();
        });
        stream1.on("end", () => {
            this.first = false;
            this.process();
        });
        stream1.on("error", (err) => {
            this.emit("error", err);
        });
        stream2.on("readable", () => {
            this.info2.readable = true;
            this.process();
        });
        stream2.on("end", () => {
            this.push(null);
        });
        stream2.on("error", (err) => {
            this.emit("error", err);
        });
    }
    _read() {
        this.shouldPush = true;
        this.process();
    }
    process() {
        let info = this.first ? this.info1 : this.info2;
        if (this.shouldPush && info.readable) {
            let source = this.first ? this.stream1 : this.stream2;
            let chunk;
            while ((chunk = source.read()) !== null) {
                if (!this.push(chunk)) {
                    this.shouldPush = false;
                    return;
                }
            }
            info.readable = false;
        }
    }
}
exports.SequenceReadableStream = SequenceReadableStream;
