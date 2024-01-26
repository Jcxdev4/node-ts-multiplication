import { yarg } from "./config/plugins/yargsPlugins";
import { ServerApp } from "./presentation/serverApp";

(async() => {
  await main()
})();


async function main() {
  const { b:base, l:limit, s:showTable, d: fileDestination, n: fileName } = yarg
  ServerApp.run({ base, limit, showTable, fileDestination, fileName })
}