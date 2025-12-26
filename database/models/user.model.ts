import {Table, Column, Model, DataType, AllowNull} from "sequelize-typescript"
@Table({
  tableName: "users",//(phpmyadmin) ui ma dekhine name
  modelName: "User", // access garine name users table lai
  timestamps: true

})

class User extends Model {
  @Column({
    type: DataType.STRING
  })
  declare username: string
  @Column({
    type: DataType.STRING
  })
  declare password: string
  @Column({
    type: DataType.STRING
  })
  declare email: string
  @Column({
    type: DataType.ENUM("Teacher", "Institute", "Super-Admin", "Student"),
    defaultValue: "Student",
    allowNull: false
  })
  declare role: string
}
export default User