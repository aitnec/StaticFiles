function orderItem() {
    const urlParams = new URLSearchParams(window.location.search);
    const order = urlParams.get('order');
    window.location.href ='OrderBackend/OrderItem_Frontend/order=' + order;
}