import { AccessoryDetail } from "./accessory-details.model";
import { AccessoryLayout } from "./accessory-layout.model";
import { User } from "./user.model";

export interface AppState {
    layout: AccessoryLayout[];
    accessories: AccessoryDetail[];
    user: User;
    layoutLoaded: boolean;
    accessoriesLoaded: boolean;
    userLoaded: boolean;
}
