import os from 'node:os';

export function getSystemInfo() {
    const cpus = os.cpus();
    return {
        arch: os.arch(),
        platform: os.platform(),
        release: os.release(),
        version: os.version(),
        cpu: {
            name: cpus[0]?.model,
            cores: cpus.length,
        },
        memory: {
            total: os.totalmem(),
            free: os.freemem(),
        },
    };
}
