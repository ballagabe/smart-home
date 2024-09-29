export interface AccessoryDetail {
    aid: number;
    iid: number;
    uuid: string;
    type: string;
    humanType: string;
    serviceName: string;
    serviceCharacteristics: Characteristic[];
    accessoryInformation: AccessoryInformation;
    instance: {
        name: string;
        username: string;
        ipAddress: string;
        port: number;
        services: string[];
        connectionFailedCount: number;
    };
    uniqueId: string;
}

interface AccessoryInformation {
    Manufacturer: string;
    Model: string;
    Name: string;
    SerialNumber: string;
    FirmwareRevision: string;
}

export interface Characteristic {
    aid: number;
    iid: number;
    uuid: string;
    type: string;
    serviceType: string;
    serviceName: string;
    description: string;
    value: number;
    format: string;
    perms: string[];
    canRead: boolean;
    canWrite: boolean;
    ev: boolean;
    unit?: string;
    maxValue?: number;
    minValue?: number;
    minStep?: number;
}
export interface AccessoriesState {
    layout: AccessoryDetail[];
    error: string;
    status: 'pending' | 'loading' | 'error' | 'success';
  }