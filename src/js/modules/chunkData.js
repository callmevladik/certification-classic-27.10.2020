export const chunkData = (data, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < data.length; i++) {
        const last = chunkedArr[chunkedArr.length - 1];
        if (!last || last.length === chunkSize) {
            chunkedArr.push([data[i]]);
        } else {
            last.push(data[i]);
        }
    }
    return chunkedArr;
}