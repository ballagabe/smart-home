interface CharacteristicObject {
    characteristicType: string;
    value: number;
}
  
export interface AccessoryUpdate {
    uniqueId: string;
    characteristicObject: CharacteristicObject;
}