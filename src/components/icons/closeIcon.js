let default_fill_color = '#FFF';

const closeIcon = (fill_color) => {
    if (!fill_color) {
        fill_color = default_fill_color;
    }
    
    return `<svg style="fill:${fill_color}" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">\
                <path d="M12 1.427L10.573 0 5.997 4.576 1.424.003l-1.42 1.42 4.572 4.574L0 10.573 1.427 \
                            12l4.576-4.576 4.573 4.573 1.42-1.42-4.572-4.574L12 1.427z" fill-rule="evenodd">\
                </path>\
            </svg>`;
};

export default closeIcon;
