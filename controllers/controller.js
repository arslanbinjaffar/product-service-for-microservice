// import mongoose from "mongoose";
import product from "../models/model.js";
import axios from "axios";
const USER_SERVICE_BACKEND_URI = "http://user-service:5000";

export const getAllproducts = async (req, res) => {
  let products;
  try {
    products = await product.find();
  } catch (error) {
    console.log(error);
  }
  if (!products) {
    return res.status(404).json({ message: "No products Found" });
  }
  return res.status(200).json({ products });
};



export const addproduct = async (req, res) => {
  const { name, price, description, ownerId } = req.body;

  try {
    const userResponse = await axios.get(`${USER_SERVICE_BACKEND_URI}/users/${ownerId}`);

    if (!userResponse.data) {
      return res.status(400).json({ message: "Unauthorized: User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "User Service Unavailable", error: error.message });
  }

  const newProduct = new product({
    name,
    description,
    price,
    ownerId, 
  });

  try {
    await newProduct.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error saving product" });
  }

  return res.status(200).json({ product: newProduct });
};


export const updateproduct = async (req, res) => {
  const { name,price, description } = req.body;

  const productId = req.params.id;
  let product;
  try {
    product = await product.findByIdAndUpdate(productId, {
      name,
    description,
    price
    });
  } catch (error) {
    console.log(error);
  }
  if (!product) {
    res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ product: product });
};

export const productById = async (req, res) => {
  const { id } = req.params;
  let productById;
  try {
    productById = await product.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!productById) {
    res.status(404).json({ message: "Not Found" });
  }
  return res.status(200).json({ product: productById });
};

export const deleteproduct = async (req, res) => {
  const { id } = req.params;

  let productById;
  try {
    productById = await product.findById(id);
    if (!productById) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to delete" });
  }

  return res.status(200).json({ message: "Deleted successfully" });
};

// export const userproducts = async (req, res,next) => {
//   const { id } = req.params;
//   let existingUser;
//   let userproducts;
//   try {
//     existingUser = await User.findById(id);
//   } catch (error) {
//     console.log(error);
//   }
//   if (!existingUser) {
//     res.staus(400).json({ message: "User Not Exist" });
//   }
//   try {
//     userproducts = existingUser.products;
//   } catch (error) {
//     console.log(error);
//   }
//   if (userproducts.length === 0) {
//     return res.status(200).json({ userproducts: userproducts });
//   }
//   let productData = []
//   for (let id of userproducts){
//   try{
//     const product = await product.findById(id)
//     productData.push(product)
//   }
//   catch(err){
//     console.log(err)
//   }
//   }
//   return res.status(200).json({userproducts:productData})
// };

