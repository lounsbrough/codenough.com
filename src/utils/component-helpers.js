export const isMobile = () => {
    return !!(window.navigator.userAgent.match(/Android/i) ||
        window.navigator.userAgent.match(/webOS/i) ||
        window.navigator.userAgent.match(/iPhone/i) ||
        window.navigator.userAgent.match(/iPad/i) ||
        window.navigator.userAgent.match(/iPod/i) ||
        window.navigator.userAgent.match(/BlackBerry/i) ||
        window.navigator.userAgent.match(/Windows Phone/i));
};

export const randomAlphanumeric = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return possible[Math.floor(Math.random() * possible.length)];
};
