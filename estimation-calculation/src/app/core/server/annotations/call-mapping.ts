const formatMetadataKey = Symbol("call mapping");

export function CallMapping(mapping: string) {
    return Reflect.metadata(formatMetadataKey, mapping);
}

export function getCallMapping(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}