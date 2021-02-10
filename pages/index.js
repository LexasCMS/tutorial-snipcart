import Link from 'next/link';

import Layout from '../components/layout';
import { request } from '../lib/lexascms';

export default function Home({ homepage }) {
  return (
    <Layout>
      <div className="flex flex-col gap-2 items-center justify-center bg-gray-200 text-white h-96 rounded bg-cover bg-center" style={{backgroundImage:`linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${homepage.promoBanner.backgroundImage.url})`}}>
        <h2 className="font-extrabold text-4xl">{homepage.promoBanner.heading}</h2>
        <p>{homepage.promoBanner.subHeading}</p>
      </div>

      <h2 className="font-semibold text-2xl text-center mt-16">Products you might like</h2>

      <div className="grid sm:grid-cols-3 gap-6 mt-8">
        {homepage.featuredProducts.items.map(product => (
          <div key={product.id}>
            <Link href={`/products/${product.slug}`}>
              <a><img src={product.image.url} alt={`${product.name} Thumbnail`} /></a>
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mt-3 mb-2">
                <h4 className="font-medium">{product.name}</h4>
                ${product.price}
              </div>
              <p className="text-gray-500">{product.description}</p>
              <button type="button"
                      className="h-11 bg-gray-900 hover:bg-gray-800 text-white uppercase text-xs tracking-wide font-bold rounded mt-4 transition-colors duration-150 ease-in-out">
                Add to basket
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  // Define homepage query
  const homepageQuery = `{
    homepageCollection(limit: 1) {
      items {
        promoBanner {
          heading
          subHeading
          backgroundImage {
            url
          }
        }
        featuredProducts {
          items {
            id
            slug
            name
            price
            description
            image {
              url
            }
          }
        }
      }
    }
  }`;
  // Define request context
  let requestContext = {
    audienceAttributes: {
      localTemperature: query.localTemp !== undefined ? parseInt(query.localTemp, 10) : null
    }
  };
  // Fetch homepage content
  const result = await request({
    query: homepageQuery,
    requestContext
  });
  // Return
  return {
    props: {
      homepage: result.homepageCollection.items[0]
    }
  };
}