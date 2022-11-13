import { Injectable } from '@nestjs/common';
import { posts } from '../tables/table.post';
import { TTable } from './query-helper.modal';

@Injectable()
export class QueryHelperService<T> {
  table: T[];

  setTable(table: TTable) {
    if (table === 'post') {
      this.table = posts as T[];
    }
  }

  async getAll(): Promise<T[]> {
    return this.table;
  }

  async getByKey(key: keyof T, value: unknown): Promise<T[]> {
    return (await this.getAll()).filter((item) => item[key] === value);
  }

  async search(queryObject: Partial<T>) {
    /**
     * Process and filter using each key
     *    if any key has comma, i.e OR condition
     *    if it's an array, that is AND condition
     *    Comma
     *        if it include single inverted quote, look for partial match
     *        if it's in pair of two, look for exact match
     *    Any other condition???
     */

    // Assign route
    const req = {
      query: {},
    };
    const filters = req.query;
    const filteredUsers = posts.filter((user) => {
      let isValid = true;
      for (const key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });

    return filteredUsers;
  }
}
