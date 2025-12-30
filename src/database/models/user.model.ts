import {Table, Column, Model, DataType, AllowNull, PrimaryKey} from "sequelize-typescript"
@Table({
  tableName: "users",//(phpmyadmin) ui ma dekhine name
  modelName: "User", // access garine name users table lai
  timestamps: true

})

class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string
  @Column({
    type: DataType.STRING,
    unique: true
  })
  declare username: string
  @Column({
    type: DataType.STRING
  })
  declare password: string
  @Column({
    type: DataType.STRING,
    unique: true
  })
  declare email: string
  @Column({
    type: DataType.ENUM("customer","admin"),
    defaultValue: "customer",
    allowNull: false
  })
  declare role: string
}
export default User