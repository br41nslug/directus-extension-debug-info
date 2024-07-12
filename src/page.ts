import bytes from "bytes";
import { getDatabase } from "./databases";
import { getSystemInfo } from "./system";

type DbClass = ReturnType<typeof getDatabase>;
type SysInfo = ReturnType<typeof getSystemInfo>;

export async function debugPage(db: DbClass, sys: SysInfo, env: Record<string, any>) {
    const info = await db.info();
    return /*html*/`
<html>
<head>
    <title>Directus Debug Info</title>
</head>
<body>
    <h1>Directus Debug Info</h1>
    <hr>
    <h2>Database: ${db.name}</h2>
    <pre>${JSON.stringify(info, null, 2)}</pre>
    <hr>
    <h2>System Hardware</h2>
    <pre>${JSON.stringify(humanReadableSys(sys), null, 2)}</pre>
    <hr>
    <h2>System Environment</h2>
    <pre>${JSON.stringify(env, null, 2)}</pre>
</body>
</html>
`;
}

export async function debugTldrPage(db: DbClass) {
    const info = await db.info();
    return /*html*/`
<html>
<head>
    <title>Directus Debug TLDR;</title>
</head>
<body>
    <center>
        <h1>TLDR;</h1>
        <hr>
        <h2>Vendor: ${db.name}</h2>
        <h3>Database: ${info.database}</h3>
        <pre>${info['version']}</pre>
    </center>
</body>
</html>
`;
}

function humanReadableSys(sys: SysInfo) {
    return {
        ...sys,
        cpu: sys.cpu.name,
        memory: {
            total: bytes(sys.memory.total),
            free: bytes(sys.memory.free),
            used: bytes(sys.memory.total - sys.memory.free),
        }
    }
}