import SanityService from "../services/SanityService";

export default function PostAll({ slug, post }) {
  console.log(post);
  return (
    <div>
      <h1>Post : {slug}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await new SanityService().getPosts();

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false, // 없는 페이지 404 처리
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const posts = await new SanityService().getPosts();
  const post = posts.find((p) => p.slug === slug);

  return {
    props: {
      slug,
      post,
    },
  };
}
