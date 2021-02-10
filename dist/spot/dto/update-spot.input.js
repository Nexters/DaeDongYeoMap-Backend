"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSpotInput = void 0;
const create_spot_input_1 = require("./create-spot.input");
const graphql_1 = require("@nestjs/graphql");
let UpdateSpotInput = class UpdateSpotInput extends graphql_1.PartialType(create_spot_input_1.CreateSpotInput) {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateSpotInput.prototype, "place_name", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSpotInput.prototype, "x", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSpotInput.prototype, "y", void 0);
UpdateSpotInput = __decorate([
    graphql_1.InputType()
], UpdateSpotInput);
exports.UpdateSpotInput = UpdateSpotInput;
//# sourceMappingURL=update-spot.input.js.map