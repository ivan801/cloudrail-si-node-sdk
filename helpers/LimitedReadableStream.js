"use strict";
const stream = require("stream");
const CHUNK_SIZE = 8 * 1024;
class LimitedReadableStream extends stream.Readable {
    constructor(source, limit) {
        super();
        this.source = source;
        this.limit = limit;
        this.shouldPush = false;
        this.sourceReadable = source.readable;
        source.on("readable", () => {
            this.sourceReadable = true;
            this.process();
        });
        source.on("end", () => {
            this.push(null);
        });
        source.on("error", (err) => {
            this.emit("error", err);
        });
    }
    _read() {
        this.shouldPush = true;
        this.process();
    }
    process() {
        if (this.shouldPush && this.sourceReadable) {
            let chunk;
            while ((chunk = this.source.read(Math.min(this.limit, CHUNK_SIZE))) !== null) {
                this.limit -= chunk.length;
                if (this.limit === 0) {
                    this.push(chunk);
                    this.push(null);
                    return;
                }
                if (!this.push(chunk)) {
                    this.shouldPush = false;
                    return;
                }
            }
        }
    }
}
exports.LimitedReadableStream = LimitedReadableStream;
