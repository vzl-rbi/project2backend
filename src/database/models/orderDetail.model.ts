import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
  tableName:"orderDetails",
  modelName: "OrderDetail",
  timestamps: true
})

class OrderDetail extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare phoneNumber: String
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
 declare quantity: number
}
export default OrderDetail