import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;
  let spyService: PostService;

  // Service mock implementation
  const ApiServiceProvider = {
    provide: PostService,
    useFactory: () => ({
      findAll: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [ApiServiceProvider],
    }).compile();

    controller = module.get<PostController>(PostController);
    spyService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll service function with a query param', async () => {
      const query = {
        name: 'The Lion King',
      };

      controller.findAll(query);
      expect(spyService.findAll).toHaveBeenCalledWith(query);
    });
  });
});
