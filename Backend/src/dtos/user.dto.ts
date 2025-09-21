import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public userName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  name: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(6)
  gender: string;

  @IsOptional()
  dob?: Date;
    
}


