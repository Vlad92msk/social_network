import { RU_User } from "@lib/profile/users/entities";
import { UserModule } from "@lib/profile/users/user.module";
import { UserService } from "@lib/profile/users/user.service";
import { Test, TestingModule } from "@nestjs/testing";
import { UserResolver } from "../user.resolver";

describe("UserResolver", () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
