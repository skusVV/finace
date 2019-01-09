import {CategoriesSchema} from '../models/categories.model';
import * as mongoose from 'mongoose';

export class CategoriesController {
  static Categories = mongoose.model('Categories', CategoriesSchema);

  async addCategories(req, res, next) {
    const userId = req.user.sub;
    const categories = req.body.categories;
    const categoriesWithUserId = categories.map(category => {
      return {
        ...category,
        userId
      }
    });

    CategoriesController.Categories.create(categoriesWithUserId, function (err, categories) {
      if (err) {
        res.send(err);
      }

       res.json(categories);
    });
  }

  async getAllCategories(req, res, next) {
    const userId = req.user.sub;

    const query = CategoriesController.Categories.find({}, data => data ? data.filter(category => category.userId === userId) : []);

    query.exec(function (err, categories) {
      if (err) return next(err);
      res.send(categories);
    });
  }
}
