import sanityClient from "@sanity/client";

export default class SanityService {
  _client = sanityClient({
    dataset: "production",
    projectId: "gdb8p6n5",
    useCdn: process.env.NODE_ENV === "production",
  });

  async getHome() {
    return await this._client.fetch(
      `*[_type == 'home'][0]{'mainPostUrl' : mainPost -> slug.current}`
    );
  }
  async getPosts() {
    return await this._client.fetch(`
        *[_type == 'post']
        {
        title,
        subtitle,
        createdAt,
        'content': content[]{...,
        ...select[_type == 'imageGallery' -> {'images' : images[]{..., 'url' : asset -> url}}]},
        'slug': slug.current
        }
    `);
  }
}
