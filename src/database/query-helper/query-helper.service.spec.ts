import { Test, TestingModule } from '@nestjs/testing';
import { QueryHelperService } from './query-helper.service';
import { getRandomNumber } from '../../utils/helper/index';

describe('QueryHelperService', () => {
  const records = [
    {
      name: 'The Lord of the Rings: The Return of the King',
      image: '',
      description: 'test test',
      dateLastEdited: '123',
    },
    {
      name: 'The Lion King',
      image: '',
      description: 'test2 test2',
      dateLastEdited: '124',
    },
  ];

  type TData = typeof records[0];
  let service: QueryHelperService<TData>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryHelperService],
    }).compile();

    service = module.get<QueryHelperService<TData>>(QueryHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('QueryHelperService helper methods', () => {
    beforeEach(async () => {
      service.setTable(null, records);
    });

    describe('getAll', () => {
      it('should return all records', async () => {
        expect(await service.getAll()).toBe(records);
      });
    });

    describe('getByKey', () => {
      it('getByKey: should return correct record when query with key', async () => {
        const record = records[getRandomNumber(0, records.length - 1)];
        expect(
          await service.getByKey('dateLastEdited', record.dateLastEdited),
        ).toEqual([record]);
      });
    });

    describe('search', () => {
      it('should return all   matched record when no search param provided', async () => {
        expect(await service.search({})).toEqual(records);
      });

      it('should return all   matched record when normal search without double quote', async () => {
        expect(
          await service.search({
            name: 'the king',
          }),
        ).toEqual(records);
      });

      it('should return exact matched record when exact search with double quote', async () => {
        expect(
          await service.search({
            name: '"the king"',
          }),
        ).toEqual(records[0]);
      });

      it('should return exact matched record when exact search with double quote CASE INSENSITIVE', async () => {
        expect(
          await service.search({
            name: '"the KING"',
          }),
        ).toEqual(records[0]);
      });

      it('should return all matched record when OR condition provided', async () => {
        expect(
          await service.search({
            name: '"the king","The Lion"',
          }),
        ).toEqual(records);
      });

      it('should return all matched record when OR condition provided CASE INSENSITIVE', async () => {
        expect(
          await service.search({
            name: '"THE king","The LION"',
          }),
        ).toEqual(records);
      });

      it('should return no record when and condition provided not matching a particular record', async () => {
        expect(
          await service.search({
            name: ['the king', 'The Lion'],
          }),
        ).toEqual([]);
      });

      it('should return matched record when AND query provided', async () => {
        expect(
          await service.search({
            name: '"the king"',
            dateLastEdited: '123',
          }),
        ).toEqual(records[0]);
      });

      it('should not return any match when AND query provided from impossible match', async () => {
        expect(
          await service.search({
            name: '"the king"',
            dateLastEdited: '124',
          }),
        ).toEqual([]);
      });

      describe('When single quote in query', () => {
        it("should not return any match when only one ' provided in between two string", async () => {
          expect(
            await service.search({
              name: "the ' king",
            }),
          ).toEqual([]);
        });

        it("should not return any match when only one ' provided in beginning", async () => {
          expect(
            await service.search({
              name: "'the king",
            }),
          ).toEqual([]);
        });

        it("should return all match when only pair of ' provided at start and end", async () => {
          expect(
            await service.search({
              name: "'the king'",
            }),
          ).toEqual(records[0]);
        });

        it("should return no match when three / odd number of ' provided", async () => {
          expect(
            await service.search({
              name: "'the 'king'",
            }),
          ).toEqual([]);
        });
      });
    });
  });
});
