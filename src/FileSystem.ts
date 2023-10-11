import { createClient } from "webdav";

const fs = createClient("http://geminata:8080/fs", {
  headers:{
    "SameSite": "Lax"
  }
});

//@ts-expect-error
window["fs"] = fs;

export default fs;
