import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "@/exceptions/HttpException";

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
export const ValidationMiddleware = (
  type: any,
  skipMissingProperties = false,
  whitelist = false,
  forbidNonWhitelisted = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    validateOrReject(plainToInstance(type, req.body), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    })
      .then(() => {
        next();
      })
      .catch((errors: ValidationError[] | ValidationError) => {
        console.error("Validation errors:", errors); // Add this line for debugging
        const errorArray = Array.isArray(errors) ? errors : [errors];
        const message = errorArray
          .map((error: ValidationError) =>
            error.constraints ? Object.values(error.constraints).join(", ") : ""
          )
          .filter(Boolean)
          .join(", ");
        next(new HttpException(400, message || "Validation error"));
      });
  };
};
