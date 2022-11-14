import { Injectable } from '@nestjs/common';
import { posts } from '../tables/table.post';
import { TTable } from './query-helper.modal';

@Injectable()
export class QueryHelperService<T extends object> {
  tableData: T[];

  setTable(table: TTable | null, data?: T[]) {
    if (table === 'post') {
      this.tableData = posts as T[];
    } else {
      this.tableData = data;
    }
  }

  async getAll(): Promise<T[]> {
    return this.tableData;
  }

  async getByKey(key: keyof T, value: unknown): Promise<T[]> {
    return (await this.getAll()).filter((item) => item[key] === value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async search(queryObject: { [key in keyof T]?: any }): Promise<T[]> {
    /**
     * Process and filter using each key
     *    if any key has comma, i.e OR condition
     *    if it's an array, that is AND condition
     *    Comma
     *        if it include single inverted quote, look for partial match
     *        if it's in pair of two, look for exact match
     *    Any other condition???
     */

    return this.tableData;
  }
}
