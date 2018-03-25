import { Stay } from '../models/entity/stay';
import { ClientSerializer } from './clients';
import { LocationSerializer } from './locations';

export function StaySerializer(stay: Stay): Object {
    const obj = {
        id: stay.id,
        description: stay.description,
        rooms: stay.rooms,
        state: stay.state,
    };

    if (stay.client) {
        (<any>obj).client = ClientSerializer(stay.client);
    }
    if (stay.location) {
        (<any>obj).location = LocationSerializer(stay.location);
    }

    return obj;
}
