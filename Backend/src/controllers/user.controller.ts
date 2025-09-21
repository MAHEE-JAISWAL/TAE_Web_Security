import { HttpException } from "@/exceptions/HttpException";
import { IUser } from "@/interface/user.interface";
import { UserService } from "@/services/user.service";
import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllUsersData: IUser[] = await this.user.findAllUser();

      res
        .status(200)
        .json({ data: findAllUsersData, message: "findAll User successfully" });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const findOneUserData: IUser = await this.user.findUserById(userId);

      res
        .status(200)
        .json({ data: findOneUserData, message: "find one user successfully" });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const UserData: IUser = req.body;
      const createdUser: IUser = await this.user.createUser(UserData);
      res
        .status(201)
        .json({ data: createdUser, message: "created User Successfully" });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = +req.params.userId;
      const userData: IUser = req.body;

      const updateUserData: IUser = await this.user.updateUser(
        userId,
        userData
      );
      delete updateUserData.password;

      res
        .status(200)
        .json({ data: updateUserData, message: "Updated User Successfully" });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        return next(new HttpException(400, "Invalid userId parameter"));
      }

      const deleteUserData: IUser = await this.user.deleteUser(userId);

      res
        .status(200)
        .json({ data: deleteUserData, message: "Deleted User Successfully" });
    } catch (error) {
      next(error);
    }
  };
}
