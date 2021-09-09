import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll()", ()=>{
    it("should return an array", ()=>{
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe("getOne",()=>{
    it("should return a movie", ()=>{
      service.create({
        title:'Test movie',
        genres:['actions'],
        year:2000
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });

    it("should return 404 error", ()=>{
      try{
        const result = service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("deleteOne", ()=>{
    it("should delete a movie",()=>{
      service.create({
        title:"test movie",
        year:2020,
        genres:['action']
      });

      //console.log(service.getAll());

      const movieArr = service.getAll();
      service.deleteOne(1);
      const afterDel = service.getAll();

      expect(afterDel.length).toBeLessThan(movieArr.length)

    })
  });
});
