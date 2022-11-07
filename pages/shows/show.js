import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';


//import PropTypes from 'prop-types';
export const show = (props) => {
  return(
    <Layout>
      <Head>
        <title>Generic Show page</title>
      </Head>
      <main>
        <h1>Generic Show</h1>
        <p>This page will go away once the pages are dynamically linked up by show id</p>
        <h2>
          <Link href="/">← Back to home</Link>
        </h2>
      </main>
    </Layout>
  )
}
//show.propTypes = {};

export default show;
