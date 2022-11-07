import { getAllPostIds, getPostData } from '../../lib/show';

export default function Details() {
  return <div>details</div>
}

export async function getStaticPaths() {
  const paths = getAllShowIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}