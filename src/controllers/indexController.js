const db = require('../database/models')
module.exports = {
    index: async (req,res) =>{
        const products = await db.Product.findAll({
            include: ["images","users"],
            order:[["created_at", "ASC"]]
        });
        
        // return res.send(products)
        if(req.session.user){
            products.forEach(product => {    
                product.users.forEach( user => {
                    if(req.session.user.id == user.wishlists.user_id){
                        product.setDataValue('liked', 'added') 
                    }
                })            
            });
        }
        products.forEach( product => {
            product.images[0].filename = JSON.parse(product.images[0].filename)
            product.setDataValue('users', '')
            return 
        });
        res.render('index', { products });
    },
    contact: (req,res) =>{
        res.render('contact');
    },
    lookbook: (req,res) =>{
        res.render('lookbook');
    },
    social: (req,res) =>{
        res.render('social');
    }    
}


