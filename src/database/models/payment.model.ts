import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
  tableName:"payments",
  modelName: "Payment",
  timestamps: true
})

class Payment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string
  @Column({
  type: DataType.UUID,
  allowNull: false
})
declare orderId: string;
  @Column({
    type: DataType.ENUM("cod", "khalti","esewa"),
    allowNull: false
  })
  declare paymentMethod: string
  @Column({
    type: DataType.ENUM("unpaid","paid"),
    defaultValue: "unpaid",
    allowNull: false
  })
  declare paymentStatus: string
  @Column({
    type:DataType.STRING
  })
  declare pidx:string
}
export default Payment