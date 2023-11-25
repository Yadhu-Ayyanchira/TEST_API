import express from 'express'
const itemRouter = express.Router()
import ItemsController from '../Controllers/ItemsController.js';
import { Authentication } from '../Middlewares/Authentication.js';

itemRouter.post('/Items', Authentication,ItemsController.addItem)
itemRouter.get('/Items', ItemsController.getAllItems)
itemRouter.get('/Items/:id', ItemsController.getOneItem)
itemRouter.delete('/Items/:id',Authentication, ItemsController.deleteItem)
itemRouter.put('/Items/:id',Authentication, ItemsController.editItem)

export default itemRouter;

