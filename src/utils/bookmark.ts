"use clint"

export const setBookmark = ({ id, image, title, name }: { id: string, image: string, title: string, name: string }) => {
    let savedBookmark;
    let updatedBookmark: any = [];

    const getBookmark = localStorage.getItem("bookmark");
    if (getBookmark) {
        savedBookmark = JSON.parse(getBookmark);
    };

    const isSaved = savedBookmark?.find((item: any) => item.id == id);

    if (isSaved) {
        return;
    } else {
        const item = { id, image, title, name };
        if(savedBookmark){
            updatedBookmark = [...savedBookmark, item];
        }else{
            updatedBookmark.push(item);
        }
        localStorage.setItem("bookmark", JSON.stringify(updatedBookmark));
    }
};

export const deleteBookmark = (id: string) => {
    let savedBookmark;
    let updatedBookmark: any = [];

    const getBookmark = localStorage.getItem("bookmark");
    if (getBookmark) {
        savedBookmark = JSON.parse(getBookmark);
    };

    updatedBookmark = savedBookmark?.filter((item: any) => item.id !== id);
    localStorage.setItem("bookmark", JSON.stringify(updatedBookmark));
}