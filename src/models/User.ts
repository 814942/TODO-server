import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import { Task } from "./Task";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<User> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: { isEmail: true },
    unique: true,
  })
  email!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password!: string;

  @HasMany(() => Task)
  tasks!: Task[];
}
