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
        updatedBookmark = [...savedBookmark, item];
        localStorage.setItem("bookmark", JSON.stringify(updatedBookmark));
    }
};