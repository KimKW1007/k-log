import axios from "axios";

const uploads = async (buffer : Buffer, mimetype : string, clientId : string) => {
  const imgurUploadResponse = await axios.post('https://api.imgur.com/3/image', buffer, {
        headers: {
          Authorization: `Client-ID ${clientId}`,
          'Content-Type': mimetype, // Change content type as needed
        },
      });
  const imageUrl = imgurUploadResponse.data.data.link
  return imageUrl
}
export default uploads