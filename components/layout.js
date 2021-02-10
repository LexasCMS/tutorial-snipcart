import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <div className="px-5">
        <div className="max-w-screen-lg mx-auto pt-8 pb-16">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-bold">
              <Link href="/">My Shop</Link>
            </h1>
          </div>

          {children}
        </div>
      </div>
    </>
  )
}