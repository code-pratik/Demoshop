export default async function getProducts(req, res) {
  const data = await fetch("https://dummyjson.com/products");
  const posts = await data.json();
  res.status(200).json(posts);
}
