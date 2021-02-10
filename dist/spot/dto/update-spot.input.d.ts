import { CreateSpotInput } from "./create-spot.input";
declare const UpdateSpotInput_base: import("@nestjs/common").Type<Partial<CreateSpotInput>>;
export declare class UpdateSpotInput extends UpdateSpotInput_base {
    place_name?: string;
    x?: number;
    y?: number;
}
export {};
