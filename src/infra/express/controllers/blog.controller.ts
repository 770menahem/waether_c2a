import { Request, Response } from 'express';
import { IBlogService } from '../../../interfaces/services/blogService.interface';
import Blog from '../../../types/blog.type';
import { ServiceError } from '../utils/error';
import { IBlogController } from './blogController.interface';

export class BlogController implements IBlogController {
    private blogService: IBlogService;

    constructor(blogService: IBlogService) {
        console.log('BlogController created');
        this.blogService = blogService;
    }

    public createBlog = async (req: Request, res: Response) => {
        const newBlog = req.body;
        const blog: Blog = await this.blogService.createBlog(newBlog);
        if (!blog) throw new ServiceError(404, 'fail to create blog');
        else res.send(blog);
    };

    public updateBlog = async (req: Request, res: Response) => {
        const blogId = req.params.blogId;
        const description = req.body.description;
        const blog: Blog | null = await this.blogService.updateBlog(blogId, description);
        if (!blog) throw new ServiceError(404, 'fail to update blog');
        else res.send(blog);
    };

    public deleteBlog = async (req: Request, res: Response) => {
        const blogId = req.params.blogId;
        const blog: Blog | null = await this.blogService.deleteBlog(blogId);
        if (!blog) throw new ServiceError(404, 'fail to delete blog');
        else res.send({ msg: 'Blog deleted successfully', blog });
    };

    public getBlog = async (req: Request, res: Response) => {
        const blogId = req.params.blogId;
        const blog: Blog | null = await this.blogService.getBlog(blogId);
        if (!blog) throw new ServiceError(404, 'Blog not found');
        else res.send(blog);
    };

    public getAllBlogs = async (_req: Request, res: Response) => {
        const blogs: Blog[] | null = await this.blogService.getAllBlogs();
        if (!blogs) throw new ServiceError(404, 'fail to get all blogs');
        else res.send(blogs);
    };

    public getBlogsByAuthor = async (req: Request, res: Response) => {
        const userName = req.params.userName;
        const blogs: Blog[] | null = await this.blogService.getBlogsByAuthor(userName);
        if (!blogs) throw new ServiceError(404, 'fail to get blogs by author');
        else res.send(blogs);
    };
}
