export class RatingRequest {
  constructor(orderId, restaurantId, commentMessage, ratingRequests) {
    this.orderId = orderId;
    this.restaurantId = restaurantId;
    this.commentMessage = commentMessage;
    this.ratingRequests = ratingRequests;
  }
}
