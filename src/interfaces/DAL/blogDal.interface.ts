import Blog from '../../types/blog.type';

export interface IBlogDal {
    create(blog: Blog): Promise<Blog>;
    updateDescription(blogId: string, description: string): Promise<Blog | null>;
    delete(blogId: string): Promise<Blog | null>;
    getById(blogId: string): Promise<Blog | null>;
    getAll(): Promise<Blog[] | null>;
    getByAuthor(userName: string): Promise<Blog[] | null>;
}
