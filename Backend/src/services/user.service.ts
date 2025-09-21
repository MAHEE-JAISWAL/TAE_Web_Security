import { UserEntity } from "@/entities/user.entity";
import { IUser } from "@/interface/user.interface";
import { HttpException } from "@/exceptions/HttpException";
import { createToken, hashPassword, verifyPassword } from "@/utils/authUtility";
import { Service } from "typedi";
import { Repository, Not } from "typeorm";

@Service()
export class UserService extends Repository<UserEntity> {
  public async findAllUser(): Promise<IUser[]> {
    const users: IUser[] = await UserEntity.find({
      select: {
        userId: true,
        userName: true,
        email: true,
        name: true,
        gender: true,
        dob: true,
        phone: true,
        createdAt: true,
      },
    });
    return users;
  }

  public async findUserById(userId: number): Promise<IUser | null> {
    const user: IUser | null = await UserEntity.findOne({
      where: { userId: userId },
      select: {
        userId: true,
        userName: true,
        email: true,
        name: true,
        gender: true,
        dob: true,
        phone: true,
        createdAt: true,
      },
    });
    return user;
  }

  public async createUser(userData: IUser): Promise<IUser> {
    const findUser: IUser = await UserEntity.findOne({
      where: { email: userData.email },
      select: { email: true },
    });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    const hashedPassword = hashPassword(userData.password);
    const createUserData: IUser = await UserEntity.create({
      ...userData,
      password: hashedPassword.hash,
    }).save();

    return createUserData;
  }

  public async updateUser(userId: number, userData: IUser): Promise<IUser> {
    const findUser: IUser = await UserEntity.findOne({
      where: { userId: userId },
      select: { email: true },
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    // Check for duplicate email or userName
    if (userData.email) {
      const existingEmail = await UserEntity.findOne({
        where: { email: userData.email, userId: Not(userId) },
      });
      if (existingEmail)
        throw new HttpException(409, `Email ${userData.email} already exists`);
    }
    if (userData.userName) {
      const existingUserName = await UserEntity.findOne({
        where: { userName: userData.userName, userId: Not(userId) },
      });
      if (existingUserName)
        throw new HttpException(
          409,
          `Username ${userData.userName} already exists`
        );
    }

    if (userData.password) {
      const hashedPassword = hashPassword(userData.password);
      await UserEntity.update(userId, {
        ...userData,
        password: hashedPassword.hash,
      });
    } else {
      await UserEntity.update(userId, userData);
    }
    const updateUser: IUser = await UserEntity.findOne({
      where: { userId: userId },
    });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<IUser> {
    const findUser: IUser = await UserEntity.findOne({
      where: { userId: userId },
      select: { email: true },
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await UserEntity.delete({ userId: userId });
    return findUser;
  }
}
