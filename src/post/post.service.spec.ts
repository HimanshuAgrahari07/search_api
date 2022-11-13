import { Test, TestingModule } from '@nestjs/testing';
import { QueryHelperService } from '../database/query-helper/query-helper.service';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let spyService: QueryHelperService<Post>;

  const posts: Post[] = [
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

  // Service mock implementation
  const DbServiceProvider = {
    provide: QueryHelperService,
    useFactory: () => ({
      getAll: jest.fn(() => posts),
      getByKey: jest.fn(),
      search: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, DbServiceProvider],
    }).compile();

    service = module.get<PostService>(PostService);
    spyService = module.get<QueryHelperService<Post>>(QueryHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    beforeEach(async () => {
      // some processing to happen before each test
    });

    it('should get all posts when no query provided', async () => {
      const query: Partial<Post> = {};
      const results = service.findAll(query);
      expect(spyService.getAll).toBeCalledTimes(1);
      expect(await results).toBe(posts);
    });

    it('should get list of posts for partial match but full word match', async () => {
      const query: Partial<Post> = {
        name: 'the king',
      };

      const results = service.findAll(query);
      expect(spyService.getAll).toBeCalledTimes(1);
      expect(await results).toBe(posts);
    });

    it('should get list of post for exact full word match', async () => {
      const query: Partial<Post> = {
        name: '"the king"',
      };

      const results = service.findAll(query);
      expect(spyService.getAll).toBeCalledTimes(1);
      expect(await results).toBe(posts[0]);
    });

    // TODO: Add tests for pagination
    // TODO: Add tests for sorting
  });
});
