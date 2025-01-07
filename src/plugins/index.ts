import { plugin } from "@formkit/vue";
import type { App } from "vue";
import { myConfig } from "./formKit";

export function registerPlugins(app: App){
    app.use(plugin, myConfig)
}