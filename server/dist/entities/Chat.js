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
exports.Chat = void 0;
const type_graphql_1 = require("type-graphql");
const Message_1 = require("./Message");
let Chat = class Chat {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Chat.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => [Message_1.Message]),
    __metadata("design:type", Array)
], Chat.prototype, "messages", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], Chat.prototype, "createdAt", void 0);
Chat = __decorate([
    type_graphql_1.ObjectType({ description: 'The Chat model' })
], Chat);
exports.Chat = Chat;
//# sourceMappingURL=Chat.js.map