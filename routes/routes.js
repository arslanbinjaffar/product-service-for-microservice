import express from "express"
import { getAllproducts,addproduct,updateproduct,productById,deleteproduct } from "../controllers/controller.js"

const myRouter = express.Router()


myRouter.get("",getAllproducts)
myRouter.post("/add",addproduct)
myRouter.put("/update/:id",updateproduct)
myRouter.get("/:id",productById)
myRouter.delete("/:id",deleteproduct)
// myRouter.get("/user/:id",userproducts)

export default myRouter