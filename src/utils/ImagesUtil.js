import images from "./ImagesList.json";

function getImagesList(indexes){
    return indexes?.map((number) => { return {...images[number], key: number} ?? null; });
}
export default {
    getImagesList
};
