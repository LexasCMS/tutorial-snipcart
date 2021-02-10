import Layout from '../../components/layout';
import { request } from '../../lib/lexascms';

export default function Product({ product }) {
  return (
    <Layout>
      <div className="grid sm:grid-cols-2 gap-6">
        <img src={product.image.url} alt={`${product.name} Image`} />
        <div class="flex flex-col">
          <h1 className="font-medium text-2xl">{product.name}</h1>
          <div className="font-medium text-xl text-gray-600 my-2">
            ${product.price}
          </div>
          <p className="text-gray-500">{product.description}</p>
          <button type="button"
                  className="h-11 bg-gray-900 hover:bg-gray-800 text-white uppercase text-xs tracking-wide font-bold rounded mt-4 transition-colors duration-150 ease-in-out">
            Add to basket
          </button>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Define product slugs query
  // Note: Defaults to fetching 20 products, to fetch more
  // pass the `limit` argument to the `productCollection` query. 
  // Fetching more than 100 products requires multiple requests.
  const productSlugsQuery = `{
    productCollection {
      items {
        slug
      }
    }
  }`;
  // Fetch product slugs
  const productSlugs = await request({ query: productSlugsQuery });
  // Return
  return {
    paths: productSlugs.productCollection.items.map(product => ({
      params: {
        slug: product.slug
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  // Define product query
  const productQuery = `{
    productCollection(filter: { slug: { _eq: "${params.slug}" } }) {
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
  }`;
  // Fetch product data
  const product = await request({ query: productQuery });
  // Return
  return {
    props: {
      product: product.productCollection.items[0]
    }
  };
}