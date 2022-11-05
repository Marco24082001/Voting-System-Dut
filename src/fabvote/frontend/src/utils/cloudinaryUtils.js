import env from "../../env";
export async function uploadImage(rawFile) {
    try {
        let response = "";
        const data = new FormData();
        data.append("file", rawFile);
        data.append("upload_preset", "voting-system");
        data.append("cloud_name", "h-b-ch-khoa");
        await fetch(env.CLOUDINARY_UPLOAD_URL, {
            method: "post",
            body: data
        })
        .then(res => res.json())
        .then(data => response = data)
        return response;
    } catch (error) {
        return {error: error};
    }
}