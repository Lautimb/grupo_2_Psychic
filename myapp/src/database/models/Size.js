module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Size";

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        title:{
            type: dataTypes.STRING
        }

    }

    const config = {
        tableName: "sizes",
        timestamps: true
    }

    const Size = sequelize.define(alias, cols, config)
    
    Size.associate = (models) =>{
        Size.belongsToMany(models.Product, {
            as: "products",
            through: "product_sizes",
            foreignKey: "size_id",
            otherKey: "product_id",
            timestamps: true
        })
        Size.hasMany(models.Stock, {
            as:"stocks",
            foreignKey: "size_id",
            timestamps: true
        })
    }
    return Size;

}