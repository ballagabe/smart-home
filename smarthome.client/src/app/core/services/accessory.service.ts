import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { BaseHttpService } from './base-http-service.service';
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
  
  acceptedFormats: string[] = ['int', 'bool', 'float', 'uint8'];

  getLayout(): Observable<AccessoryLayout[]> {
    return this.get<AccessoryLayout[]>('api/accessories/layout');
  }

  getLayoutByRoomName(roomName: string): Observable<AccessoryLayout | undefined> {
    return this.get<AccessoryLayout[]>('api/accessories/layout').pipe(
      map((accessories: AccessoryLayout[]) => {
        return accessories.find(e => e.name === roomName);
      }))
  }

  getLayoutWithAccessoriesDetails$ = combineLatest([
    this.getLayout(),
    this.getAllAccessoryDetails()
  ]).pipe(
    map(([layouts, details]) => {
      return layouts.map(layout => {
        return {
          ...layout,
          services: layout.services.map(service => {
            return {
              ...service,
              details: details.find(detail => detail.uuid === service.uuid)
            };
          })
        };
      });
    })
  );

  getAccessoryDetails(uniqueId: string): Observable<AccessoryDetail> {
    return this.get<AccessoryDetail>(`api/accessories/${uniqueId}`);
  }

  getAccessoryDetailsWithFiltering(uniqueId: string): Observable<AccessoryDetail> {
    return this.getAccessoryDetails(uniqueId).pipe(
      map(accessory => {
        return {
          ...accessory,
          serviceCharacteristics: accessory.serviceCharacteristics.filter(e => this.acceptedFormats.includes(e.format))
        };
      })
    );
  }

  getAllAccessoryDetails(): Observable<AccessoryDetail[]> {
    return this.get<AccessoryDetail[]>(`api/accessories`);
  }

  updateAccessoryProperty(accessoryId: string, accessoryProperties: Characteristic): Observable<boolean> {
    const update: AccessoryUpdate = {
      uniqueId: accessoryId,
      characteristicObject: {
        characteristicType: accessoryProperties.description,
        value: Number(accessoryProperties.value)
      }
    };
    return this.post<boolean, AccessoryUpdate>('api/accessories', update)
  }
}
