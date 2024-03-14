import { BaseRepository } from './baseRepository';
import { IBlogDal } from '../../../interfaces/DAL/blogDal.interface';
import Blog from '../../../types/blog.type';

export class BlogRepo extends BaseRepository<Blog> implements IBlogDal {
    public updateDescription = async (blogId: string, description: string): Promise<Blog | null> => {
        return await this.update(blogId, { description });
    };

    public delete = async (blogId: string): Promise<Blog | null> => {
        return await this.deleteByIdentifier({ _id: blogId });
    };

    public getById = async (blogId: string): Promise<Blog | null> => {
        const blog = await this.getOneByIdentifier({ _id: blogId });
        return blog;
    };

    public getByAuthor = async (userName: string): Promise<Blog[] | null> => {
        try {
            const blogs: Blog[] = await this._model.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author',
                    },
                },
                { $match: { 'author.name': userName } },
                { $unwind: '$author' },
            ]);

            return blogs;
        } catch (error) {
            return null;
        }
    };
}
