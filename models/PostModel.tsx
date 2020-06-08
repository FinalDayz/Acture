export class PostModel {
    postId: number = 0;
    text: string = '';
    image: {
        type: string;
        data: number[];
    } = {type: '', data: [0]};
    userId: number = 0;
    postDate: string = '';
    categoryId: number = 0;
    title: string = '';
}