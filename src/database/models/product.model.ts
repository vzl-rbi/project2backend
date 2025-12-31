import {Table, Column, Model, DataType, AllowNull, PrimaryKey} from "sequelize-typescript"
@Table({
  tableName: "products",
  modelName: "Product", 
  timestamps: true

})

class Product extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare productName: string
  @Column({
    type: DataType.TEXT
  })
  declare productDescription: string
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull : false
  })
  declare productPrice: number
  @Column({
    type: DataType.INTEGER,
    allowNull : false,
    validate: { min: 0}
  })
  declare productTotalStockQty : number
  @Column({
    type: DataType.STRING
  })
  declare image : string
}
export default Product