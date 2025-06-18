import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";
import { TaskStatus } from "../enums/task-status.enum";

@Table({
  tableName: "tasks",
  timestamps: true,
})
export class Task extends Model<Task> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  title!: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  description!: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  deadline!: Date;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    defaultValue: TaskStatus.PENDING,
  })
  status!: TaskStatus;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
