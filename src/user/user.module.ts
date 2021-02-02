import { Module } from '@nestjs/common';

@Module({})
export class UserModule {
    @Field()
    userId: string;

    @Field()
    name: string;

    @Field()
    nickname: string;

    @Field(() => Int)
    email: number;

    @Field()
    partner_id: string;

    @Field({ nullable: true })
    isAuth?: boolean;
}
