import { Observable, of } from "rxjs";
import container from "../../config/ioc_config";

export class Dispatcher {
    handlers = {};

    private servicesKeyAvailable: string[];

    constructor
        () {
        // for example products/list, servicesKeyAvailable contains products
    }

    dispatch(id: string, resourceUri: string, args: any): Observable<any> {
        // const serviceInstances = container.get(resourceUri.substr(0, resourceUri.indexOf('/') - 1));
        const serviceInstances = container.get("products");
        // const methodName = Reflect.getMetadata(resourceUri.substr( resourceUri.indexOf('/')), serviceInstances);
        const methodName = Reflect.getMetadata("items", serviceInstances, "findAll"); // it works
        // delete the findAll
        const listofprop = Reflect.getOwnMetadataKeys(serviceInstances);
        serviceInstances['findAll']();
        for (const key in serviceInstances as any) {
          console.log(key); // it works
          console.log(Reflect.getMetadata("items", serviceInstances, key));
        }

        // Create annotations https://rbuckton.github.io/reflect-metadata/#introduction


        // console.log(container);
        // const claDD = container.resolve(ProductServiceImpl);
        // const service = container.resolve(serviceToken);
        // const method = Reflect.getMetadata(resourceUri.substr( resourceUri.indexOf('/')), service);
        // method(args);
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
