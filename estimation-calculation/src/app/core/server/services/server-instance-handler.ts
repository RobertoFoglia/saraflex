import { BrowserWindow, App } from "electron"
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
        const serverSocket = this.findOpenSocket();
        if (this.isDev) {
            this.createBackgroundWindow(serverSocket)
        } else {
            this.createBackgroundProcess(serverSocket)
        }
    }

    shutdown(): void {
        if (this.serverProcess) {
            this.serverProcess.kill()
            this.serverProcess = null
          }
    }

    private createBackgroundWindow(socketName: any) {
        const win = new BrowserWindow({
            x: 500,
            y: 300,
            width: 700,
            height: 500,
            show: true,
            webPreferences: {
                nodeIntegration: true
            }
        })
        win.loadURL(`file://${__dirname}/server-dev.html`)
        win.webContents.openDevTools();
        win.webContents.on('did-finish-load', () => {
            win.webContents.send('set-socket', { name: socketName })
        })
    }

    async findOpenSocket() {
        let currentSocket = 1;
        console.log('checking', currentSocket);
        const socketName = this.app.getName() + currentSocket;
        while (await this.isSocketTaken(socketName)) {
            currentSocket++;
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
