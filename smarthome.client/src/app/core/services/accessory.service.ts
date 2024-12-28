import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { AccessoryLayout } from '../models/accessory-layout.model';
import { AccessoryDetail, Characteristic } from '../models/accessory-details.model';
import { AccessoryUpdate } from '../models/accessory-update.model';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService extends BaseHttpService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  private acceptedFormats: string[] = ['int', 'bool', 'float', 'uint8'];

  getLayouts(): Observable<AccessoryLayout[]> {
    return this.get<AccessoryLayout[]>('accessories/layouts');
  }

  getLayoutByRoomName(roomName: string): Observable<AccessoryLayout | undefined> {
    return this.getLayouts().pipe(
      map(layouts => layouts.find(layout => layout.name === roomName))
    );
  }

  getLayoutWithAccessoriesDetails(): Observable<any> {
    return combineLatest([
      this.getLayouts(),
      this.getAllAccessoryDetails()
    ]).pipe(
      map(([layouts, details]) => this.combineLayoutsWithDetails(layouts, details))
    );
  }

  getAccessoryDetails(uniqueId: string): Observable<AccessoryDetail> {
    return this.get<AccessoryDetail>(`accessories/${uniqueId}`);
  }

  getFilteredAccessoryDetails(uniqueId: string): Observable<AccessoryDetail> {
    return this.getAccessoryDetails(uniqueId).pipe(
      map(accessory => this.filterAccessoryCharacteristics(accessory))
    );
  }

  getAllAccessoryDetails(): Observable<AccessoryDetail[]> {
    return this.get<AccessoryDetail[]>(`accessories`);
  }

  updateAccessoryCharacteristic(accessoryId: string, characteristic: Characteristic): Observable<boolean> {
    const updatePayload = this.createAccessoryUpdatePayload(accessoryId, characteristic);
    return this.put<boolean, AccessoryUpdate>(`accessories/${accessoryId}/characteristics`, updatePayload);
  }

  private combineLayoutsWithDetails(layouts: AccessoryLayout[], details: AccessoryDetail[]): AccessoryLayout[] {
    return layouts.map(layout => ({
      ...layout,
      services: layout.services.map(service => ({
        ...service,
        details: details.find(detail => detail.uuid === service.uuid) || null
      }))
    }));
  }

  private filterAccessoryCharacteristics(accessory: AccessoryDetail): AccessoryDetail {
    return {
      ...accessory,
      serviceCharacteristics: accessory.serviceCharacteristics.filter(e => this.acceptedFormats.includes(e.format))
    };
  }

  private createAccessoryUpdatePayload(accessoryId: string, characteristic: Characteristic): AccessoryUpdate {
    return {
      uniqueId: accessoryId,
      characteristicObject: {
        characteristicType: characteristic.description,
        value: Number(characteristic.value)
      }
    };
  }
}
