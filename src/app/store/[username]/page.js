import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

async function getStoreData(username) {
  const userQuery = query(collection(db, 'users'), where('username', '==', username));
  const userSnap = await getDocs(userQuery);
  if (userSnap.empty) return null;

  const userData = userSnap.docs[0].data();
  const productsQuery = query(collection(db, 'products'), where('userId', '==', userSnap.docs[0].id));
  const productsSnap = await getDocs(productsQuery);
  const products = productsSnap.docs.map(doc => ({ id: doc.id,...doc.data() }));

  return { user: userData, products };
}

export default async function StorePage({ params }) {
  const data = await getStoreData(params.username);
  if (!data) return <div>Boutique introuvable</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Boutique de {params.username}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-xl text-blue-600 font-bold my-2">{product.price.toLocaleString()} FCFA</p>
              <button className="w-full bg-green-600 text-white p-2 rounded">Acheter MTN/Orange</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
