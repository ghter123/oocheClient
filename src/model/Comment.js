import axios from 'axios';

export default class Comment {
    constructor(comment) {
        this.commentPhotos = comment.commentPhotos || [];
        this.commentStarLevel = comment.commentStarLevel || '0';
        this.commentTime = comment.commentTime || new Date();
        this.commentUserId = comment.commentUserId || '';
        this.comments = comment.comments || '';
        this.orderId = comment.orderId || '';
        this.parentCommentId = comment.parentCommentId || '';
        this.id = comment.id || '';
    }
    
    static addOrderComment(comment){
        return axios.post(`/jeecg/rest/orderComment/addComment`, comment);
    }

    static getFirstByOrderId(orderId){
        return axios.get(`/jeecg/rest/orderComments/${orderId}/first`);
    }
}