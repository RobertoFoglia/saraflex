import { Observable, of } from "rxjs";
import container from "../../config/ioc_config";
import { getCallMapping } from "../../annotations/call-mapping";

export class Dispatcher {
    constructor() { }

    dispatch(resourceUri: string, args: any): Observable<any> {
        const serviceInstances = container.get(resourceUri.substr(0, resourceUri.indexOf('/') - 1));
        if (serviceInstances === undefined) {
            throw new Error('Dispatcher - service not found. Please inject service like ProductServiceImpl.');
            
        }
        const callMappingName = resourceUri.substr(resourceUri.indexOf('/'));
        for (const key in serviceInstances as any) {
            let propertyValue = getCallMapping(serviceInstances, key);
            if (callMappingName === propertyValue) {
                return of(serviceInstances[key](args));
            }
        }
        throw new Error('Dispatcher - method mapping not found. Please insert the mapping like ProductServiceImpl (@CallMapping).')
    }
}
