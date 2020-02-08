import { BrowserWindow, App , screen} from "electron"
import { fork, ChildProcess } from "child_process"
import { async } from "rxjs/internal/scheduler/async";

const ipc = require('node-ipc');
ipc.config.silent = true;

export class ServerInstanceHandler {

    serverProcess: ChildProcess;

    constructor(
        private isDev: boolean,
        private app: App
    ) { }

    startup(): void {
        this.findOpenSocket().then( serverSocketName => {
            if (this.isDev) {
                this.createBackgroundWindow(serverSocketName);
            } else {
                this.createBackgroundProcess(serverSocketName)
            }
        });
    }

    shutdown(): void {
        if (this.serverProcess) {
            this.serverProcess.kill()
            this.serverProcess = null
        }
    }

    private createBackgroundWindow(socketName: any) {
        const { width, height } = screen.getPrimaryDisplay().workAreaSize;
        const win = new BrowserWindow({
            x: 0,
            y: 0,
            width: width,
            height: height,
            show: true,
            webPreferences: {
                nodeIntegration: true
            }
        });
        win.loadURL(`file://${__dirname}/server-dev.html`)
        win.webContents.openDevTools();
        win.webContents.on('did-finish-load', () => {
            win.webContents.send('set-socket', { name: socketName })
        })
    }

    async findOpenSocket() {
        let currentSocket = 1;
        console.log('checking', currentSocket);
        let socketName = this.app.getName() + currentSocket;
        while (await this.isSocketTaken(socketName)) {
            currentSocket++;
            socketName = this.app.getName() + currentSocket;
            console.log('checking', currentSocket);
        }
        console.log('found socket', currentSocket);
        return socketName;
    }

    private isSocketTaken(name) {
        return new Promise((resolve, reject) => {
            ipc.connectTo(name, () => {
                ipc.of[name].on('error', () => {
                    ipc.disconnect(name);
                    resolve(false);
                });

                ipc.of[name].on('connect', () => {
                    ipc.disconnect(name);
                    resolve(true);
                });
            });
        });
    }

    private createBackgroundProcess(socketName) {
        this.serverProcess = fork(__dirname + '/server.js', [
            '--subprocess',
            this.app.getVersion(),
            socketName
        ])

        this.serverProcess.on('message', msg => {
            console.log(msg)
        })
    }

}
