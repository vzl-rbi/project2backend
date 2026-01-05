import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Cart from "../../database/models/cart.model.js";
import Product from "../../database/models/product.model.js";

const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
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

export default addToCart;