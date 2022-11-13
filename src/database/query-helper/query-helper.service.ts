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
  }
}
