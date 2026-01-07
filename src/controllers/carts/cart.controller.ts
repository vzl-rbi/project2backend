import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Cart from "../../database/models/cart.model.js";
import Product from "../../database/models/product.model.js";
import Category from "../../database/models/category.model.js";

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const { quantity, productId } = req.body;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized User id" });
    return;
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    res.status(400).json({ message: "Quantity must be a positive integer" });
    return;
  }

  if (!productId) {
    res.status(400).json({ message: "ProductId is required" });
    return;
  }

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const cartItem = await Cart.findOne({
      where: { userId, productId },
    });

    if (cartItem) {
      await cartItem.increment("quantity", { by: quantity });      
      //alternative Similar outcome sometimes, very different behavior under load.
      /*      
      cartItem.quantity += quantity
      await cartItem.save()
      */
      res.status(200).json({ message: "Cart updated", cartItem });
    } else {
      const newItem = await Cart.create({ userId, productId, quantity });
      res.status(201).json({ message: "Item added to cart", cartItem: newItem });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyCart = async(req:AuthRequest, res:Response):Promise<void> => {
  const userId = req.user?.id
  const cartItems = await Cart.findAll({
    where: {
      userId
    },
    include: [
      {
        model: Product, //cart bhitra Product join
        include: [
          {
            model: Category,  //product bhitra category join gareko
            attributes: ["id", "categoryName"]
          }
        ]
      }
    ]
  })
  if(cartItems.length === 0) {
    res.status(400).json({message: "No Items in the Carts!!"})
  } else{
    res.status(200).json({
      message: "Cart Items Fetched Successfully!!",
      data: cartItems    
    })
  }
}
export const deleteMyCartItem = async(req:AuthRequest, res:Response):Promise<void> => {
  const userId = req.user?.id
  const {productId} = req.params
  //check whethe the product id exits or not
  const product = await Product.findByPk(productId)
  if(!product) {
    res.status(404).json({
      message: "product not found with that id"
    })
  }
  //cart items product delete
  await Cart.destroy({
    where: {
      userId,
      productId
    }
  })
  res.status(200).json({
    message: "Cart item deleted successfully"
  })
}

export const updateCartItems = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const userId = req.user?.id;
    const { quantity } = req.body;

    // 1. Auth check
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // 2. Quantity validation
    if (quantity === undefined || quantity <= 0) {
      res.status(400).json({
        message: "Quantity must be greater than 0",
      });
      return;
    }

    // 3. Find cart item
    const cartItem = await Cart.findOne({
      where: { userId, productId },
    });

    if (!cartItem) {
      res.status(404).json({
        message: "Cart item not found",
      });
      return;
    }

    // 4. Update quantity ONLY
    await cartItem.update({ quantity });

    res.status(200).json({
      message: "Cart item updated successfully",
      data: cartItem,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update cart item",
      err,
    });
  }
};
