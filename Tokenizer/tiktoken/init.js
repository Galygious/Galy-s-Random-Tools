// @ts-expect-error
import * as wasm from "./tiktoken_bg.wasm";
import * as tiktokenBg from "./tiktoken_bg.js";
import { __wbg_set_wasm } from "./tiktoken_bg.js";

// Set the WebAssembly module
__wbg_set_wasm(wasm);

// Re-export specific items explicitly
export const { someExport1, someExport2 } = tiktokenBg;

// Optionally, export everything:
export * from "./tiktoken_bg.js";

// Create an aggregated imports object
const imports = {
    wasm,
    ...tiktokenBg,
};

export { imports };

import { __wbg_set_wasm } from "./tiktoken_bg.js";

__wbg_set_wasm(wasm);

const imports = {
    wasm,
    ...require("./tiktoken_bg.js"),
};

export { imports };
let isInitialized = false;
export async function init(callback) {
    if (isInitialized)
        return imports;
    const result = await callback({ "./tiktoken_bg.js": imports });
    const instance = "instance" in result && result.instance instanceof WebAssembly.Instance
        ? result.instance
        : result instanceof WebAssembly.Instance
            ? result
            : null;
    if (instance == null)
        throw new Error("Missing instance");
    imports.__wbg_set_wasm(instance.exports);
    isInitialized = true;
    return imports;
}
// @ts-expect-error
export * from "./tiktoken_bg";
