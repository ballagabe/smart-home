import { AccessoryDetail } from "./accessory-details.model";

export interface AccessoryLayout {
    name: string;
    serviceQuantity: number,
    services: Service[];
}

interface Service {
    uniqueId: string;
    aid: number;
    iid: number;
    uuid: string;
    details: AccessoryDetail | null;
}

export interface LayoutState {
    layout: AccessoryLayout[];
    error: string;
    status: 'pending' | 'loading' | 'error' | 'success';
  }