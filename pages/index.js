import styles from "../styles/Home.module.css";
import SanityService from "./services/SanityService";

export default function Home({ home, posts }) {
  console.log(home);
  console.log(posts);
  return (
    <div className={styles.container}>
      <h1>Blog Home</h1>
    </div>
  );
}

export async function getStaticProps() {
  // sanity 로부터 데이터를 가져오는 부분 (정적페이지)
  const sanityService = new SanityService();
  const home = await sanityService.getHome();
  const posts = await sanityService.getPosts();

  return {
    props: {
      home,
      posts,
    },
  };
}
