import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>
  ) { }


  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const news = this.newsRepository.create(createNewsDto);
    return this.newsRepository.save(news);
  }

  async findAll(): Promise<Array<News>> {
    const news = await this.newsRepository.find();

    return news;
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: {
        id: id,
      }
    })

    if (!news) {
      throw new NotFoundException(`News with id '${id}' not found.`);
    }

    return news
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<News> {
    let news = await this.findOne(id);

    await this.newsRepository.update(id, updateNewsDto)
    news = await this.findOne(id);

    return news
  }

  async remove(id: number): Promise<News> {
    const news = await this.findOne(id);

    await this.newsRepository.delete(id);

    return news
  }
}
