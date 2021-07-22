// this code is a part of my project
// assuming your origin image cling to canvas's left
// if you need calc left first
// considering recursively use '1/2 of current y' (it is similar with quick sort algorithm) to catch minimum opaque x
const trimTransparency = (origin,cb) => {
    let { width, height } = origin;
    let newCanvas = document.createElement('canvas');
    let ctx = origin.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;

    let renderW = 0;
    let renderH = 0;
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    let currX = 0;
    let currY = 0;
    let flag = true
    let count = 0

    // check top
    while(flag){
        if(getPixel(currX, currY) > 0){
            flag = false
            minY = currY
        }

        currY++;
    }

    // check right
    flag = true
    currX = width - 1;
    while(flag){
        if(getPixel(currX, currY) > 0){
            flag = false
            maxX = currX
        }

        currX--;
        count++;
    }

    // check bottom
    flag = true
    currY = height - 1;
    while(flag){
        if(getPixel(currX, currY) > 0){
            flag = false
            maxY = currY
        }

        currY--;
        count++;
    }

    // console.log(minX, minY, maxX, maxY);

    renderW = maxX - minX;
    renderH = maxY - minY;
    newCanvas.width = renderW
    newCanvas.height = renderH
    newCanvas.getContext('2d')
             .drawImage(origin, minX, minY, renderW, renderH, 0, 0, renderW, renderH);

    cb(newCanvas);

    function getPixel(x, y){
        let index = y * (width * 4) + x * 4;

        return data[index];
    };
};
