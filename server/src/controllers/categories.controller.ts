import {CategoriesSchema} from '../models/categories.model';
import * as mongoose from 'mongoose';

export class CategoriesController {
  static Categories = mongoose.model('Categories', CategoriesSchema);

  async addCategory(req, res, next) {
    const userId = req.user.sub;
    const category = new CategoriesController.Categories({...req.body, userId});

    category.save((err, category) => {
      if (err) {
        res.send(err);
      }

      res.json(category);
    });
  }

  async getAllCategories(req, res, next) {
    const userId = req.user.sub;

    const query = CategoriesController.Categories.find({}, data => data ? data.filter(category => category.userId === userId) : []);

    query.exec(function (err, categories) {
      if (err) return next(err);
      res.send(categories.filter(category => category.userId === userId));
    });
  }

  async deleteCategory(req, res, next) {
    const query = CategoriesController.Categories.remove({'_id': req.params.id});

    query.exec(function (err, categories) {
      if (err) return next(err);
      res.send({id: req.params.id});
    });
  }
}
