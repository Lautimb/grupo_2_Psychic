module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Order";

    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true 
        },
        order_number:{
            type: dataTypes.STRING
        },
        total_qty:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: '0'
        },
        subtotal:{
            type: dataTypes.DECIMAL(10,2)
        },
        promotion:{
            type: dataTypes.STRING(50)
        },
        discount:{
            type: dataTypes.SAMLLINT.UNSIGNED,
            defaultValue: "0"
        },
        user_id:{
            type: dataTypes.INTEGER.UNSIGNED
        }
    }

    const config = {
        tableName: "orders",
        timestamps: true
    }

    const Order = sequelize.define(alias, cols, config)

    Order.associate = (models) => {

        Order.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id",
            timestamps: true
        });

        Order.hasMany(models.Item, {
            as: "items",
            foreignKey: "order_id",
            timestamps: true
        });
    }

    return Order;
}