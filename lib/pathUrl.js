import getConfig from "next/config";
import path from "path";


const serverPath = (staticFilePath) => {
    return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

export default serverPath