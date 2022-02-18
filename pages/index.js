import Head from 'next/head';
import { api_endpoint } from '@/constants/index';
import { GraphQLClient, gql } from 'graphql-request';

import Footer from '@/components/footer';
import styles from '@/styles/Home.module.css';

const Home = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <span>Blogs</span>
          {data?.blogs?.map(item => (
            <div key={item.slug}>{item.title}</div>
          ))}
        </div>
        <div>
          <span>Case Studies</span>
          {data?.case_studies?.map(item => (
            <div key={item.slug}>
              {item.title}
              {item.subheading}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const graphQLClient = new GraphQLClient(api_endpoint);
  const query = gql`
    {
      blogs(first: 4, orderBy: updatedAt_DESC) {
        title
        date
        tags
        slug
        content
        bannerImage {
          url
        }
      }
      case_studies(first: 4, orderBy: updatedAt_DESC) {
        title
        tags
        subheading
        slug
        bannerImage {
          url
        }
      }
    }
  `;
  const response = await graphQLClient.request(query);
  return {
    props: {
      data: response
    }
  };
};
