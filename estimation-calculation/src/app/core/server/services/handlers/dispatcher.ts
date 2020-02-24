import { Observable, of } from "rxjs";
import { SERVICES_TYPES } from "../../../../backend/services/interfaces/services-types";
import {container} from "tsyringe";

export class Dispatcher {
    handlers = {};

    private servicesKeyAvailable: string[];

    constructor
        () {
        // for example products/list, servicesKeyAvailable contains products
    }

    dispatch(id: string, resourceUri: string, args: any): Observable<any> {
        const serviceToken = SERVICES_TYPES[resourceUri.substr(0, resourceUri.indexOf('/') - 1)];
        container.resolve(serviceToken);

        // reflect-data

        // stringfy args

        // invoke call

        // for example products/list, servicesKeyAvailable contains products

        // read the annotations of the methods of the class in the container

        // else {
        //         console.warn('Unknown method: ' + name)
        //         ipc.server.emit(
        //           socket,
        //           'message',
        //           JSON.stringify({ type: 'reply', id, result: null })
        //         )
        //       }
        return of(2, 3, 4);
    }
}